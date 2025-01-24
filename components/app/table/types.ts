export interface Header {
  label: string
  value: string
  headerClass?: string
  cellClass?: string
  align?: Alignment
}

export interface Pagination {
  total?: number
  count?: number
  perPage?: number
  page?: number
  totalPages?: number
}

export type Alignment = 'start' | 'center' | 'end'
