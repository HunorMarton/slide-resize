'use client'

import { SlideData } from '../types'
import { Column } from './Column'
import { SlideContainer } from './SlideContainer'
import { ColumnsContainer } from './ColumnsContainer'
import { Offscreen } from './Offscreen'
import { ColumnFitter } from './ColumnFitter'

// TODO: Loading state

export function Slide({ slide }: { slide: SlideData }) {
  const width = 875 // Arbitrary width, everything is relative actually
  const padding = 0.04 // Multiplied by width to get the padding in pixels
  const aspectRatio = 16 / 9
  const headerHeight = 0.0375 // Hardcoded for now, should be dynamic
  const gap = 0.03
  const blockHeight =
    width / aspectRatio -
    width * padding * 2 -
    width * headerHeight -
    width * gap

  console.log('render slide')

  return (
    <>
      <SlideContainer>
        <h1 className="text-[2.5cqw] h-[3.75cqw] font-bold">{slide.title}</h1>
        <ColumnsContainer>
          {slide.columns.map((column) => (
            <Column key={column.id} slideId={slide.id} column={column} />
          ))}
        </ColumnsContainer>
      </SlideContainer>

      <Offscreen width={width}>
        <SlideContainer>
          <ColumnsContainer>
            {slide.columns.map((column) => (
              <ColumnFitter
                key={column.id}
                slideId={slide.id}
                column={column}
                maxHeight={blockHeight}
              />
            ))}
          </ColumnsContainer>
        </SlideContainer>
      </Offscreen>
    </>
  )
}
