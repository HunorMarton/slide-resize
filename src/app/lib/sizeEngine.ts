import { ColumnData } from '../types'
import { getColumnHeight } from './getColumnHeight'

export async function sizeEngine({
  columns,
  containerWidth,
  blockWidth,
  blockHeight,
  useReactRenderer,
}: {
  columns: ColumnData[]
  containerWidth: number
  blockWidth: number
  blockHeight: number
  useReactRenderer: boolean
}) {
  const t0 = performance.now()

  let font = 5
  // Find the largest font size where each column fits the parent width and height, if the column is too tall, reduce the font size until the column fits
  for (const column of columns) {
    while (true) {
      const context = {
        font,
      }
      const height = await getColumnHeight({
        column,
        context,
        containerWidth,
        blockWidth,
        useReactRenderer,
      })

      if (height <= blockHeight) break
      font -= 0.05
    }
  }
  const t1 = performance.now()

  return { font, time: t1 - t0 }
}
