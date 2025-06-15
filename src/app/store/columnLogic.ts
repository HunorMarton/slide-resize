import { SlideId, SlideData, ColumnType, ColumnId, Style } from '../types'
import { slides } from '../lib/data2'
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
      columnTypeStyles: Record<ColumnType, Style>
      columnHeights: Map<ColumnId, number>
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
          columnTypeStyles: generateDefaultStyle(slide),
          columnHeights: new Map(),
          maxHeight: Infinity,
          score: 0,
        },
      ],
    }
  })

  console.log('initial slides', data)
}

export function generateDefaultStyle(slide: SlideData) {
  return slide.columns.reduce((acc, column) => {
    acc[column.type] = {
      grow: DEFAULT_GROW,
      fontSize: DEFAULT_FONT_SIZE,
    }
    return acc
  }, {} as Record<ColumnType, Style>)
}

initializeData()

export function saveFontSize(
  slideId: SlideId,
  columnType: ColumnType,
  fontSize: number
) {
  const lastVersion = data[slideId].versions.at(-1)
  if (!lastVersion) throw new Error('No last version')

  lastVersion.columnTypeStyles[columnType].fontSize = fontSize
}

export function invalidateColumnHeightsForType(
  slideId: SlideId,
  columnType: ColumnType
) {
  data[slideId]?.columnTypes.get(columnType)?.forEach((columnId) => {
    data[slideId]?.versions.at(-1)?.columnHeights.delete(columnId)
  })
}

export function handleHeightChange(
  slideId: SlideId,
  columnId: ColumnId,
  height: number,
  maxHeight: number
):
  | { status: 'done' }
  | { status: 'newVersion'; columnStyles: Record<ColumnType, Style> }
  | undefined {
  // React re-renders the component that initiated the font size change that already has the correct size
  // Ignore this case as it's not a real height change
  if (heightDidNotChange(slideId, columnId, height)) return

  saveColumnHeight(slideId, columnId, height, maxHeight)

  if (allColumnHeightsSet(slideId)) {
    const latestVersion = data[slideId].versions.at(-1)
    const previousVersion = data[slideId].versions.at(-2)
    if (!latestVersion) throw new Error('No last version')

    const score = calculateScore(slideId)
    latestVersion.score = score
    console.log('score', score)

    if (previousVersion && previousVersion.score > score) {
      console.log(
        'score is lower than previous version, not adding new version'
      )
      // TODO: Revert to previous version
      // TODO: Return with a 'done' signal, so that the main container can show the final slide
      return { status: 'done' }
    }

    if (data[slideId].versions.length > MAX_VERSIONS) {
      // For performance and to avoid potential infinite loops
      console.log('too many versions, not adding new version')
      return { status: 'done' }
    }

    const columnType = getColumnTypeOfTheTallestColumn(slideId)
    console.log('columnTypeOfTheTallestColumn', columnType)

    addNewVersion(slideId)

    increaseColumnWidth(slideId, columnType)

    return {
      status: 'newVersion',
      columnStyles: copyColumnStyles(slideId, true),
    }
  }
}

function heightDidNotChange(
  slideId: SlideId,
  columnId: ColumnId,
  height: number
) {
  const currentHeight = data[slideId].versions
    .at(-1)
    ?.columnHeights.get(columnId)
  return currentHeight === height
}

function saveColumnHeight(
  slideId: SlideId,
  columnId: ColumnId,
  height: number,
  maxHeight: number
) {
  const lastVersion = data[slideId].versions.at(-1)
  if (!lastVersion) throw new Error('No last version')

  lastVersion.columnHeights.set(columnId, height)
  lastVersion.maxHeight = maxHeight
}

function allColumnHeightsSet(slideId: SlideId) {
  const lastVersion = data[slideId].versions.at(-1)
  if (!lastVersion) throw new Error('No last version')

  const numberOfColumns = data[slideId].columnIds.size
  const numberOfColumnsWithHeights = lastVersion.columnHeights.size

  console.log(
    numberOfColumns === numberOfColumnsWithHeights
      ? `all column heights set ${Array.from(
          lastVersion.columnHeights.values()
        ).join(', ')} of ${lastVersion.maxHeight}`
      : `not all column heights set, ${numberOfColumnsWithHeights} / ${numberOfColumns}`
  )

  return numberOfColumns === numberOfColumnsWithHeights
}

function calculateScore(slideId: SlideId) {
  const numberOfColumns = data[slideId].columnIds.size
  const lastVersion = data[slideId].versions.at(-1)
  if (!lastVersion) throw new Error('No last version')

  // Calculate average height fill percentage
  const averageHeightFillPercentage =
    lastVersion.columnHeights.values().reduce((acc, curr) => acc + curr, 0) /
    lastVersion.maxHeight /
    numberOfColumns

  return averageHeightFillPercentage
}

function getColumnTypeOfTheTallestColumn(slideId: SlideId) {
  const lastVersion = data[slideId].versions.at(-1)
  if (!lastVersion) throw new Error('No last version')

  const tallestColumn = Array.from(lastVersion.columnHeights.entries()).reduce(
    (acc, [columnId, height]) =>
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
    columnTypeStyles: copyColumnStyles(slideId, true),
    columnHeights: new Map(),
    maxHeight: lastVersion.maxHeight,
    score: 0,
  })
}

function copyColumnStyles(slideId: SlideId, resetFontSize: boolean = false) {
  const lastVersion = data[slideId].versions.at(-1)
  if (!lastVersion) throw new Error('No last version')

  return Object.fromEntries(
    Object.entries(lastVersion.columnTypeStyles).map(([columnType, style]) => [
      columnType,
      {
        ...style,
        fontSize: resetFontSize ? DEFAULT_FONT_SIZE : style.fontSize,
      },
    ])
  )
}

function increaseColumnWidth(slideId: SlideId, columnType: ColumnType) {
  const lastVersion = data[slideId].versions.at(-1)
  if (!lastVersion) throw new Error('No last version')

  Object.entries(lastVersion.columnTypeStyles).forEach(
    ([currentColumnType, style]) => {
      if (currentColumnType === columnType) {
        style.grow += GROW_INCREMENT
      } else {
        style.grow -= GROW_INCREMENT // Trigger re-rendering every column
      }
    }
  )
}
