'use client'

import { useEffect, useRef, useState } from 'react'
import { StyleVariables } from '../types'

export function useMeasure({
  containerWidth,
  components,
  blockWidth,
  blockHeight,
}: {
  containerWidth: number
  components: React.ReactNode[]
  blockWidth: number
  blockHeight: number
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [styleVariables, setStyleVariables] = useState<StyleVariables>({
    font: 0,
  })
  const [time, setTime] = useState(0)

  useEffect(() => {
    if (ref.current) {
      const t0 = performance.now()

      let font = 5

      while (true) {
        const height = ref.current.getBoundingClientRect().height
        // console.log('height', font, height, blockHeight)
        if (height <= blockHeight) break

        font -= 0.05
        ref.current.style.setProperty('--header-font-size', `${font * 1.25}cqw`)
        ref.current.style.setProperty('--text-font-size', `${font}cqw`)
      }

      const t1 = performance.now()
      setTime(t1 - t0)
      // console.log('final font', font, t1 - t0)

      // const height = ref.current.getBoundingClientRect().height
      // console.log('final height', height, blockHeight)

      setStyleVariables({ font })
    }
  }, [components, blockWidth, blockHeight])

  return {
    styleVariables,
    time,
    node: (
      <div
        className="@container"
        style={{
          /*
          position: 'absolute',
          visibility: 'hidden',
          pointerEvents: 'none',
          whiteSpace: 'normal',
          */

          width: containerWidth,
        }}
      >
        <div
          ref={ref}
          className="grid gap-[2cqw]"
          style={
            {
              '--header-font-size': '12cqw',
              '--text-font-size': '10cqw',

              gridTemplateColumns: `repeat(${components.length}, minmax(0, 1fr))`,
              width: blockWidth,
            } as React.CSSProperties
          }
        >
          {components}
        </div>
      </div>
    ),
  }
}
