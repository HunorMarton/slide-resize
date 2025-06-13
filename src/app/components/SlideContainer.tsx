'use client'

import { StyleVariables } from '../types'

export function SlideContainer({
  children,
  styleVariables,
}: {
  children: React.ReactNode | React.ReactNode[]
  styleVariables: StyleVariables
}) {
  const columns = Array.isArray(children) ? children.length : 1
  return (
    <div className="bg-blue-500 rounded-lg m-3 aspect-video @container overflow-y-hidden">
      <div
        className="grid p-[2cqw] gap-[2cqw] h-full"
        style={
          {
            '--header-font-size': `${styleVariables.font * 1.25}cqw`,
            '--text-font-size': `${styleVariables.font}cqw`,
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </div>
  )
}
