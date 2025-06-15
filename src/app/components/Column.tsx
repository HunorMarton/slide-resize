import { ColumnData, SlideId } from '../types'
import { Block } from './Block'
import { useFontSize } from '../hooks/useFontSize'
import { useColumnGrow } from '../hooks/useColumnGrow'

export function Column({
  slideId,
  column,
  ref,
}: {
  slideId: SlideId
  column: ColumnData
  ref?: React.RefObject<HTMLDivElement | null>
}) {
  const fontSize = useFontSize(slideId, column.type)
  const grow = useColumnGrow(slideId, column.type)

  return (
    <div
      ref={ref}
      className="basis-0 overflow-x-hidden hover:outline hover:outline-green-500 hover:outline-dashed"
      style={
        {
          '--font-size': `${fontSize}cqw`,
          flexGrow: `${grow}`,
        } as React.CSSProperties
      }
    >
      {column.blocks.map((block) => (
        <Block key={block.id} block={block} />
      ))}
    </div>
  )
}
