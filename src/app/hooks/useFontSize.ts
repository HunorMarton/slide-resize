import { useStore } from '../store/columns'
import { ColumnType, SlideId } from '../types'

export function useFontSize(slideId: SlideId, columnType: ColumnType) {
  return useStore((state) => state.columnStyles[slideId]?.[columnType].fontSize)
}
