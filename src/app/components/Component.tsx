import { ComponentData } from '../types'
import { Block } from './Block'

export function Component({ component }: { component: ComponentData }) {
  switch (component.type) {
    case 'text-block':
      return (
        <div className="text-block">
          {component.blocks.map((block) => (
            <Block key={block.id} block={block} />
          ))}
        </div>
      )
    case 'description':
      return (
        <div className="description">
          {component.blocks.map((block) => (
            <Block key={block.id} block={block} />
          ))}
        </div>
      )
    case 'table':
      return (
        <div className="table">
          {component.blocks.map((block) => (
            <Block key={block.id} block={block} />
          ))}
        </div>
      )
    default:
      return null
  }
}
