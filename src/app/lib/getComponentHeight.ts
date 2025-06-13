import { createRoot } from 'react-dom/client'
import { flushSync } from 'react-dom'
import { BlockData, ColumnData, StyleVariables } from '../types'

export async function getComponentHeight({
  context,
  containerWidth,
  blockWidth,
  renderer,
}: {
  containerWidth: number
  context: StyleVariables
  blockWidth: number
  renderer: (target: HTMLElement) => Promise<void> | void
}) {
  const container = createContainer(containerWidth, context)

  const block = document.createElement('div')
  block.style.width = `${blockWidth}px`
  container.appendChild(block)

  await renderer(block)

  document.body.appendChild(container)

  /*
  console.log('block', container, block.getBoundingClientRect())
  console.table(
    Array.from(block.children[0].children).map((child) =>
      child.getBoundingClientRect()
    )
  )
  */

  const height = block.getBoundingClientRect().height
  // document.body.removeChild(container)

  return height
}

export function renderReactNode(
  children: React.ReactNode,
  target: HTMLElement
) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const root = createRoot(target)
      flushSync(() => {
        root.render(children)
      })
      resolve(true)
    }, 1)
  })
}

export function renderDOMColumn(column: ColumnData, target: HTMLElement) {
  const columnElement = document.createElement('div')

  for (const block of column.blocks) {
    renderDOMBlock(block).forEach((element) => {
      columnElement.appendChild(element)
    })
  }

  target.appendChild(columnElement)
}

export function renderDOMBlock(block: BlockData): HTMLElement[] {
  switch (block.type) {
    case 'header': {
      const blockElement = document.createElement('h1')
      blockElement.innerText = block.content
      blockElement.style.fontSize = `var(--header-font-size)`
      return [blockElement]
    }
    case 'text': {
      return block.paragraphs.map((paragraph) => {
        const pElement = document.createElement('p')
        pElement.innerText = paragraph
        pElement.style.fontSize = `var(--text-font-size)`
        pElement.style.margin = '1cqw 0'
        return pElement
      })
    }
    default: {
      return [document.createElement('div')]
    }
  }
}

function createContainer(width: number, context: StyleVariables) {
  const container = document.createElement('div')
  container.style.width = `${width}px`
  container.style.containerType = 'inline-size'
  container.style.setProperty('--header-font-size', `${context.font * 1.25}cqw`)
  container.style.setProperty('--text-font-size', `${context.font}cqw`)
  hideElement(container)
  return container
}

function hideElement(element: HTMLElement) {
  element.style.position = 'absolute'
  element.style.left = '-9999px'
  element.style.top = '-9999px'
  element.style.visibility = 'hidden'
  element.style.pointerEvents = 'none'
}
