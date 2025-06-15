import { useEffect } from 'react'
import { ColumnData, SlideId } from '../types'
import { useFontSize } from './useFontSize'
import { useColumnGrow } from './useColumnGrow'
import { useUpdateColumnFontSize } from './useUpdateColumnFontSizes'
import { useUpdateColumnSize } from './useUpdateColumnSize'
import { FONT_SIZE_INCREMENT } from '../store/constants'
import { useStore } from '../store/columns'

export function useColumnSizeMaximizer(
  slideId: SlideId,
  column: ColumnData,
  ref: React.RefObject<HTMLDivElement | null>,
  maxHeight: number
) {
  const version = useStore((state) => state.version[slideId])
  const fontSize = useFontSize(slideId, column.type)
  const columnGrow = useColumnGrow(slideId, column.type)
  const updateColumnFontSize = useUpdateColumnFontSize(
    slideId,
    version,
    column.type
  )
  const updateColumnSize = useUpdateColumnSize(slideId, version, column.id)

  console.log('maximizer', column.id, fontSize, columnGrow)

  useEffect(() => {
    if (ref.current) {
      let updatedFontSize = fontSize
      ref.current.style.setProperty('--font-size', `${updatedFontSize}cqw`)
      const { width } = ref.current.getBoundingClientRect()
      let { height } = ref.current.getBoundingClientRect()
      /*
      console.log(
        'initial height',
        column.id,
        height,
        maxHeight,
      )
      */

      while (height > maxHeight) {
        updatedFontSize -= FONT_SIZE_INCREMENT
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
        console.log(column.id, 'final font', updatedFontSize)

        // const height = ref.current.getBoundingClientRect().height
        // console.log('final height', height, blockHeight)

        updateColumnFontSize(updatedFontSize)
      }

      // Make sure the height is reflecting the font size even if the font size did not change
      // (it is possible that the font size changed by another column since the height was last updated)
      updateColumnSize(updatedFontSize, width, height, maxHeight)
    }
  }, [
    ref,
    column,
    version,
    columnGrow,
    maxHeight,
    updateColumnFontSize,
    fontSize,
    updateColumnSize,
  ])
}
