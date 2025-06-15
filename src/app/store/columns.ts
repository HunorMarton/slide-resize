import { create } from 'zustand'
import { SlideData, SlideId, ColumnType, ColumnId, Style } from '../types'
import { slides } from '../lib/data2'
import {
  generateDefaultStyles,
  saveFontSize,
  handleHeightChange,
  invalidateColumnHeightsForType,
  copyColumnStyles,
  getScore,
} from './columnLogic'

interface ColumnState {
  score: Record<SlideId, number>
  version: Record<SlideId, number>
  maxVersion: Record<SlideId, number>
  calculating: Record<SlideId, boolean>

  columnStyles: Record<SlideId, Record<ColumnType, Style>>

  updateColumnFontSize: (
    slideId: SlideId,
    columnType: ColumnType,
    fontSize: number
  ) => void

  updateColumnHeight: (
    slideId: SlideId,
    columnId: ColumnId,
    height: number,
    maxHeight: number
  ) => void

  decreaseVersion: (slideId: SlideId) => void
  increaseVersion: (slideId: SlideId) => void
}

function generateDefaultRecords<T>(
  slides: SlideData[],
  initialValue:
    | { type: 'value'; value: T }
    | { type: 'function'; fn: (slide: SlideData) => T }
): Record<SlideId, T> {
  return slides.reduce((acc, slide) => {
    acc[slide.id] =
      initialValue.type === 'function'
        ? initialValue.fn(slide)
        : initialValue.value
    return acc
  }, {} as Record<SlideId, T>)
}

export const useStore = create<ColumnState>()((set) => ({
  score: generateDefaultRecords(slides, { type: 'value', value: 0 }),
  version: generateDefaultRecords(slides, { type: 'value', value: 0 }),
  maxVersion: generateDefaultRecords(slides, { type: 'value', value: 0 }),
  calculating: generateDefaultRecords(slides, { type: 'value', value: true }),

  columnStyles: generateDefaultRecords(slides, {
    type: 'function',
    fn: generateDefaultStyles,
  }),

  updateColumnFontSize: (
    slideId: SlideId,
    columnType: ColumnType,
    fontSize: number
  ) => {
    console.log('updateColumnFontSize', columnType, fontSize)
    saveFontSize(slideId, columnType, fontSize)
    invalidateColumnHeightsForType(slideId, columnType)

    set((state) => ({
      columnStyles: {
        ...state.columnStyles,
        [slideId]: {
          ...state.columnStyles[slideId],
          [columnType]: {
            ...state.columnStyles[slideId][columnType],
            fontSize,
          },
        },
      },
    }))
  },

  updateColumnHeight: (
    slideId: SlideId,
    columnId: ColumnId,
    height: number,
    maxHeight: number
  ) => {
    console.log('updateColumnHeight', columnId, height)
    const result = handleHeightChange(slideId, columnId, height, maxHeight)

    switch (result?.status) {
      case 'done':
        set((state) => ({
          calculating: {
            ...state.calculating,
            [slideId]: false,
          },
          score: {
            ...state.score,
            [slideId]: result.score,
          },
          version: {
            ...state.version,
            [slideId]: result.version,
          },
          // TODO: Doesn't this needs to set maxVersion as well?
        }))
        return
      case 'newVersion':
        console.log('NEW columnStyles', result.columnStyles)
        set((state) => ({
          score: {
            ...state.score,
            [slideId]: result.score,
          },
          version: {
            ...state.version,
            [slideId]: result.version,
          },
          maxVersion: {
            ...state.maxVersion,
            [slideId]: result.version,
          },
          columnStyles: {
            ...state.columnStyles,
            [slideId]: result.columnStyles,
          },
        }))
        return
      default:
        return
    }
  },

  decreaseVersion: (slideId: SlideId) => {
    set((state) => {
      const newVersion = Math.max(state.version[slideId] - 1, 1)
      return {
        version: {
          ...state.version,
          [slideId]: newVersion,
        },
        score: {
          ...state.score,
          [slideId]: getScore(slideId, newVersion - 1),
        },
        columnStyles: {
          ...state.columnStyles,
          [slideId]: copyColumnStyles(slideId, newVersion - 1),
        },
      }
    })
  },
  increaseVersion: (slideId: SlideId) => {
    set((state) => {
      const newVersion = Math.min(
        state.version[slideId] + 1,
        state.maxVersion[slideId]
      )
      return {
        version: {
          ...state.version,
          [slideId]: newVersion,
        },
        score: {
          ...state.score,
          [slideId]: getScore(slideId, newVersion - 1),
        },
        columnStyles: {
          ...state.columnStyles,
          [slideId]: copyColumnStyles(slideId, newVersion - 1),
        },
      }
    })
  },
}))
