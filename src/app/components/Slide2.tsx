'use client'

import { SlideData, StyleVariables } from '../types'
import { Column } from './Column'
import { sizeEngine } from '../lib/sizeEngine'
import { useEffect, useState } from 'react'
import { SlideContainer } from './SlideContainer'

export function Slide({ slide }: { slide: SlideData }) {
  const [styleVariables, setStyleVariables] = useState<StyleVariables>({
    font: 5,
  })
  const [time, setTime] = useState(0)

  const width = 875 // Arbitrary width, everything is relative to this
  const padding = 0.04 // Multiplied by width to get the padding in pixels
  const aspectRatio = 16 / 9
  const blockWidth = width - width * padding
  const blockHeight = width / aspectRatio - width * padding

  useEffect(() => {
    async function getContext() {
      const context = await sizeEngine({
        columns: slide.columns,
        containerWidth: width,
        blockWidth,
        blockHeight,
        useReactRenderer: true,
      })
      setStyleVariables(context)
      setTime(context.time)
    }
    getContext()
  }, [slide, blockWidth, blockHeight, width])

  return (
    <>
      <div>
        Rendering independently from the React rendering cycle (using the same
        React components)
      </div>
      <div>{time}ms</div>
      <SlideContainer styleVariables={styleVariables}>
        {slide.columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
      </SlideContainer>
    </>
  )
}
