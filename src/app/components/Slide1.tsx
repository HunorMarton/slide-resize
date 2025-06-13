'use client'

import { SlideData } from '../types'
import { Column } from './Column'
import { useMemo } from 'react'
import { useMeasure } from '../hooks/useMeasure'
import { SlideContainer } from './SlideContainer'

export function Slide({ slide }: { slide: SlideData }) {
  const width = 875 // Arbitrary width, everything is relative to this
  const padding = 0.04 // Multiplied by width to get the padding in pixels
  const aspectRatio = 16 / 9
  const blockWidth = width - width * padding
  const blockHeight = width / aspectRatio - width * padding

  const { styleVariables, time, node } = useMeasure({
    containerWidth: width,
    components: useMemo(() => {
      return slide.columns.map((column) => (
        <Column key={column.id} column={column} />
      ))
    }, [slide]),
    blockWidth,
    blockHeight,
  })

  return (
    <>
      <div>Rendering within the React rendering cycle</div>
      <div>{time}ms</div>
      <SlideContainer styleVariables={styleVariables}>
        {slide.columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
      </SlideContainer>
      {node}
    </>
  )
}
