'use client'

import { BlockData } from '../types'

export function Block({ block }: { block: BlockData }) {
  switch (block.type) {
    case 'header':
      return (
        <h1 style={{ fontSize: `var(--header-font-size)` }}>{block.content}</h1>
      )
    case 'text':
      return (
        <>
          {block.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="my-[1cqw]"
              style={{ fontSize: `var(--text-font-size)` }}
            >
              {paragraph}
            </p>
          ))}
        </>
      )
    default:
      return <div>{block.content}</div>
  }
}
