import { createRoot } from 'react-dom/client'
import { flushSync } from 'react-dom'

export async function Renderer(children: React.ReactNode) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const container = document.createElement('div')
      container.style.position = 'absolute'
      container.style.left = '-9999px'
      container.style.top = '-9999px'
      container.style.visibility = 'hidden'
      container.style.pointerEvents = 'none'
      document.body.appendChild(container)
      const root = createRoot(container)

      flushSync(() => {
        root.render(children)
      })
      const height = container.getBoundingClientRect().height
      document.body.removeChild(container)

      resolve(height)
    }, 1)
  })
}
