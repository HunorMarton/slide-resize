import { ColumnId } from '../types'

export function getTallestColumn(
  columnSizes: Map<ColumnId, { width: number; height: number }>
) {
  const tallestColumn = Array.from(columnSizes.entries()).reduce(
    (acc, [columnId, { height }]) =>
      height > acc.height ? { columnId, height } : acc,
    { columnId: null as ColumnId | null, height: 0 }
  )
  if (!tallestColumn.columnId) throw new Error('No tallest column')

  return tallestColumn.columnId
}

export function calculateScore(
  columnSizes: Map<ColumnId, { width: number; height: number }>,
  maxHeight: number
) {
  const totalSize = columnSizes
    .values()
    .reduce((acc, curr) => acc + curr.width * curr.height, 0)

  const maxSize = columnSizes
    .values()
    .reduce((acc, curr) => acc + curr.width * maxHeight, 0)

  const score = totalSize / maxSize

  return score
}
