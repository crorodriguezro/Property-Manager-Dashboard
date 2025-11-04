/**
 * React hooks for property management
 */

import { useState, useEffect } from 'react'
import { propertyService } from '@/services/property-service'
import type { Property, PropertyDetail, PropertyCreateRequest } from '@/lib/types/property'

/**
 * Hook to fetch all properties
 */
export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchProperties = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await propertyService.getAllProperties()
      setProperties(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch properties'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  return {
    properties,
    loading,
    error,
    refetch: fetchProperties,
  }
}

/**
 * Hook to fetch a single property by ID
 */
export function useProperty(id: string | number) {
  const [property, setProperty] = useState<PropertyDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchProperty = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await propertyService.getPropertyById(id)
      setProperty(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch property'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchProperty()
    }
  }, [id])

  return {
    property,
    loading,
    error,
    refetch: fetchProperty,
  }
}

/**
 * Hook for property mutations (create, update, delete)
 */
export function usePropertyMutations() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const createProperty = async (data: PropertyCreateRequest) => {
    try {
      setLoading(true)
      setError(null)
      const result = await propertyService.createProperty(data)
      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to create property')
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateProperty = async (id: number | string, data: any) => {
    try {
      setLoading(true)
      setError(null)
      const result = await propertyService.updateProperty(id, data)
      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update property')
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const deleteProperty = async (id: number | string) => {
    try {
      setLoading(true)
      setError(null)
      await propertyService.deleteProperty(id)
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to delete property')
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const addUnit = async (propertyId: number | string, unit: any) => {
    try {
      setLoading(true)
      setError(null)
      const result = await propertyService.addUnit(propertyId, unit)
      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to add unit')
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    createProperty,
    updateProperty,
    deleteProperty,
    addUnit,
    loading,
    error,
  }
}
