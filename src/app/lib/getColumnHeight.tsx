import { Column } from '../components/Column'
import { ColumnData, StyleVariables } from '../types'
import {
  getComponentHeight,
  renderReactNode,
  renderDOMColumn,
} from './getComponentHeight'

export async function getColumnHeight({
  column,
  context,
  containerWidth,
  blockWidth,
  useReactRenderer,
}: {
  column: ColumnData
  context: StyleVariables
  containerWidth: number
  blockWidth: number
  useReactRenderer: boolean
}) {
  const renderer = useReactRenderer
    ? async (target: HTMLElement) => {
        await renderReactNode(
          <Column key={column.id} column={column} />,
          target
        )
      }
    : (target: HTMLElement) => {
        renderDOMColumn(column, target)
      }

  const height = await getComponentHeight({
    context,
    containerWidth,
    blockWidth,
    renderer,
  })
  return height
}
