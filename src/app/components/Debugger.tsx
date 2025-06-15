import { useStore } from '../store/columns'
import { SlideId } from '../types'
import { DebuggerValue } from './DebuggerValue'
import { Versions } from './Versions'

export function Debugger({
  slideId,
  columnTypes,
}: {
  slideId: SlideId
  columnTypes: string
}) {
  const calculating = useStore((state) => state.calculating[slideId])
  const score = useStore((state) => state.score[slideId])

  return (
    <div className="absolute top-[4cqw] right-[4cqw] opacity-40">
      {calculating ? (
        <p className="text-[1.5cqw]">Calculating...</p>
      ) : (
        <div className="flex flex-row items-center gap-[2cqw]">
          <DebuggerValue value={columnTypes} label="Columns" />
          <DebuggerValue value={`${(score * 100).toFixed(1)}%`} label="Score" />
          <Versions slideId={slideId} />
        </div>
      )}
    </div>
  )
}
