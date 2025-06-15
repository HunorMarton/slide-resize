import { useEffect } from 'react'
import { ColumnData, SlideId } from '../types'
import { useFontSize } from './useFontSize'
import { useColumnGrow } from './useColumnGrow'
import { useUpdateColumnFontSize } from './useUpdateColumnFontSizes'
import { useUpdateColumnHeight } from './useUpdateColumnHeight'
import { FONT_SIZE_INCREMENT } from '../store/constants'

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
      let updatedFontSize = fontSize
      let height = ref.current.getBoundingClientRect().height

      while (height > maxHeight) {
        updatedFontSize -= FONT_SIZE_INCREMENT
        ref.current.style.setProperty('--font-size', `${updatedFontSize}cqw`)

        height = ref.current.getBoundingClientRect().height

        console.log(
          column.id,
          'updated font size',
          updatedFontSize,
          height,
          maxHeight
        )
      }

      if (updatedFontSize !== fontSize) {
        console.log(column.id, 'final font', updatedFontSize)

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
