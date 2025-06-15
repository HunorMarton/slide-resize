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
    case 'list':
      return (
        <>
          {block.label && (
            <p className="my-[1cqw]" style={{ fontSize: `var(--font-size)` }}>
              {block.label}
            </p>
          )}
          <ul className="list-disc pl-[4cqw]">
            {block.items.map((item) => (
              <li key={item} style={{ fontSize: `var(--font-size)` }}>
                {item}
              </li>
            ))}
          </ul>
        </>
      )
    case 'table':
      return (
        <table
          className="table-fixed w-full"
          style={{ fontSize: `var(--font-size)` }}
        >
          <thead>
            <tr>
              {block.headers.map((header) => (
                <th
                  key={header}
                  className="border border-y-gray-300 border-x-transparent p-[1cqw] bg-gray-100"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row) => (
              <tr key={row.id}>
                {row.cells.map((cell, index) => (
                  <td
                    key={index}
                    scope={index === 0 ? 'row' : undefined}
                    className="border border-y-gray-300 border-x-transparent p-[1cqw]"
                    style={{
                      fontSize:
                        index === 0
                          ? `calc(var(--font-size) * 0.6)`
                          : 'inherit',
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )
    default:
      return <div>{block.content}</div>
  }
}
