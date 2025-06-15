'use client'

import { SlideData } from '../types'
import { Column } from './Column'
import { SlideContainer } from './SlideContainer'
import { ColumnsContainer } from './ColumnsContainer'
import { Offscreen } from './Offscreen'
import { ColumnFitter } from './ColumnFitter'
import { useStore } from '../store/columns'

export function Slide({ slide }: { slide: SlideData }) {
  const calculating = useStore((state) => state.calculating)
  const width = 875 // Arbitrary width, everything is relative actually
  const aspectRatio = 16 / 9

  const padding = 0.04 // Multiplied by width to get the padding in pixels
  const headerHeight = 0.0375 // Hardcoded for now, should be dynamic
  const gap = 0.03 // Horizontal gap between rows

  const blockHeight =
    width / aspectRatio -
    width * padding * 2 -
    width * headerHeight -
    width * gap

  console.log('render slide', calculating)

  return (
    <>
      <SlideContainer>
        <h1 className="text-[2.5cqw] h-[3.75cqw] font-bold">{slide.title}</h1>
        <div className="absolute top-[4cqw] right-[4cqw]">
          <p className="text-[1.5cqw]">
            {calculating ? 'Calculating...' : 'Done'}
          </p>
        </div>

        {calculating ? (
          <p className="text-[1.5cqw]">Calculating...</p>
        ) : (
          <ColumnsContainer>
            {slide.columns.map((column) => (
              <Column key={column.id} slideId={slide.id} column={column} />
            ))}
          </ColumnsContainer>
        )}
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
