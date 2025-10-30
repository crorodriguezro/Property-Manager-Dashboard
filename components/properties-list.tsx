"use client"

import { useState } from "react"
import { Search, SlidersHorizontal, Building2, Home, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  monthlyRevenue: number
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
    monthlyRevenue: 3500,
    image: "/placeholder.jpg",
  },
  {
    id: "2",
    name: "Edificio Central",
    address: "Miami Beach, FL 33340",
    type: "Multifamiliar",
    activeLeases: 3,
    occupiedUnits: 2,
    totalUnits: 8,
    monthlyRevenue: 7500,
    image: "/placeholder.jpg",
  },
  {
    id: "3",
    name: "Casa del Mar",
    address: "Miami Beach, FL 33340",
    type: "Unifamiliar",
    activeLeases: 3,
    occupiedUnits: 10,
    totalUnits: 12,
    monthlyRevenue: 5200,
    image: "/placeholder.jpg",
  },
  {
    id: "4",
    name: "Residencial Palmas",
    address: "Miami Beach, FL 33340",
    type: "Comercial",
    activeLeases: 3,
    occupiedUnits: 1,
    totalUnits: 1,
    monthlyRevenue: 2800,
    image: "/placeholder.jpg",
  },
  {
    id: "5",
    name: "Torre Azul",
    address: "Miami Beach, FL 33340",
    type: "Multifamiliar",
    activeLeases: 3,
    occupiedUnits: 8,
    totalUnits: 34,
    monthlyRevenue: 15400,
  },
  {
    id: "6",
    name: "Complejo Jardines",
    address: "Miami Beach, FL 33340",
    type: "Multifamiliar",
    activeLeases: 3,
    occupiedUnits: 28,
    totalUnits: 30,
    monthlyRevenue: 12500,
  },
  {
    id: "7",
    name: "Vista Hermosa",
    address: "Miami Beach, FL 33340",
    type: "Unifamiliar",
    activeLeases: 3,
    occupiedUnits: 2,
    totalUnits: 1,
    monthlyRevenue: 3500,
    image: "/placeholder.jpg",
  },
]

export default function PropertiesList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("name")
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)

  let filteredProperties = mockProperties.filter((property) => {
    const matchesSearch = property.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || property.type === filterType
    return matchesSearch && matchesType
  })

  // Sort properties
  if (sortBy === "name") {
    filteredProperties.sort((propA, propB) => propA.name.localeCompare(propB.name))
  } else if (sortBy === "revenue") {
    filteredProperties.sort((propA, propB) => propB.monthlyRevenue - propA.monthlyRevenue)
  } else if (sortBy === "occupancy") {
    filteredProperties.sort((propA, propB) => {
      const occupancyA = (propA.occupiedUnits / propA.totalUnits) * 100
      const occupancyB = (propB.occupiedUnits / propB.totalUnits) * 100
      return occupancyB - occupancyA
    })
  }

  // Pagination
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProperties = filteredProperties.slice(startIndex, startIndex + itemsPerPage)

  const propertyTypes = ["Unifamiliar", "Multifamiliar", "Comercial"]

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

      <div className="flex items-center gap-3 flex-wrap">
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
         
         <Select value={filterType} onValueChange={setFilterType}>
           <SelectTrigger className="w-40 bg-white dark:bg-[#1F1F23]">
             <SelectValue placeholder="Filtrar por tipo" />
           </SelectTrigger>
           <SelectContent>
             <SelectItem value="all">Todos los tipos</SelectItem>
             {propertyTypes.map((type) => (
               <SelectItem key={type} value={type}>{type}</SelectItem>
             ))}
           </SelectContent>
         </Select>

         <Select value={sortBy} onValueChange={setSortBy}>
           <SelectTrigger className="w-40 bg-white dark:bg-[#1F1F23]">
             <SelectValue placeholder="Ordenar por" />
           </SelectTrigger>
           <SelectContent>
             <SelectItem value="name">Nombre</SelectItem>
             <SelectItem value="revenue">Ingresos</SelectItem>
             <SelectItem value="occupancy">Ocupación</SelectItem>
           </SelectContent>
         </Select>
       </div>

       <Card className="overflow-hidden">
         <div className="overflow-x-auto">
           <table className="w-full">
             <thead className="border-b border-gray-200 dark:border-[#1F1F23]">
             <tr>
               <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Inmueble</th>
               <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Tipo</th>
               <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Unidades</th>
               <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Ingresos Mensuales</th>
             </tr>
             </thead>
             <tbody className="divide-y divide-gray-200 dark:divide-[#1F1F23]">
             {paginatedProperties.map((property) => (
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
                     <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                       <Home className="h-4 w-4 text-gray-400"/>
                       {property.occupiedUnits}/{property.totalUnits}
                     </div>
                     <div className="text-xs text-gray-500 dark:text-gray-400">
                       {Math.round((property.occupiedUnits / property.totalUnits) * 100)}% ocupado
                     </div>
                   </div>
                 </td>
                 <td className="py-4 px-4">
                   <span className="font-medium text-green-600 dark:text-green-400">
                     ${property.monthlyRevenue.toLocaleString()}
                   </span>
                 </td>
               </tr>
             ))}
             </tbody>
           </table>
         </div>
       </Card>

       {/* Pagination */}
       <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
           <span className="text-sm text-gray-600 dark:text-gray-400">
             Mostrar
           </span>
           <Select value={itemsPerPage.toString()} onValueChange={(val) => setItemsPerPage(parseInt(val))}>
             <SelectTrigger className="w-20 bg-white dark:bg-[#1F1F23]">
               <SelectValue />
             </SelectTrigger>
             <SelectContent>
               <SelectItem value="5">5</SelectItem>
               <SelectItem value="10">10</SelectItem>
               <SelectItem value="25">25</SelectItem>
             </SelectContent>
           </Select>
           <span className="text-sm text-gray-600 dark:text-gray-400">
             de {filteredProperties.length} inmuebles
           </span>
         </div>

         <div className="flex items-center gap-2">
           <Button
             variant="outline"
             size="icon"
             onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
             disabled={currentPage === 1}
           >
             <ChevronLeft className="h-4 w-4" />
           </Button>
           <span className="text-sm font-medium text-gray-900 dark:text-white">
             Página {currentPage} de {totalPages || 1}
           </span>
           <Button
             variant="outline"
             size="icon"
             onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
             disabled={currentPage === totalPages}
           >
             <ChevronRight className="h-4 w-4" />
           </Button>
         </div>
       </div>
    </div>
  )
}
