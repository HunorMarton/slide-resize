import { useStore } from '../store/columns'
import { SlideId, ColumnId } from '../types'

export function useUpdateColumnSize(
  slideId: SlideId,
  version: number,
  columnId: ColumnId
) {
  return useStore((state) => state.updateColumnSize).bind(
    null,
    slideId,
    version,
    columnId
  )
}
