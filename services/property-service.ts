/**
 * Property Service
 * Service layer for property management API calls
 */

import { apiClient } from '@/lib/api-client'
import type {
  PropertyDto,
  PropertyCreateRequest,
  UnitDto,
  Property,
  PropertyDetail,
} from '@/lib/types/property'

/**
 * Transform backend PropertyDto to frontend Property format
 */
function transformPropertyDto(dto: PropertyDto): Property {
  return {
    id: dto.id?.toString() || '',
    name: dto.name,
    address: dto.address,
    type: dto.type || 'UNIFAMILIAR',
    activeLeases: dto.activeLeases || 0,
    occupiedUnits: dto.occupiedUnits || 0,
    totalUnits: dto.totalUnits || 0,
    monthlyRevenue: dto.monthlyRevenue || 0,
    image: undefined, // Images need to be handled separately
  }
}

/**
 * Transform backend PropertyDto to frontend PropertyDetail format
 */
function transformPropertyDetailDto(dto: PropertyDto): PropertyDetail {
  const base = transformPropertyDto(dto)
  
  return {
    ...base,
    units: dto.units?.map(unit => ({
      id: unit.id?.toString() || '',
      name: unit.number,
      type: unit.type || 'Full',
      bedrooms: unit.bedrooms || 0,
      bathrooms: unit.bathrooms || 0,
      squareFeet: unit.area || 0,
      rent: unit.monthlyRent || 0,
      status: unit.status || 'Vacante',
      tenant: undefined,
    })),
    // Other fields would need to come from additional endpoints
    yearBuilt: undefined,
    squareFeet: undefined,
    bedrooms: undefined,
    bathrooms: undefined,
    parkingSpaces: undefined,
    purchasePrice: undefined,
    currentValue: undefined,
    averageRent: undefined,
    images: [],
    description: undefined,
    owner: undefined,
    amenities: [],
    leases: [],
    payments: [],
    financials: undefined,
    maintenance: [],
    documents: [],
  }
}

export const propertyService = {
  /**
   * Get all properties
   */
  async getAllProperties(): Promise<Property[]> {
    const data = await apiClient.get<PropertyDto[]>('/api/properties')
    return data.map(transformPropertyDto)
  },

  /**
   * Get property by ID
   */
  async getPropertyById(id: number | string): Promise<PropertyDetail> {
    const data = await apiClient.get<PropertyDto>(`/api/properties/${id}`)
    return transformPropertyDetailDto(data)
  },

  /**
   * Create new property
   */
  async createProperty(request: PropertyCreateRequest): Promise<PropertyDto> {
    return await apiClient.post<PropertyDto>('/api/properties', request)
  },

  /**
   * Update property
   */
  async updateProperty(id: number | string, data: PropertyDto): Promise<PropertyDto> {
    return await apiClient.put<PropertyDto>(`/api/properties/${id}`, data)
  },

  /**
   * Delete property
   */
  async deleteProperty(id: number | string): Promise<void> {
    await apiClient.delete(`/api/properties/${id}`)
  },

  /**
   * Add unit to property
   */
  async addUnit(propertyId: number | string, unit: UnitDto): Promise<UnitDto> {
    return await apiClient.post<UnitDto>(
      `/api/properties/${propertyId}/units`,
      unit
    )
  },
}
