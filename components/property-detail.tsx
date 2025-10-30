"use client"

import { useState } from "react"
import { ArrowLeft, MapPin, FileText, ChevronDown, Download, MoreVertical, Users, DollarSign, TrendingUp, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"
import Link from "next/link"

interface PropertyDetailProps {
  propertyId: string
}

// Mock data - in a real app, this would come from an API
const mockPropertyData = {
  "1": {
    name: "Villa Sunset",
    address: "123 Ocean Drive, Miami Beach, FL 33340",
    type: "Unifamiliar",
    yearBuilt: 2018,
    squareFeet: 2500,
    bedrooms: 4,
    bathrooms: 3,
    parkingSpaces: 2,
    totalUnits: 1,
    occupiedUnits: 1,
    purchasePrice: 450000,
    currentValue: 520000,
    monthlyRevenue: 3500,
    averageRent: 3500,
    image: "/modern-villa-sunset.jpg",
    images: ["/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg"],
    description: "Hermosa villa con vista al mar, completamente renovada con acabados de lujo.",
    owner: {
      name: "María García",
      contact: "maria@example.com",
      ownership: 100,
    },
    amenities: ["Piscina", "Gym", "Lavandería", "Ascensor", "Sistema de seguridad", "Amigable con mascotas"],
    units: [
      {
        id: "1",
        name: "Unidad Principal",
        type: "Full",
        bedrooms: 4,
        bathrooms: 3,
        squareFeet: 2500,
        rent: 3500,
        status: "Ocupada",
        tenant: "Juan Pérez",
      },
    ],
    leases: [
      {
        id: "1",
        tenant: "Juan Pérez",
        unit: "Unidad Principal",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        rent: 3500,
        status: "Activo",
      },
    ],
    payments: [
      { id: "1", date: "2024-10-01", amount: 3500, tenant: "Juan Pérez", status: "Pagado", type: "Renta" },
      { id: "2", date: "2024-09-01", amount: 3500, tenant: "Juan Pérez", status: "Pagado", type: "Renta" },
      { id: "3", date: "2024-08-01", amount: 3500, tenant: "Juan Pérez", status: "Pagado", type: "Renta" },
    ],
    financials: {
      totalIncome: 10500,
      totalExpenses: 2100,
      netIncome: 8400,
      yearToDateRevenue: 35000,
    },
    maintenance: [
      { id: "1", date: "2024-01-15", description: "Reparación de plomería", status: "Completado", cost: 250 },
      { id: "2", date: "2024-02-20", description: "Mantenimiento de jardín", status: "Pendiente", cost: 150 },
      { id: "3", date: "2024-03-10", description: "Servicio HVAC", status: "Completado", cost: 300 },
    ],
    documents: [
      { id: "1", name: "Título de propiedad", category: "Legal", uploadDate: "2024-01-01", size: "2.5 MB" },
      { id: "2", name: "Acta de constitución", category: "Legal", uploadDate: "2024-01-02", size: "1.2 MB" },
    ],
  },
  // Add more mock properties as needed
}

export default function PropertyDetail({ propertyId }: PropertyDetailProps) {
  const [activeTab, setActiveTab] = useState("details")

  // Get property data or use default
  const property = mockPropertyData[propertyId as keyof typeof mockPropertyData] || mockPropertyData["1"]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/inmuebles">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{property.name}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
              <MapPin className="h-4 w-4" />
              {property.address}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Editar</Button>
          <Button>
            <ChevronDown className="h-4 w-4 mr-2" />
            Acciones
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger
            value="details"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Detalles
          </TabsTrigger>
          <TabsTrigger
            value="units"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Unidades
          </TabsTrigger>
          <TabsTrigger
            value="leases"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Contratos
          </TabsTrigger>
          <TabsTrigger
            value="payments"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Pagos
          </TabsTrigger>
          <TabsTrigger
            value="maintenance"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Mantenimiento
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Documentos
          </TabsTrigger>
        </TabsList>

         {/* Details Tab */}
         <TabsContent value="details" className="mt-6 space-y-6">
           {/* Quick Stats */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <Card className="p-6">
               <div className="flex items-center gap-3 mb-2">
                 <Users className="h-5 w-5 text-blue-600" />
                 <span className="text-sm text-gray-500 dark:text-gray-400">Ocupación</span>
               </div>
               <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                 {Math.round((property.occupiedUnits / property.totalUnits) * 100)}%
               </div>
               <Progress value={(property.occupiedUnits / property.totalUnits) * 100} className="mt-2" />
             </Card>

             <Card className="p-6">
               <div className="flex items-center gap-3 mb-2">
                 <DollarSign className="h-5 w-5 text-green-600" />
                 <span className="text-sm text-gray-500 dark:text-gray-400">Ingresos Mensuales</span>
               </div>
               <div className="text-2xl font-semibold text-green-600 dark:text-green-400">
                 ${property.monthlyRevenue.toLocaleString()}
               </div>
             </Card>

             <Card className="p-6">
               <div className="flex items-center gap-3 mb-2">
                 <TrendingUp className="h-5 w-5 text-purple-600" />
                 <span className="text-sm text-gray-500 dark:text-gray-400">Renta Promedio</span>
               </div>
               <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                 ${property.averageRent.toLocaleString()}
               </div>
             </Card>

             <Card className="p-6">
               <div className="flex items-center gap-3 mb-2">
                 <Calendar className="h-5 w-5 text-orange-600" />
                 <span className="text-sm text-gray-500 dark:text-gray-400">Unidades</span>
               </div>
               <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                 {property.occupiedUnits}/{property.totalUnits}
               </div>
             </Card>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             {/* Property Image Gallery */}
             <Card className="lg:col-span-2 overflow-hidden">
               <div className="aspect-video relative bg-gray-100 dark:bg-[#2F2F33]">
                 <Image src={property.image || "/placeholder.svg"} alt={property.name} fill className="object-cover" />
               </div>
               
               {/* Thumbnail Carousel */}
               <div className="p-4 border-t border-gray-200 dark:border-[#2F2F33]">
                 <div className="flex gap-2 overflow-x-auto">
                   {property.images?.map((img, idx) => (
                     <div key={idx} className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200 dark:bg-[#2F2F33] cursor-pointer">
                       <Image src={img} alt={`Thumbnail ${idx}`} width={64} height={64} className="w-full h-full object-cover" />
                     </div>
                   ))}
                 </div>
               </div>

               <div className="p-6">
                 <h3 className="text-lg font-semibold mb-4">Descripción</h3>
                 <p className="text-gray-600 dark:text-gray-400 mb-4">{property.description}</p>
                 
                 <h3 className="text-lg font-semibold mb-3">Amenidades</h3>
                 <div className="flex flex-wrap gap-2">
                   {property.amenities?.map((amenity, idx) => (
                     <Badge key={idx} variant="secondary" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-0">
                       {amenity}
                     </Badge>
                   ))}
                 </div>
               </div>
             </Card>

             {/* Property Info */}
             <div className="space-y-4">
               <Card className="p-6">
                 <h3 className="text-lg font-semibold mb-4">Información General</h3>
                 <div className="space-y-3">
                   <div className="flex justify-between">
                     <span className="text-gray-500 dark:text-gray-400">Tipo</span>
                     <span className="font-medium">{property.type}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-500 dark:text-gray-400">Año de construcción</span>
                     <span className="font-medium">{property.yearBuilt}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-500 dark:text-gray-400">Área</span>
                     <span className="font-medium">{property.squareFeet} ft²</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-500 dark:text-gray-400">Habitaciones</span>
                     <span className="font-medium">{property.bedrooms}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-500 dark:text-gray-400">Baños</span>
                     <span className="font-medium">{property.bathrooms}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-500 dark:text-gray-400">Estacionamientos</span>
                     <span className="font-medium">{property.parkingSpaces}</span>
                   </div>
                 </div>
               </Card>

               <Card className="p-6">
                 <h3 className="text-lg font-semibold mb-4">Información Financiera</h3>
                 <div className="space-y-3">
                   <div className="flex justify-between">
                     <span className="text-gray-500 dark:text-gray-400">Precio de compra</span>
                     <span className="font-medium">${property.purchasePrice.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-500 dark:text-gray-400">Valor actual</span>
                     <span className="font-medium text-green-600 dark:text-green-400">${property.currentValue.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-500 dark:text-gray-400">Ganancia</span>
                     <span className="font-medium text-green-600 dark:text-green-400">
                       ${(property.currentValue - property.purchasePrice).toLocaleString()} 
                       <span className="text-xs text-gray-500 ml-1">({Math.round(((property.currentValue - property.purchasePrice) / property.purchasePrice) * 100)}%)</span>
                     </span>
                   </div>
                 </div>
               </Card>

               <Card className="p-6">
                 <h3 className="text-lg font-semibold mb-4">Propietario</h3>
                 <div className="space-y-3">
                   <div className="flex justify-between">
                     <span className="text-gray-500 dark:text-gray-400">Nombre</span>
                     <span className="font-medium">{property.owner?.name}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-500 dark:text-gray-400">Contacto</span>
                     <span className="font-medium text-blue-600 dark:text-blue-400">{property.owner?.contact}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-500 dark:text-gray-400">Propiedad</span>
                     <span className="font-medium">{property.owner?.ownership}%</span>
                   </div>
                 </div>
               </Card>
             </div>
           </div>
         </TabsContent>

         {/* Units Tab */}
         <TabsContent value="units" className="mt-6 space-y-6">
           <Card>
             <div className="p-6">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-lg font-semibold">Lista de Unidades</h3>
                 <Button>Agregar Unidad</Button>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full">
                   <thead className="border-b border-gray-200 dark:border-[#1F1F23]">
                     <tr>
                       <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                         Unidad
                       </th>
                       <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                         Tipo
                       </th>
                       <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                         Área
                       </th>
                       <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                         Renta
                       </th>
                       <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                         Estado
                       </th>
                       <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                         Inquilino
                       </th>
                       <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                         Acciones
                       </th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-200 dark:divide-[#1F1F23]">
                     {property.units.map((unit) => (
                       <tr key={unit.id} className="hover:bg-gray-50 dark:hover:bg-[#1F1F23]">
                         <td className="py-4 px-4 font-medium">{unit.name}</td>
                         <td className="py-4 px-4 text-sm">{unit.type}</td>
                         <td className="py-4 px-4 text-sm">{unit.squareFeet} ft²</td>
                         <td className="py-4 px-4 font-medium">${unit.rent.toLocaleString()}</td>
                         <td className="py-4 px-4">
                           <Badge variant={unit.status === "Ocupada" ? "default" : "secondary"}>{unit.status}</Badge>
                         </td>
                         <td className="py-4 px-4 text-sm">{unit.tenant || "-"}</td>
                         <td className="py-4 px-4">
                           <DropdownMenu>
                             <DropdownMenuTrigger asChild>
                               <Button variant="ghost" size="icon">
                                 <MoreVertical className="h-4 w-4" />
                               </Button>
                             </DropdownMenuTrigger>
                             <DropdownMenuContent align="end">
                               <DropdownMenuItem>Editar</DropdownMenuItem>
                               <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                               <DropdownMenuItem>Eliminar</DropdownMenuItem>
                             </DropdownMenuContent>
                           </DropdownMenu>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </div>
           </Card>

           {/* Unit Summary Footer */}
           <Card className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
             <div className="grid grid-cols-3 gap-4">
               <div>
                 <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Unidades Totales</p>
                 <p className="text-2xl font-semibold text-gray-900 dark:text-white">{property.totalUnits}</p>
               </div>
               <div>
                 <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Unidades Ocupadas</p>
                 <p className="text-2xl font-semibold text-green-600 dark:text-green-400">{property.occupiedUnits}</p>
               </div>
               <div>
                 <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Unidades Vacantes</p>
                 <p className="text-2xl font-semibold text-orange-600 dark:text-orange-400">{property.totalUnits - property.occupiedUnits}</p>
               </div>
             </div>
           </Card>
         </TabsContent>

         {/* Leases (Tenants) Tab */}
         <TabsContent value="leases" className="mt-6 space-y-6">
           {/* Active Tenants */}
           <div>
             <h3 className="text-lg font-semibold mb-4">Inquilinos Activos</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {property.leases.map((lease) => (
                 <Card key={lease.id} className="p-6 hover:shadow-md transition-shadow">
                   <div className="flex items-start justify-between mb-4">
                     <div className="flex items-center gap-3">
                       <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                         <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                       </div>
                       <div>
                         <h4 className="font-semibold text-gray-900 dark:text-white">{lease.tenant}</h4>
                         <p className="text-sm text-gray-500 dark:text-gray-400">{lease.unit}</p>
                       </div>
                     </div>
                     <DropdownMenu>
                       <DropdownMenuTrigger asChild>
                         <Button variant="ghost" size="icon">
                           <MoreVertical className="h-4 w-4" />
                         </Button>
                       </DropdownMenuTrigger>
                       <DropdownMenuContent align="end">
                         <DropdownMenuItem>Ver inquilino</DropdownMenuItem>
                         <DropdownMenuItem>Editar contrato</DropdownMenuItem>
                         <DropdownMenuItem>Enviar mensaje</DropdownMenuItem>
                       </DropdownMenuContent>
                     </DropdownMenu>
                   </div>

                   <div className="space-y-2 mb-4">
                     <div className="flex justify-between text-sm">
                       <span className="text-gray-600 dark:text-gray-400">Inicio del contrato</span>
                       <span className="font-medium">{lease.startDate}</span>
                     </div>
                     <div className="flex justify-between text-sm">
                       <span className="text-gray-600 dark:text-gray-400">Fin del contrato</span>
                       <span className="font-medium">{lease.endDate}</span>
                     </div>
                     <div className="flex justify-between text-sm">
                       <span className="text-gray-600 dark:text-gray-400">Renta mensual</span>
                       <span className="font-medium text-green-600 dark:text-green-400">${lease.rent.toLocaleString()}</span>
                     </div>
                   </div>

                   <Badge className="w-full justify-center bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-0">
                     {lease.status}
                   </Badge>
                 </Card>
               ))}
             </div>
           </div>

           {/* Vacant Units */}
           {property.totalUnits - property.occupiedUnits > 0 && (
             <div className="border-t pt-6">
               <h3 className="text-lg font-semibold mb-4">Unidades Vacantes</h3>
               <Card className="p-6 bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800">
                 <div className="flex items-center justify-between">
                   <div>
                     <p className="font-semibold text-gray-900 dark:text-white">
                       {property.totalUnits - property.occupiedUnits} unidad(es) disponible(s)
                     </p>
                     <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                       Publica estas unidades para encontrar nuevos inquilinos
                     </p>
                   </div>
                   <Button>Publicar Listado</Button>
                 </div>
               </Card>
             </div>
           )}
         </TabsContent>

         {/* Payments Tab */}
         <TabsContent value="payments" className="mt-6 space-y-6">
           {/* Financial Summary */}
           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             <Card className="p-6">
               <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Ingresos Totales</p>
               <p className="text-2xl font-semibold text-green-600 dark:text-green-400">
                 ${property.financials?.totalIncome.toLocaleString()}
               </p>
             </Card>
             <Card className="p-6">
               <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Gastos Totales</p>
               <p className="text-2xl font-semibold text-red-600 dark:text-red-400">
                 ${property.financials?.totalExpenses.toLocaleString()}
               </p>
             </Card>
             <Card className="p-6">
               <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Ingresos Netos</p>
               <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                 ${property.financials?.netIncome.toLocaleString()}
               </p>
             </Card>
             <Card className="p-6">
               <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Año Hasta Ahora</p>
               <p className="text-2xl font-semibold text-purple-600 dark:text-purple-400">
                 ${property.financials?.yearToDateRevenue.toLocaleString()}
               </p>
             </Card>
           </div>

           {/* Payments Table */}
           <Card>
             <div className="p-6">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-lg font-semibold">Historial de Pagos Recientes</h3>
                 <Button>Registrar Pago</Button>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full">
                   <thead className="border-b border-gray-200 dark:border-[#1F1F23]">
                     <tr>
                       <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                         Fecha
                       </th>
                       <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                         Inquilino
                       </th>
                       <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Tipo</th>
                       <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                         Monto
                       </th>
                       <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                         Estado
                       </th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-200 dark:divide-[#1F1F23]">
                     {property.payments.map((payment) => (
                       <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-[#1F1F23]">
                         <td className="py-4 px-4 text-sm">{payment.date}</td>
                         <td className="py-4 px-4 text-sm font-medium">{payment.tenant}</td>
                         <td className="py-4 px-4 text-sm">{payment.type}</td>
                         <td className="py-4 px-4 font-medium text-green-600 dark:text-green-400">
                           ${payment.amount.toLocaleString()}
                         </td>
                         <td className="py-4 px-4">
                           <Badge variant={payment.status === "Pagado" ? "default" : "secondary"}>
                             {payment.status}
                           </Badge>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </div>
           </Card>

           {/* Export Reports */}
           <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10 border-purple-200 dark:border-purple-800">
             <div className="flex items-center justify-between">
               <div>
                 <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Exportar Reportes</h3>
                 <p className="text-sm text-gray-600 dark:text-gray-400">Descarga reportes financieros en diferentes formatos</p>
               </div>
               <div className="flex gap-2">
                 <Button variant="outline" size="sm">
                   <Download className="h-4 w-4 mr-2" />
                   PDF
                 </Button>
                 <Button variant="outline" size="sm">
                   <Download className="h-4 w-4 mr-2" />
                   Excel
                 </Button>
               </div>
             </div>
           </Card>
         </TabsContent>

         {/* Maintenance Tab */}
         <TabsContent value="maintenance" className="mt-6 space-y-6">
           <Card>
             <div className="p-6">
               <div className="flex items-center justify-between mb-6">
                 <h3 className="text-lg font-semibold">Solicitudes de Mantenimiento</h3>
                 <Button>Nueva Solicitud</Button>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full">
                   <thead className="border-b border-gray-200 dark:border-[#1F1F23]">
                     <tr>
                       <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                         Fecha
                       </th>
                       <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                         Descripción
                       </th>
                       <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                         Estado
                       </th>
                       <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                         Costo
                       </th>
                       <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                         Acciones
                       </th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-200 dark:divide-[#1F1F23]">
                     {property.maintenance.map((item) => (
                       <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-[#1F1F23]">
                         <td className="py-4 px-4 text-sm">{item.date}</td>
                         <td className="py-4 px-4 text-sm font-medium">{item.description}</td>
                         <td className="py-4 px-4">
                           <Badge variant={item.status === "Completado" ? "default" : "secondary"}>{item.status}</Badge>
                         </td>
                         <td className="py-4 px-4 text-sm font-medium">${item.cost.toLocaleString()}</td>
                         <td className="py-4 px-4">
                           <DropdownMenu>
                             <DropdownMenuTrigger asChild>
                               <Button variant="ghost" size="icon">
                                 <MoreVertical className="h-4 w-4" />
                               </Button>
                             </DropdownMenuTrigger>
                             <DropdownMenuContent align="end">
                               <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                               <DropdownMenuItem>Editar</DropdownMenuItem>
                               <DropdownMenuItem>Marcar como completado</DropdownMenuItem>
                             </DropdownMenuContent>
                           </DropdownMenu>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </div>
           </Card>

           {/* Maintenance Summary */}
           <Card className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 border-blue-200 dark:border-blue-800">
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
               <div>
                 <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Solicitudes Totales</p>
                 <p className="text-2xl font-semibold">{property.maintenance.length}</p>
               </div>
               <div>
                 <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Completadas</p>
                 <p className="text-2xl font-semibold text-green-600 dark:text-green-400">
                   {property.maintenance.filter(m => m.status === "Completado").length}
                 </p>
               </div>
               <div>
                 <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Gasto Total</p>
                 <p className="text-2xl font-semibold text-red-600 dark:text-red-400">
                   ${property.maintenance.reduce((sum, m) => sum + m.cost, 0).toLocaleString()}
                 </p>
               </div>
             </div>
           </Card>
         </TabsContent>

         {/* Documents Tab */}
         <TabsContent value="documents" className="mt-6 space-y-6">
           {/* Upload Area */}
           <Card className="p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-600 transition-colors cursor-pointer">
             <div className="text-center">
               <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400 opacity-50" />
               <h3 className="text-lg font-semibold mb-2">Arrastra archivos aquí</h3>
               <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">o</p>
               <Button>Seleccionar Archivos</Button>
               <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                 Tipos permitidos: PDF, DOC, DOCX, XLS, XLSX (Máx 10MB)
               </p>
             </div>
           </Card>

           {/* Documents Table */}
           {property.documents && property.documents.length > 0 ? (
             <Card>
               <div className="p-6">
                 <h3 className="text-lg font-semibold mb-4">Documentos Subidos</h3>
                 <div className="overflow-x-auto">
                   <table className="w-full">
                     <thead className="border-b border-gray-200 dark:border-[#1F1F23]">
                       <tr>
                         <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                           Nombre
                         </th>
                         <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                           Categoría
                         </th>
                         <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                           Fecha de Subida
                         </th>
                         <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                           Tamaño
                         </th>
                         <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                           Acciones
                         </th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-200 dark:divide-[#1F1F23]">
                       {property.documents.map((doc) => (
                         <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-[#1F1F23]">
                           <td className="py-4 px-4">
                             <div className="flex items-center gap-2">
                               <FileText className="h-4 w-4 text-gray-400" />
                               <span className="font-medium text-sm">{doc.name}</span>
                             </div>
                           </td>
                           <td className="py-4 px-4">
                             <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border-0">
                               {doc.category}
                             </Badge>
                           </td>
                           <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">{doc.uploadDate}</td>
                           <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">{doc.size}</td>
                           <td className="py-4 px-4">
                             <DropdownMenu>
                               <DropdownMenuTrigger asChild>
                                 <Button variant="ghost" size="icon">
                                   <MoreVertical className="h-4 w-4" />
                                 </Button>
                               </DropdownMenuTrigger>
                               <DropdownMenuContent align="end">
                                 <DropdownMenuItem>
                                   <Download className="h-4 w-4 mr-2" />
                                   Descargar
                                 </DropdownMenuItem>
                                 <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                                 <DropdownMenuItem>Eliminar</DropdownMenuItem>
                               </DropdownMenuContent>
                             </DropdownMenu>
                           </td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
               </div>
             </Card>
           ) : (
             <Card>
               <div className="p-12 text-center">
                 <FileText className="h-12 w-12 mx-auto mb-4 opacity-50 text-gray-400" />
                 <p className="text-gray-500 dark:text-gray-400">No hay documentos disponibles</p>
                 <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Comienza subiendo documentos relacionados con esta propiedad</p>
               </div>
             </Card>
           )}
         </TabsContent>
      </Tabs>
    </div>
  )
}
