import { ColumnData, SlideId } from '../types'
import { Block } from './Block'
import { useFontSize } from '../hooks/useFontSize'
import { useColumnGrow } from '../hooks/useColumnGrow'
import { forwardRef } from 'react'

export const Column = forwardRef<
  HTMLDivElement,
  {
    slideId: SlideId
    column: ColumnData
  }
>(({ slideId, column }, ref) => {
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
})

Column.displayName = 'Column'
