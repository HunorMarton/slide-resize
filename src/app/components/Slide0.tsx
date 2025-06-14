'use client'

import { SlideData } from '../types'
import { Column } from './Column'
import { SlideContainer } from './SlideContainer'
import { Offscreen } from './Offscreen'
import { ColumnFitter } from './ColumnFitter'

export function Slide({ slide }: { slide: SlideData }) {
  const width = 875 // Arbitrary width, everything is relative to this
  const padding = 0.04 // Multiplied by width to get the padding in pixels
  const aspectRatio = 16 / 9
  const blockHeight = width / aspectRatio - width * padding

  console.log('render slide')

  return (
    <>
      <SlideContainer>
        {slide.columns.map((column) => (
          <Column key={column.id} slideId={slide.id} column={column} />
        ))}
      </SlideContainer>

      <Offscreen width={width}>
        <SlideContainer>
          {slide.columns.map((column) => (
            <ColumnFitter
              key={column.id}
              slideId={slide.id}
              column={column}
              maxHeight={blockHeight}
            />
          ))}
        </SlideContainer>
      </Offscreen>
    </>
  )
}
