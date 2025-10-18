"use client"

import { useState } from "react"
import { Search, SlidersHorizontal, Building2, User, Calendar, DollarSign, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import Link from "next/link"

interface Lease {
  id: string
  propertyName: string
  tenantName: string
  startDate: string
  endDate: string
  rent: number
  deposit: number
  status: "active" | "expired" | "pending"
}

const mockLeases: Lease[] = [
  {
    id: "1",
    propertyName: "Villa Sunset",
    tenantName: "Juan Pérez",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    rent: 1500,
    deposit: 3000,
    status: "active",
  },
  {
    id: "2",
    propertyName: "Edificio Central",
    tenantName: "María García",
    startDate: "2024-02-15",
    endDate: "2025-02-14",
    rent: 2000,
    deposit: 4000,
    status: "active",
  },
  {
    id: "3",
    propertyName: "Casa del Mar",
    tenantName: "Carlos Rodríguez",
    startDate: "2023-06-01",
    endDate: "2024-05-31",
    rent: 1800,
    deposit: 3600,
    status: "expired",
  },
  {
    id: "4",
    propertyName: "Residencial Palmas",
    tenantName: "Ana Martínez",
    startDate: "2024-03-01",
    endDate: "2025-02-28",
    rent: 1200,
    deposit: 2400,
    status: "active",
  },
  {
    id: "5",
    propertyName: "Torre Azul",
    tenantName: "Luis Hernández",
    startDate: "2024-04-01",
    endDate: "2025-03-31",
    rent: 2500,
    deposit: 5000,
    status: "active",
  },
  {
    id: "6",
    propertyName: "Complejo Jardines",
    tenantName: "Sofia López",
    startDate: "2024-05-15",
    endDate: "2025-05-14",
    rent: 1600,
    deposit: 3200,
    status: "pending",
  },
  {
    id: "7",
    propertyName: "Vista Hermosa",
    tenantName: "Diego Sánchez",
    startDate: "2024-01-15",
    endDate: "2024-12-14",
    rent: 1900,
    deposit: 3800,
    status: "active",
  },
]

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("es-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("es-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return (
        <Badge
          variant="secondary"
          className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-0"
        >
          Activo
        </Badge>
      )
    case "expired":
      return (
        <Badge
          variant="secondary"
          className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border-0"
        >
          Vencido
        </Badge>
      )
    case "pending":
      return (
        <Badge
          variant="secondary"
          className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400 border-0"
        >
          Pendiente
        </Badge>
      )
    default:
      return null
  }
}

export default function LeasesList() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredLeases = mockLeases.filter(
    (lease) =>
      lease.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lease.tenantName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Contratos</h1>
        <Link
          href="/contratos/nuevo"
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Crear Contrato
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar por inmueble o inquilino"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white dark:bg-[#1F1F23] border-gray-200 dark:border-[#2F2F33]"
          />
        </div>
        <Button variant="outline" size="icon" className="flex-shrink-0 bg-transparent">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 dark:border-[#1F1F23]">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Inmueble / Inquilino
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Fecha Inicio
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Fecha Fin
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Renta
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Depósito
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-[#1F1F23]">
              {filteredLeases.map((lease) => (
                <tr
                  key={lease.id}
                  className="hover:bg-gray-50 dark:hover:bg-[#1F1F23] transition-colors cursor-pointer"
                >
                  <td className="py-4 px-4">
                    <Link href={`/contratos/${lease.id}`} className="block">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-[#2F2F33] flex items-center justify-center flex-shrink-0">
                          <Building2 className="h-5 w-5 text-gray-400" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {lease.propertyName}
                          </div>
                          <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                            <User className="h-3.5 w-3.5" />
                            {lease.tenantName}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      {formatDate(lease.startDate)}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      {formatDate(lease.endDate)}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      {formatCurrency(lease.rent)}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {formatCurrency(lease.deposit)}
                    </div>
                  </td>
                  <td className="py-4 px-4">{getStatusBadge(lease.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
