export type ComponentType = 'description' | 'text-block' | 'table'

export type BlockType =
  | 'header'
  | 'text'
  | 'list'
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
      type: Exclude<BlockType, 'text' | 'list' | 'table'>
      content: string
    }
  | TextBlockData
  | ListBlockData
  | TableBlockData

type TextBlockData = {
  id: string
  type: 'text'
  paragraphs: string[]
}

type ListBlockData = {
  id: string
  type: 'list'
  label?: string
  items: string[]
}

type TableBlockData = {
  id: string
  type: 'table'
  headers: string[]
  rows: {
    id: string
    cells: string[]
  }[]
}

export type SlideData = {
  id: SlideId
  title: string
  columns: ColumnData[]
}

export type ColumnData = {
  id: ColumnId
  type: ColumnType
  components: ComponentData[]
}

export type ComponentData = {
  id: string
  type: ComponentType
  blocks: BlockData[]
}

export type Style = {
  grow: number
  fontSize: number
}
