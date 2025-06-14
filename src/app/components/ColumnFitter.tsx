import { ColumnData, SlideId } from '../types'
import { Column } from './Column'
import { useRef } from 'react'
import { useColumnSizeMaximizer } from '../hooks/useColumnSizeMaximizer'

export function ColumnFitter({
  slideId,
  column,
  maxHeight,
}: {
  slideId: SlideId
  column: ColumnData
  maxHeight: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  useColumnSizeMaximizer(slideId, column, ref, maxHeight)

  return <Column slideId={slideId} column={column} ref={ref} />
}
