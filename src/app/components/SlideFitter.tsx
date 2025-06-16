import { SlideData, ColumnId, ColumnType } from '../types'
import { Column } from './Column'
import { SlideContainer } from './SlideContainer'
import { ColumnsContainer } from './ColumnsContainer'
import { useFitter } from '../hooks/useFitter'
import { useRef } from 'react'

export function SlideFitter({
  slide,
  maxHeight,
}: {
  slide: SlideData
  maxHeight: number
}) {
  const columnRefs = useRef<
    Map<ColumnId, { ref: HTMLDivElement; columnType: ColumnType }>
  >(new Map())
  useFitter(slide, columnRefs, maxHeight)

  return (
    <SlideContainer>
      <ColumnsContainer>
        {slide.columns.map((column) => (
          <Column
            key={column.id}
            slideId={slide.id}
            column={column}
            ref={(el: HTMLDivElement | null) => {
              if (el) {
                columnRefs.current.set(column.id, {
                  ref: el,
                  columnType: column.type,
                })
              } else {
                columnRefs.current.delete(column.id)
              }
            }}
          />
        ))}
      </ColumnsContainer>
    </SlideContainer>
  )
}
