export interface MetaResponse {
  currentPage: number
  pageSize: number
  totalItems: number
  totalPages: number
}

export interface Response<T> {
  success: boolean
  data: T
  message: string
  meta: MetaResponse
}

export interface ResponseSingle<T> {
  success: boolean
  data: T
  message: string
}
