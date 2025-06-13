import { ColumnData } from '../types'
import { Block } from './Block'

export function Column({ column }: { column: ColumnData }) {
  return (
    <div>
      {column.blocks.map((block) => (
        <Block key={block.id} block={block} />
      ))}
    </div>
  )
}
