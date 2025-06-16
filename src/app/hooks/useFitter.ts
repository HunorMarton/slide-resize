import { useEffect } from 'react'
import { useStore } from '../store/columns'
import { SlideData, ColumnType, ColumnId } from '../types'
import { FONT_SIZE_INCREMENT } from '../store/constants'

export function useFitter(
  slide: SlideData,
  columnRefs: React.RefObject<
    Map<ColumnId, { ref: HTMLDivElement; columnType: ColumnType }>
  >,
  maxHeight: number
) {
  const columnStyles = useStore((state) => state.columnStyles[slide.id])
  const updateColumnStyles = useStore((state) => state.updateColumnStyles)

  console.log('useFitter', slide.id, columnStyles)

  useEffect(() => {
    // Store font sizes per column type and measurements per column
    const columnTypeFontSizes = new Map<ColumnType, number>()
    const columnSizes = new Map<ColumnId, { width: number; height: number }>()

    // First pass: set font sizes
    columnRefs.current.forEach(({ ref, columnType }) => {
      const currentFontSize = columnStyles[columnType].fontSize
      ref.style.setProperty('--font-size', `${currentFontSize}cqw`)
      columnTypeFontSizes.set(columnType, currentFontSize)
    })

    // Check each column type and adjust if any column of that type is too tall
    columnRefs.current.forEach(({ ref, columnType }, columnId) => {
      const { width } = ref.getBoundingClientRect()
      let { height } = ref.getBoundingClientRect()
      columnSizes.set(columnId, { width, height })

      let updatedFontSize = columnTypeFontSizes.get(columnType) ?? 0

      while (height > maxHeight) {
        updatedFontSize -= FONT_SIZE_INCREMENT

        // Update all columns of this type with the new font size
        columnRefs.current.forEach(
          ({ ref: ref2, columnType: columnType2 }, columnId2) => {
            if (columnType === columnType2) {
              ref2.style.setProperty('--font-size', `${updatedFontSize}cqw`)
              const { width: w2, height: h2 } = ref2.getBoundingClientRect()
              columnSizes.set(columnId2, { width: w2, height: h2 })
            }
          }
        )

        // Update the height of the current column after font size change
        height = ref.getBoundingClientRect().height
      }

      columnTypeFontSizes.set(columnType, updatedFontSize)
    })

    // Update store with final sizes
    // First update all font sizes at once
    const newColumnStyles = { ...columnStyles }
    columnTypeFontSizes.forEach((fontSize, columnType) => {
      newColumnStyles[columnType] = {
        ...newColumnStyles[columnType],
        fontSize,
      }
    })

    // Then update all column sizes at once
    updateColumnStyles(slide.id, newColumnStyles, columnSizes, maxHeight)
  }, [
    slide.id,
    slide.columns,
    columnStyles,
    columnRefs,
    maxHeight,
    updateColumnStyles,
  ])
}
