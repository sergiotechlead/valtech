import type { ReactNode } from 'react'

type Pagination = {
  page: number
  pageSize: number
  total: number
}

type OrderItem = {
  skuId: string
  skuName: string
  skuImageUrl: string
  price: number
  quantity: number
  commission: number
}

export type Totalizers = {
  total: number
  totalCommissionSum: number
  totalOrderSum: number
}

export type TotalizersProfile = {
  totalCancelled: number
  totalOngoing: number
  totalInvoiced: number
}

export type cookieFortuneOrdersData = {
  id: string
  orderId: string
  status: string
  userEmail: string
  orderTotal: number
  orderTotalCommission: number
  orderDate: string
  orderItems: [OrderItem]
  lastInteractionIn: string
}

export type OrdersPagination = {
  page: number
  pageSize: number
  total: number
}

export type cookieFortuneOrdersQueryReturnType = {
  affiliateOrders: {
    data: [cookieFortuneOrdersData]
    pagination: Pagination
    totalizers: Totalizers
    totalizersProfile: TotalizersProfile
  }
}

export type CookieFortuneOrderQueryReturnType = {
  affiliateOrder: cookieFortuneOrdersData
}

type CommissionBySKU = {
  id: string
  skuId: string
  commission: number
  refId: string
}

export type CommissionsQueryReturnType = {
  commissionsBySKU: {
    data: [CommissionBySKU]
    pagination: Pagination
  }
}

export type Action = {
  label: string
  icon: ReactNode
  handleOnClick: (item: unknown) => void
}

export type PaletteColors =
  | 'teal'
  | 'green'
  | 'red'
  | 'cyan'
  | 'gray'
  | 'orange'
  | 'purple'
  | 'lightBlue'
  | undefined
