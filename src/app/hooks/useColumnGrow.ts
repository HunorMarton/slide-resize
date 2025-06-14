import { useStore } from '../store/columns'
import { SlideId, ColumnType } from '../types'

export function useColumnGrow(slideId: SlideId, columnType: ColumnType) {
  return useStore((state) => state.columnStyles[slideId]?.[columnType].grow)
}
