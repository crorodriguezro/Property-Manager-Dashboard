/**
 * Type definitions based on OpenAPI schema
 */

export type PropertyType = 'UNIFAMILIAR' | 'MULTIFAMILIAR' | 'COMERCIAL'

export interface AddressDto {
  address1: string
  address2?: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface PropertyDetailsDto {
  yearBuilt?: string
  area?: string
  lotSize?: string
  parkingSpaces?: string
}

export interface UnitDto {
  id?: number
  bathrooms?: number
  bedrooms?: number
  number: string
  type?: string
  status?: string
  area?: number
  monthlyRent?: number
  marketRent?: number
  note?: string
}

export interface PropertyDto {
  id?: number
  name: string
  type?: PropertyType
  address: string
  units?: UnitDto[]
  totalUnits?: number
  occupiedUnits?: number
  monthlyRevenue?: number
  activeLeases?: number
}

export interface UnitCreateRequest {
  name: string
  bedrooms?: string
  bathrooms?: string
  size?: string
  marketRent?: string
  note?: string
}

export interface PropertyCreateRequest {
  propertyName: string
  propertyType: PropertyType
  address: AddressDto
  details?: PropertyDetailsDto
  description?: string
  units?: UnitCreateRequest[]
}

// Frontend display types (for compatibility with existing components)
export interface Property {
  id: string
  name: string
  address: string
  type: string
  activeLeases: number
  occupiedUnits: number
  totalUnits: number
  monthlyRevenue: number
  image?: string
}

export interface Unit {
  id: string
  name: string
  type: string
  bedrooms: number
  bathrooms: number
  squareFeet: number
  rent: number
  status: string
  tenant?: string
}

export interface PropertyDetail extends Property {
  yearBuilt?: number
  squareFeet?: number
  bedrooms?: number
  bathrooms?: number
  parkingSpaces?: number
  purchasePrice?: number
  currentValue?: number
  averageRent?: number
  images?: string[]
  description?: string
  owner?: {
    name: string
    contact: string
    ownership: number
  }
  amenities?: string[]
  units?: Unit[]
  leases?: any[]
  payments?: any[]
  financials?: {
    totalIncome: number
    totalExpenses: number
    netIncome: number
    yearToDateRevenue: number
  }
  maintenance?: any[]
  documents?: any[]
}
