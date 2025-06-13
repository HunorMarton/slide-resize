export type BlockType =
  | 'header'
  | 'text'
  | 'image'
  | 'video'
  | 'audio'
  | 'chart'
  | 'table'
  | 'form'
  | 'other'

export type BlockData =
  | {
      id: string
      type: Exclude<BlockType, 'text'>
      content: string
    }
  | TextBlockData

type TextBlockData = {
  id: string
  type: 'text'
  paragraphs: string[]
}

export type ColumnData = {
  id: string
  blocks: BlockData[]
}

export type SlideData = {
  id: string
  title: string
  columns: ColumnData[]
}

export type StyleVariables = {
  font: number
}
