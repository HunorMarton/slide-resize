import { useEffect } from 'react'
import { ColumnData, SlideId } from '../types'
import { useFontSize } from './useFontSize'
import { useColumnGrow } from './useColumnGrow'
import { useUpdateColumnFontSize } from './useUpdateColumnFontSizes'
import { useUpdateColumnHeight } from './useUpdateColumnHeight'

export function useColumnSizeMaximizer(
  slideId: SlideId,
  column: ColumnData,
  ref: React.RefObject<HTMLDivElement | null>,
  maxHeight: number
) {
  const fontSize = useFontSize(slideId, column.type)
  const columnGrow = useColumnGrow(slideId, column.type)
  const updateColumnFontSize = useUpdateColumnFontSize(slideId, column.type)
  const updateColumnHeight = useUpdateColumnHeight(slideId, column.id)

  console.log('maximizer', column.id, fontSize)

  useEffect(() => {
    if (ref.current) {
      const t0 = performance.now()

      let updatedFontSize = fontSize
      let height = ref.current.getBoundingClientRect().height

      while (height > maxHeight) {
        updatedFontSize -= 0.05
        ref.current.style.setProperty('--font-size', `${updatedFontSize}cqw`)

        height = ref.current.getBoundingClientRect().height

        /*
        console.log(
          column.id,
          'updated font size',
          updatedFontSize,
          height,
          maxHeight
        )
        */
      }

      if (updatedFontSize !== fontSize) {
        const t1 = performance.now()
        console.log(column.id, 'final font', updatedFontSize, t1 - t0)

        // const height = ref.current.getBoundingClientRect().height
        // console.log('final height', height, blockHeight)

        updateColumnFontSize(updatedFontSize)
      }

      // Make sure the height is reflecting the font size even if the font size did not change
      // (it is possible that the font size changed by another column since the height was last updated)
      updateColumnHeight(height, maxHeight)
    }
  }, [
    ref,
    column,
    columnGrow,
    maxHeight,
    updateColumnFontSize,
    fontSize,
    updateColumnHeight,
  ])
}
