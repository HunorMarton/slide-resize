import { SlideId, SlideData, ColumnType, ColumnId, Style } from '../types'
import { slides } from '../lib/data'
import {
  MAX_VERSIONS,
  DEFAULT_FONT_SIZE,
  DEFAULT_GROW,
  GROW_INCREMENT,
} from './constants'

const data: Record<
  SlideId,
  {
    columnTypes: Map<ColumnType, ColumnId[]>
    columnIds: Map<ColumnId, ColumnType>
    versions: {
      columnStyles: Record<ColumnType, Style>
      columnSizes: Map<ColumnId, { width: number; height: number }>
      maxHeight: number
      score: number
    }[]
  }
> = {}

function initializeData() {
  slides.forEach((slide) => {
    data[slide.id] = {
      columnTypes: new Map(
        slide.columns.reduce((acc, column) => {
          acc.set(column.type, [...(acc.get(column.type) || []), column.id])
          return acc
        }, new Map())
      ),
      columnIds: new Map(
        slide.columns.map((column) => [column.id, column.type])
      ),
      versions: [
        {
          columnStyles: generateDefaultStyles(slide),
          columnSizes: new Map(),
          maxHeight: Infinity,
          score: 0,
        },
      ],
    }
  })
}

export function generateDefaultStyles(slide: SlideData) {
  return slide.columns.reduce((acc, column) => {
    acc[column.type] = {
      grow: DEFAULT_GROW,
      fontSize: DEFAULT_FONT_SIZE,
    }
    return acc
  }, {} as Record<ColumnType, Style>)
}

initializeData()

export function handleFontSizeChange(
  slideId: SlideId,
  columnType: ColumnType,
  fontSize: number
) {
  const lastVersion = data[slideId].versions.at(-1)
  if (!lastVersion) throw new Error('No last version')

  if (lastVersion.columnStyles[columnType].fontSize < fontSize) {
    console.log('font size is larger than last version, ignoring')
    return {
      status: 'ignoring',
    }
  }

  // Update font size
  lastVersion.columnStyles[columnType].fontSize = fontSize

  invalidateColumnSizesForType(slideId, columnType)
}

function invalidateColumnSizesForType(
  slideId: SlideId,
  columnType: ColumnType
) {
  console.log(
    'invalidate column heights',
    columnType,
    data[slideId]?.columnTypes.get(columnType)
  )
  data[slideId]?.columnTypes.get(columnType)?.forEach((columnId) => {
    data[slideId]?.versions.at(-1)?.columnSizes.delete(columnId)
  })
}

export function handleSizeChange(
  slideId: SlideId,
  columnId: ColumnId,
  fontSize: number,
  width: number,
  height: number,
  maxHeight: number
):
  | {
      status: 'done'
      score: number
      version: number
      columnStyles: Record<ColumnType, Style>
    }
  | {
      status: 'newVersion'
      score: number
      version: number
      columnStyles: Record<ColumnType, Style>
    }
  | undefined {
  // React re-renders the component that initiated the font size change that already has the correct size
  // Ignore this case as it's not a real height change
  if (sizeDidNotChange(slideId, columnId, width, height)) {
    console.log('size did not change, ignoring')
    return
  }
  if (usedPreviousFontSize(slideId, columnId, fontSize)) {
    console.log('used previous font size, ignoring')
    return
  }

  saveColumnSize(slideId, columnId, width, height, maxHeight)

  if (allColumnHeightsSet(slideId)) {
    const latestVersion = data[slideId].versions.at(-1)
    const previousVersion = data[slideId].versions.at(-2)
    if (!latestVersion) throw new Error('No last version')

    const score = calculateScore(slideId)
    latestVersion.score = score

    if (previousVersion && previousVersion.score >= score) {
      console.log('score is lower or equal to previous version, rolling back')
      data[slideId].versions.pop()

      return {
        status: 'done',
        score: previousVersion.score,
        version: data[slideId].versions.length,
        columnStyles: copyColumnStyles(slideId),
      }
    }

    if (data[slideId].versions.length >= MAX_VERSIONS) {
      // For performance and to avoid potential infinite loops
      console.log('too many versions, not adding new version')
      return {
        status: 'done',
        score,
        version: data[slideId].versions.length,
        columnStyles: copyColumnStyles(slideId),
      }
    }

    const columnType = getColumnTypeOfTheTallestColumn(slideId)
    console.log('columnTypeOfTheTallestColumn', columnType)

    addNewVersion(slideId)

    increaseColumnWidth(slideId, columnType)

    return {
      status: 'newVersion',
      score,
      version: data[slideId].versions.length,
      columnStyles: copyColumnStyles(slideId),
    }
  }
}

function sizeDidNotChange(
  slideId: SlideId,
  columnId: ColumnId,
  width: number,
  height: number
) {
  const currentSize = data[slideId].versions.at(-1)?.columnSizes.get(columnId)
  return currentSize?.width === width && currentSize?.height === height
}

function usedPreviousFontSize(
  slideId: SlideId,
  columnId: ColumnId,
  fontSize: number
) {
  const lastVersion = data[slideId].versions.at(-1)
  if (!lastVersion) throw new Error('No last version')

  const columnType = data[slideId].columnIds.get(columnId)
  if (!columnType) throw new Error('No column type')

  return lastVersion.columnStyles[columnType].fontSize !== fontSize
}

function saveColumnSize(
  slideId: SlideId,
  columnId: ColumnId,
  width: number,
  height: number,
  maxHeight: number
) {
  const lastVersion = data[slideId].versions.at(-1)
  if (!lastVersion) throw new Error('No last version')

  lastVersion.columnSizes.set(columnId, { width, height })
  lastVersion.maxHeight = maxHeight
}

function allColumnHeightsSet(slideId: SlideId) {
  const lastVersion = data[slideId].versions.at(-1)
  if (!lastVersion) throw new Error('No last version')

  const numberOfColumns = data[slideId].columnIds.size
  const numberOfColumnsWithSize = lastVersion.columnSizes.size

  console.log(
    numberOfColumns === numberOfColumnsWithSize
      ? `all column heights set`
      : `not all column heights set, ${numberOfColumnsWithSize} / ${numberOfColumns}`,
    Array.from(lastVersion.columnSizes.values()).map(
      (size) => `${size.width} x ${size.height}`
    ),
    `of ${lastVersion.maxHeight}`
  )

  return numberOfColumns === numberOfColumnsWithSize
}

function calculateScore(slideId: SlideId) {
  const lastVersion = data[slideId].versions.at(-1)
  if (!lastVersion) throw new Error('No last version')

  const totalSize = lastVersion.columnSizes
    .values()
    .reduce((acc, curr) => acc + curr.width * curr.height, 0)

  const maxSize = lastVersion.columnSizes
    .values()
    .reduce((acc, curr) => acc + curr.width * lastVersion.maxHeight, 0)

  const score = totalSize / maxSize

  console.log('score', slideId, score)
  return score
}

function getColumnTypeOfTheTallestColumn(slideId: SlideId) {
  const lastVersion = data[slideId].versions.at(-1)
  if (!lastVersion) throw new Error('No last version')

  const tallestColumn = Array.from(lastVersion.columnSizes.entries()).reduce(
    (acc, [columnId, { height }]) =>
      height > acc.height ? { columnId, height } : acc,
    { columnId: null as ColumnId | null, height: 0 }
  )
  if (!tallestColumn.columnId) throw new Error('No tallest column')

  const columnType = data[slideId].columnIds.get(tallestColumn.columnId)
  if (!columnType) throw new Error(`No column type found for tallest column`)

  return columnType
}

function addNewVersion(slideId: SlideId) {
  const lastVersion = data[slideId].versions.at(-1)
  if (!lastVersion) throw new Error('No last version')

  data[slideId].versions.push({
    columnStyles: copyColumnStyles(slideId, -1, true),
    columnSizes: new Map(),
    maxHeight: lastVersion.maxHeight,
    score: 0,
  })
}

export function copyColumnStyles(
  slideId: SlideId,
  versionNr: number = -1,
  resetFontSize: boolean = false
) {
  const version = data[slideId].versions.at(versionNr)
  if (!version) throw new Error('No version')

  return Object.fromEntries(
    Object.entries(version.columnStyles).map(([columnType, style]) => [
      columnType,
      {
        ...style,
        fontSize: resetFontSize ? DEFAULT_FONT_SIZE : style.fontSize,
      },
    ])
  )
}

export function getScore(slideId: SlideId, versionNr: number) {
  const version = data[slideId].versions.at(versionNr)
  if (!version) throw new Error('Version not found')
  return version.score
}

function increaseColumnWidth(slideId: SlideId, columnType: ColumnType) {
  const lastVersion = data[slideId].versions.at(-1)
  if (!lastVersion) throw new Error('No last version')

  Object.entries(lastVersion.columnStyles).forEach(
    ([currentColumnType, style]) => {
      if (currentColumnType === columnType) {
        style.grow += GROW_INCREMENT
      } else {
        style.grow -= GROW_INCREMENT // Trigger re-rendering every column
      }
    }
  )
}
