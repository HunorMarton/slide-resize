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

export type SlideId = string
export type ColumnId = string
export type ColumnType = string

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
  id: ColumnId
  type: ColumnType
  blocks: BlockData[]
}

export type SlideData = {
  id: SlideId
  title: string
  columns: ColumnData[]
}

export type Style = {
  grow: number
  fontSize: number
}
