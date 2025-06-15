import { useStore } from '../store/columns'
import { SlideId, ColumnType } from '../types'

export function useUpdateColumnFontSize(
  slideId: SlideId,
  version: number,
  columnType: ColumnType
) {
  return useStore((state) => state.updateColumnFontSize).bind(
    null,
    slideId,
    version,
    columnType
  )
}
