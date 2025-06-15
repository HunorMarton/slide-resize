import { useStore } from '../store/columns'
import { SlideId } from '../types'
import { DebuggerValue } from './DebuggerValue'

export function Versions({ slideId }: { slideId: SlideId }) {
  const version = useStore((state) => state.version[slideId])
  const maxVersion = useStore((state) => state.maxVersion[slideId])
  const decreaseVersion = useStore((state) => state.decreaseVersion)
  const increaseVersion = useStore((state) => state.increaseVersion)

  return (
    <div className="flex items-center gap-[1cqw]">
      <button
        className="text-[1.5cqw] px-[1cqw] bg-gray-200/50 aspect-square rounded-full cursor-pointer"
        onClick={() => decreaseVersion(slideId)}
      >
        -
      </button>
      <DebuggerValue value={`${version}/${maxVersion}`} label="Version" />

      <button
        className="text-[1.5cqw] px-[1cqw] bg-gray-200/50 aspect-square rounded-full cursor-pointer"
        onClick={() => increaseVersion(slideId)}
      >
        +
      </button>
    </div>
  )
}
