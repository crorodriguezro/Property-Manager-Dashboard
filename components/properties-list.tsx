"use client"

import { useState } from "react"
import { Search, SlidersHorizontal, Building2, Home, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface Property {
  id: string
  name: string
  address: string
  type: string
  activeLeases: number
  occupiedUnits: number
  totalUnits: number
  image?: string
}

const mockProperties: Property[] = [
  {
    id: "1",
    name: "Villa Sunset",
    address: "Miami Beach, FL 33340",
    type: "Unifamiliar",
    activeLeases: 3,
    occupiedUnits: 2,
    totalUnits: 1,
    image: "/placeholder.jpg",
  },
  {
    id: "2",
    name: "Edificio Central",
    address: "Miami Beach, FL 33340",
    type: "Unifamiliar",
    activeLeases: 3,
    occupiedUnits: 2,
    totalUnits: 1,
    image: "/placeholder.jpg",
  },
  {
    id: "3",
    name: "Casa del Mar",
    address: "Miami Beach, FL 33340",
    type: "Unifamiliar",
    activeLeases: 3,
    occupiedUnits: 10,
    totalUnits: 1,
    image: "/placeholder.jpg",
  },
  {
    id: "4",
    name: "Residencial Palmas",
    address: "Miami Beach, FL 33340",
    type: "Unifamiliar",
    activeLeases: 3,
    occupiedUnits: 1,
    totalUnits: 1,
    image: "/placeholder.jpg",
  },
  {
    id: "5",
    name: "Torre Azul",
    address: "Miami Beach, FL 33340",
    type: "Unifamiliar",
    activeLeases: 3,
    occupiedUnits: 8,
    totalUnits: 34,
  },
  {
    id: "6",
    name: "Complejo Jardines",
    address: "Miami Beach, FL 33340",
    type: "Unifamiliar",
    activeLeases: 3,
    occupiedUnits: 28,
    totalUnits: 1,
  },
  {
    id: "7",
    name: "Vista Hermosa",
    address: "Miami Beach, FL 33340",
    type: "Unifamiliar",
    activeLeases: 3,
    occupiedUnits: 2,
    totalUnits: 1,
    image: "/placeholder.jpg",
  },
]

export default function PropertiesList() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProperties = mockProperties.filter((property) =>
    property.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Inmuebles</h1>
        <Link
          href="/inmuebles/nuevo"
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4"/>
          Agregar Inmueble
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"/>
          <Input
            type="text"
            placeholder="Buscar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white dark:bg-[#1F1F23] border-gray-200 dark:border-[#2F2F33]"
          />
        </div>
        <Button variant="outline" size="icon" className="flex-shrink-0 bg-transparent">
          <SlidersHorizontal className="h-4 w-4"/>
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 dark:border-[#1F1F23]">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Inmueble</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Tipo</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Unidades</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-[#1F1F23]">
            {filteredProperties.map((property) => (
              <tr
                key={property.id}
                className="hover:bg-gray-50 dark:hover:bg-[#1F1F23] transition-colors cursor-pointer"
              >
                <td className="py-4 px-4">
                  <Link href={`/inmuebles/${property.id}`} className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-[#2F2F33] flex items-center justify-center flex-shrink-0">
                      {property.image ? (
                        <Image
                          src={property.image || "/placeholder.svg"}
                          alt={property.name}
                          width={48}
                          height={48}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <Building2 className="h-6 w-6 text-gray-400"/>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{property.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{property.address}</div>
                    </div>
                  </Link>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Home className="h-4 w-4 text-gray-400"/>
                    {property.type}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-0"
                      >
                        {property.activeLeases} Activos
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Home className="h-4 w-4 text-gray-400"/>
                      {property.occupiedUnits} Ocupados
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Building2 className="h-4 w-4 text-gray-400"/>
                      {property.totalUnits} {property.totalUnits === 1 ? "Unidad" : "Unidades"}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
