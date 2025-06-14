import { useStore } from '../store/columns'
import { SlideId, ColumnId } from '../types'

export function useUpdateColumnHeight(slideId: SlideId, columnId: ColumnId) {
  return useStore((state) => state.updateColumnHeight).bind(
    null,
    slideId,
    columnId
  )
}
