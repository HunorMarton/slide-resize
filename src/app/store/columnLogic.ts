import { SlideId, SlideData, ColumnType, ColumnId, Style } from '../types'
import { slides } from '../lib/data'
import { calculateScore, getTallestColumn } from '../lib/measurements'
import {
  MAX_VERSIONS,
  DEFAULT_FONT_SIZE,
  DEFAULT_GROW,
  GROW_INCREMENT,
} from './constants'

const data: Record<
  SlideId,
  {
    columnIds: Map<ColumnId, ColumnType>
    versions: {
      columnStyles: Record<ColumnType, Style>
      score: number
    }[]
  }
> = {}

function initializeData() {
  slides.forEach((slide) => {
    data[slide.id] = {
      columnIds: new Map(
        slide.columns.map((column) => [column.id, column.type])
      ),
      versions: [
        {
          columnStyles: generateDefaultStyles(slide),
          score: 0,
        },
      ],
    }
  })
}

initializeData()

export function generateDefaultStyles(slide: SlideData) {
  return slide.columns.reduce((acc, column) => {
    acc[column.type] = {
      grow: DEFAULT_GROW,
      fontSize: DEFAULT_FONT_SIZE,
    }
    return acc
  }, {} as Record<ColumnType, Style>)
}

export function handleFontSizeChange(
  slideId: SlideId,
  columnStyles: Record<ColumnType, Style>
) {
  const lastVersion = data[slideId].versions.at(-1)
  if (!lastVersion) throw new Error('No last version')

  // Update all font sizes at once
  lastVersion.columnStyles = columnStyles
}

export function handleSizeChange(
  slideId: SlideId,
  columnSizes: Map<ColumnId, { width: number; height: number }>,
  maxHeight: number
):
  | {
      status: 'done'
      score: number
      version: number
    }
  | {
      status: 'newVersion'
      score: number
      version: number
    } {
  const lastVersion = data[slideId].versions.at(-1)
  if (!lastVersion) throw new Error('No last version')

  const score = calculateScore(columnSizes, maxHeight)
  lastVersion.score = score

  const previousVersion = data[slideId].versions.at(-2)
  if (previousVersion && previousVersion.score >= score) {
    console.log('score is lower or equal to previous version, rolling back')
    data[slideId].versions.pop()

    return {
      status: 'done',
      score: previousVersion.score,
      version: data[slideId].versions.length,
    }
  }

  if (data[slideId].versions.length >= MAX_VERSIONS) {
    // For performance and to avoid potential infinite loops
    console.log('too many versions, not adding new version')
    return {
      status: 'done',
      score,
      version: data[slideId].versions.length,
    }
  }

  const columnId = getTallestColumn(columnSizes)
  const columnType = getColumnType(slideId, columnId)

  addNewVersion(slideId)
  increaseColumnWidth(slideId, columnType)

  return {
    status: 'newVersion',
    score,
    version: data[slideId].versions.length,
  }
}

function getColumnType(slideId: SlideId, columnId: ColumnId) {
  const columnType = data[slideId].columnIds.get(columnId)
  if (!columnType)
    throw new Error(`No column type found for column ${columnId}`)
  return columnType
}

function addNewVersion(slideId: SlideId) {
  const lastVersion = data[slideId].versions.at(-1)
  if (!lastVersion) throw new Error('No last version')

  data[slideId].versions.push({
    columnStyles: copyColumnStyles(slideId, -1, true),
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

export function getScore(slideId: SlideId, versionNr: number = -1) {
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
