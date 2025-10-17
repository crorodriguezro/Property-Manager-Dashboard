"use client"

import { useState } from "react"
import { ArrowLeft, MapPin, FileText, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
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
    purchasePrice: 450000,
    currentValue: 520000,
    image: "/modern-villa-sunset.jpg",
    description: "Hermosa villa con vista al mar, completamente renovada con acabados de lujo.",
    units: [
      {
        id: "1",
        name: "Unidad Principal",
        bedrooms: 4,
        bathrooms: 3,
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
      { id: "1", date: "2024-01-01", amount: 3500, tenant: "Juan Pérez", status: "Pagado", type: "Renta" },
      { id: "2", date: "2024-02-01", amount: 3500, tenant: "Juan Pérez", status: "Pagado", type: "Renta" },
    ],
    maintenance: [
      { id: "1", date: "2024-01-15", description: "Reparación de plomería", status: "Completado", cost: 250 },
      { id: "2", date: "2024-02-20", description: "Mantenimiento de jardín", status: "Pendiente", cost: 150 },
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Property Image */}
            <Card className="lg:col-span-2 overflow-hidden">
              <div className="aspect-video relative bg-gray-100 dark:bg-[#2F2F33]">
                <Image src={property.image || "/placeholder.svg"} alt={property.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Descripción</h3>
                <p className="text-gray-600 dark:text-gray-400">{property.description}</p>
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
                    <span className="font-medium text-green-600">${property.currentValue.toLocaleString()}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Units Tab */}
        <TabsContent value="units" className="mt-6">
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
                        Habitaciones
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                        Baños
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
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-[#1F1F23]">
                    {property.units.map((unit) => (
                      <tr key={unit.id} className="hover:bg-gray-50 dark:hover:bg-[#1F1F23]">
                        <td className="py-4 px-4 font-medium">{unit.name}</td>
                        <td className="py-4 px-4">{unit.bedrooms}</td>
                        <td className="py-4 px-4">{unit.bathrooms}</td>
                        <td className="py-4 px-4">${unit.rent.toLocaleString()}</td>
                        <td className="py-4 px-4">
                          <Badge variant={unit.status === "Ocupada" ? "default" : "secondary"}>{unit.status}</Badge>
                        </td>
                        <td className="py-4 px-4">{unit.tenant || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Leases Tab */}
        <TabsContent value="leases" className="mt-6">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Contratos de Arrendamiento</h3>
                <Button>Nuevo Contrato</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-200 dark:border-[#1F1F23]">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                        Inquilino
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                        Unidad
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                        Inicio
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Fin</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                        Renta
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-[#1F1F23]">
                    {property.leases.map((lease) => (
                      <tr key={lease.id} className="hover:bg-gray-50 dark:hover:bg-[#1F1F23]">
                        <td className="py-4 px-4 font-medium">{lease.tenant}</td>
                        <td className="py-4 px-4">{lease.unit}</td>
                        <td className="py-4 px-4">{lease.startDate}</td>
                        <td className="py-4 px-4">{lease.endDate}</td>
                        <td className="py-4 px-4">${lease.rent.toLocaleString()}</td>
                        <td className="py-4 px-4">
                          <Badge variant="default">{lease.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="mt-6">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Historial de Pagos</h3>
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
                        <td className="py-4 px-4">{payment.date}</td>
                        <td className="py-4 px-4">{payment.tenant}</td>
                        <td className="py-4 px-4">{payment.type}</td>
                        <td className="py-4 px-4 font-medium">${payment.amount.toLocaleString()}</td>
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
        </TabsContent>

        {/* Maintenance Tab */}
        <TabsContent value="maintenance" className="mt-6">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
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
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-[#1F1F23]">
                    {property.maintenance.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-[#1F1F23]">
                        <td className="py-4 px-4">{item.date}</td>
                        <td className="py-4 px-4">{item.description}</td>
                        <td className="py-4 px-4">
                          <Badge variant={item.status === "Completado" ? "default" : "secondary"}>{item.status}</Badge>
                        </td>
                        <td className="py-4 px-4">${item.cost.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="mt-6">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Documentos</h3>
                <Button>Subir Documento</Button>
              </div>
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No hay documentos disponibles</p>
                <p className="text-sm mt-2">Sube documentos relacionados con esta propiedad</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
