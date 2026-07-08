// ── Enums ──

export enum Role {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
}

export enum RoastLevel {
  LIGHT = 'LIGHT',
  MEDIUM = 'MEDIUM',
  MEDIUM_DARK = 'MEDIUM_DARK',
  DARK = 'DARK',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export enum CouponType {
  PERCENTAGE = 'PERCENTAGE',
  FLAT = 'FLAT',
}

// ── User ──

export interface User {
  id: string
  email: string
  name: string
  role: Role
  createdAt: string
  updatedAt: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
}

export interface AuthResponse {
  user: User
  accessToken: string
}

// ── Product ──

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  compareAtPrice: number | null
  imageUrl: string
  stock: number
  roastLevel: RoastLevel
  origin: string
  flavorNotes: string[]
  isFeatured: boolean
  createdAt: string
  updatedAt: string
}

export interface ProductFilters {
  search?: string
  roastLevel?: RoastLevel
  origin?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  sortBy?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'newest'
}

// ── Review ──

export interface Review {
  id: string
  rating: number
  title: string | null
  body: string | null
  productId: string
  userId: string
  user?: Pick<User, 'id' | 'name'>
  createdAt: string
}

// ── Cart ──

export interface CartItem {
  id: string
  productId: string
  quantity: number
  product?: Product
}

export interface Cart {
  id: string
  userId: string
  items: CartItem[]
  updatedAt: string
}

// ── Order ──

export interface OrderItem {
  id: string
  productId: string
  quantity: number
  unitPrice: number
  product?: Pick<Product, 'id' | 'name' | 'imageUrl'>
}

export interface Order {
  id: string
  userId: string
  status: OrderStatus
  total: number
  discountAmount: number
  couponId: string | null
  shippingAddress: ShippingAddress
  items: OrderItem[]
  createdAt: string
  updatedAt: string
}

export interface ShippingAddress {
  line1: string
  line2?: string
  city: string
  state: string
  zip: string
  country: string
}

// ── Coupon ──

export interface Coupon {
  id: string
  code: string
  type: CouponType
  value: number
  minOrder: number | null
  expiresAt: string | null
  isActive: boolean
}

// ── API ──

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ApiError {
  message: string
  statusCode: number
}

// ── Socket Events ──

export interface StockUpdate {
  productId: string
  newStock: number
}
