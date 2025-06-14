import { create } from 'zustand'
import { SlideId, ColumnType, ColumnId, Style } from '../types'
import { slides } from '../lib/data2'
import {
  generateDefaultStyle,
  saveFontSize,
  handleHeightChange,
  invalidateColumnHeightsForType,
} from './columnLogic'

// TODO: Use only one CSS variable

interface ColumnState {
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
}

export const useStore = create<ColumnState>()((set) => ({
  columnStyles: slides.reduce((acc, slide) => {
    acc[slide.id] = generateDefaultStyle(slide)
    return acc
  }, {} as Record<SlideId, Record<ColumnType, Style>>),

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
    const newColumnStyles = handleHeightChange(
      slideId,
      columnId,
      height,
      maxHeight
    )

    if (!newColumnStyles) return
    console.log('NEW columnStyles', newColumnStyles)

    set((state) => ({
      columnStyles: {
        ...state.columnStyles,
        [slideId]: newColumnStyles,
      },
    }))
  },
}))
