'use client'

import { BlockData } from '../types'

export function Block({ block }: { block: BlockData }) {
  switch (block.type) {
    case 'header':
      return (
        <h1
          className="font-bold mb-[1cqw]"
          style={{ fontSize: `calc(var(--font-size) * 1.25)` }}
        >
          {block.content}
        </h1>
      )
    case 'text':
      return (
        <>
          {block.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="my-[1cqw]"
              style={{ fontSize: `var(--font-size)` }}
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
