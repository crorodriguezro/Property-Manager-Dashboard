"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Plus, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Wizard, WizardStepContent } from "@/components/ui/wizard"

const mockProperties = [
  { id: "1", name: "Villa Moderna Miami Beach", address: "Miami Beach, FL 33340" },
  { id: "2", name: "Apartamento Centro", address: "Miami Beach, FL 33340" },
  { id: "3", name: "Casa Familiar Coral Gables", address: "Coral Gables, FL 33134" },
]

const mockUnits = {
  "1": [
    { id: "1-1", name: "Unidad Principal" },
    { id: "1-2", name: "Unidad A" },
    { id: "1-3", name: "Unidad B" },
  ],
  "2": [
    { id: "2-1", name: "Apartamento 101" },
    { id: "2-2", name: "Apartamento 102" },
    { id: "2-3", name: "Apartamento 201" },
  ],
  "3": [{ id: "3-1", name: "Casa Completa" }],
}

const mockTenants = [
  { id: "1", name: "Juan Pérez", email: "juan.perez@email.com", phone: "+1 305 123 4567" },
  { id: "2", name: "María García", email: "maria.garcia@email.com", phone: "+1 305 234 5678" },
  { id: "3", name: "Carlos Rodríguez", email: "carlos.r@email.com", phone: "+1 305 345 6789" },
]

type RecurringFee = {
  id: string
  name: string
  amount: string
}

export default function CreateLeaseWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isCreateTenantOpen, setIsCreateTenantOpen] = useState(false)

  const [selectedProperty, setSelectedProperty] = useState("")
  const [selectedUnit, setSelectedUnit] = useState("")
  const [contractType, setContractType] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [rentAmount, setRentAmount] = useState("")
  const [firstPaymentDate, setFirstPaymentDate] = useState("")
  const [hasLateFee, setHasLateFee] = useState(false)
  const [lateFeeAmount, setLateFeeAmount] = useState("")
  const [paymentFrequency, setPaymentFrequency] = useState("monthly")

  const [selectedTenants, setSelectedTenants] = useState<string[]>([])
  const [newTenant, setNewTenant] = useState({
    name: "",
    email: "",
    phone: "",
    idNumber: "",
    notes: "",
  })

  const [securityDeposit, setSecurityDeposit] = useState("")
  const [hoaFee, setHoaFee] = useState("")
  const [petFee, setPetFee] = useState("")
  const [parkingFee, setParkingFee] = useState("")
  const [customFees, setCustomFees] = useState<RecurringFee[]>([])

  const availableUnits = selectedProperty ? mockUnits[selectedProperty as keyof typeof mockUnits] || [] : []

  const handleAddCustomFee = () => {
    setCustomFees([...customFees, { id: Date.now().toString(), name: "", amount: "" }])
  }

  const handleRemoveCustomFee = (id: string) => {
    setCustomFees(customFees.filter((fee) => fee.id !== id))
  }

  const handleUpdateCustomFee = (id: string, field: "name" | "amount", value: string) => {
    setCustomFees(customFees.map((fee) => (fee.id === id ? { ...fee, [field]: value } : fee)))
  }

  const handleAddTenant = (tenantId: string) => {
    if (!selectedTenants.includes(tenantId)) {
      setSelectedTenants([...selectedTenants, tenantId])
    }
  }

  const handleRemoveTenant = (tenantId: string) => {
    setSelectedTenants(selectedTenants.filter((id) => id !== tenantId))
  }

  const handleCreateTenant = () => {
    console.log("[v0] Creating new tenant:", newTenant)
    setIsCreateTenantOpen(false)
    setNewTenant({ name: "", email: "", phone: "", idNumber: "", notes: "" })
  }

  const handleSubmit = () => {
    console.log("[v0] Submitting lease...")
    alert("Contrato creado exitosamente!")
  }

  const steps = [
    { number: 1, title: "Propiedad y Contrato" },
    { number: 2, title: "Inquilinos" },
    { number: 3, title: "Tarifas y Depósitos" },
    { number: 4, title: "Resumen" },
  ]

  return (
    <Wizard
      steps={steps}
      currentStep={currentStep}
      onStepChange={setCurrentStep}
      onComplete={handleSubmit}
      title="Crear Nuevo Contrato"
      subtitle="Complete los siguientes pasos para crear un contrato de arrendamiento"
      nextButtonText="Siguiente"
      previousButtonText="Anterior"
      submitButtonText="Crear Contrato"
    >
      <WizardStepContent currentStep={currentStep} stepNumber={1}>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Detalles de Propiedad y Contrato
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="property">Propiedad *</Label>
              <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                <SelectTrigger id="property">
                  <SelectValue placeholder="Seleccionar propiedad" />
                </SelectTrigger>
                <SelectContent>
                  {mockProperties.map((property) => (
                    <SelectItem key={property.id} value={property.id}>
                      {property.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit">Unidad *</Label>
              <Select value={selectedUnit} onValueChange={setSelectedUnit} disabled={!selectedProperty}>
                <SelectTrigger id="unit">
                  <SelectValue placeholder="Seleccionar unidad" />
                </SelectTrigger>
                <SelectContent>
                  {availableUnits.map((unit) => (
                    <SelectItem key={unit.id} value={unit.id}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contractType">Tipo de Contrato *</Label>
              <Select value={contractType} onValueChange={setContractType}>
                <SelectTrigger id="contractType">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month-to-month">Mes a Mes</SelectItem>
                  <SelectItem value="fixed-term">Plazo Fijo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentFrequency">Frecuencia de Pago *</Label>
              <Select value={paymentFrequency} onValueChange={setPaymentFrequency}>
                <SelectTrigger id="paymentFrequency">
                  <SelectValue placeholder="Seleccionar frecuencia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Semanal</SelectItem>
                  <SelectItem value="biweekly">Quincenal</SelectItem>
                  <SelectItem value="monthly">Mensual</SelectItem>
                  <SelectItem value="quarterly">Trimestral</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">Fecha de Inicio *</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">Fecha de Finalización {contractType === "fixed-term" && "*"}</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                disabled={contractType === "month-to-month"}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rentAmount">Monto de Renta *</Label>
              <Input
                id="rentAmount"
                type="number"
                placeholder="0.00"
                value={rentAmount}
                onChange={(e) => setRentAmount(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="firstPaymentDate">Fecha del Primer Pago *</Label>
              <Input
                id="firstPaymentDate"
                type="date"
                value={firstPaymentDate}
                onChange={(e) => setFirstPaymentDate(e.target.value)}
              />
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="lateFee">Cargo por Mora</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Agregar cargo por pagos tardíos</p>
              </div>
              <Switch id="lateFee" checked={hasLateFee} onCheckedChange={setHasLateFee} />
            </div>

            {hasLateFee && (
              <div className="space-y-2">
                <Label htmlFor="lateFeeAmount">Monto del Cargo por Mora *</Label>
                <Input
                  id="lateFeeAmount"
                  type="number"
                  placeholder="0.00"
                  value={lateFeeAmount}
                  onChange={(e) => setLateFeeAmount(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
      </WizardStepContent>

      <WizardStepContent currentStep={currentStep} stepNumber={2}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Inquilinos</h2>
          <Dialog open={isCreateTenantOpen} onOpenChange={setIsCreateTenantOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Crear Nuevo Inquilino
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Inquilino</DialogTitle>
                <DialogDescription>Complete la información del inquilino</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="tenantName">Nombre Completo *</Label>
                  <Input
                    id="tenantName"
                    value={newTenant.name}
                    onChange={(e) => setNewTenant({ ...newTenant, name: e.target.value })}
                    placeholder="Juan Pérez"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tenantEmail">Correo Electrónico *</Label>
                  <Input
                    id="tenantEmail"
                    type="email"
                    value={newTenant.email}
                    onChange={(e) => setNewTenant({ ...newTenant, email: e.target.value })}
                    placeholder="juan@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tenantPhone">Teléfono *</Label>
                  <Input
                    id="tenantPhone"
                    type="tel"
                    value={newTenant.phone}
                    onChange={(e) => setNewTenant({ ...newTenant, phone: e.target.value })}
                    placeholder="+1 305 123 4567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tenantId">Número de Identificación</Label>
                  <Input
                    id="tenantId"
                    value={newTenant.idNumber}
                    onChange={(e) => setNewTenant({ ...newTenant, idNumber: e.target.value })}
                    placeholder="123456789"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tenantNotes">Notas</Label>
                  <Textarea
                    id="tenantNotes"
                    value={newTenant.notes}
                    onChange={(e) => setNewTenant({ ...newTenant, notes: e.target.value })}
                    placeholder="Información adicional..."
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsCreateTenantOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateTenant}>Crear Inquilino</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="selectTenant">Seleccionar Inquilino</Label>
            <Select onValueChange={handleAddTenant}>
              <SelectTrigger id="selectTenant">
                <SelectValue placeholder="Buscar inquilino existente..." />
              </SelectTrigger>
              <SelectContent>
                {mockTenants
                  .filter((tenant) => !selectedTenants.includes(tenant.id))
                  .map((tenant) => (
                    <SelectItem key={tenant.id} value={tenant.id}>
                      {tenant.name} - {tenant.email}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {selectedTenants.length > 0 && (
            <div className="space-y-3">
              <Label>Inquilinos Seleccionados ({selectedTenants.length})</Label>
              <div className="space-y-2">
                {selectedTenants.map((tenantId) => {
                  const tenant = mockTenants.find((t) => t.id === tenantId)
                  if (!tenant) return null
                  return (
                    <Card key={tenantId}>
                      <CardContent className="flex items-center justify-between p-4">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{tenant.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{tenant.email}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{tenant.phone}</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveTenant(tenantId)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}

          {selectedTenants.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>No hay inquilinos seleccionados</p>
              <p className="text-sm">Seleccione un inquilino existente o cree uno nuevo</p>
            </div>
          )}
        </div>
      </WizardStepContent>

      <WizardStepContent currentStep={currentStep} stepNumber={3}>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Tarifas y Depósitos</h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Depósito de Seguridad</h3>
            <div className="space-y-2">
              <Label htmlFor="securityDeposit">Monto del Depósito (Pago Único)</Label>
              <Input
                id="securityDeposit"
                type="number"
                placeholder="0.00"
                value={securityDeposit}
                onChange={(e) => setSecurityDeposit(e.target.value)}
              />
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Tarifas Recurrentes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hoaFee">Administración (HOA)</Label>
                <Input
                  id="hoaFee"
                  type="number"
                  placeholder="0.00"
                  value={hoaFee}
                  onChange={(e) => setHoaFee(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="petFee">Tarifa de Mascota</Label>
                <Input
                  id="petFee"
                  type="number"
                  placeholder="0.00"
                  value={petFee}
                  onChange={(e) => setPetFee(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="parkingFee">Estacionamiento</Label>
                <Input
                  id="parkingFee"
                  type="number"
                  placeholder="0.00"
                  value={parkingFee}
                  onChange={(e) => setParkingFee(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Tarifas Personalizadas</h3>
              <Button variant="outline" size="sm" onClick={handleAddCustomFee}>
                <Plus className="h-4 w-4 mr-2" />
                Agregar Tarifa
              </Button>
            </div>

            {customFees.length > 0 ? (
              <div className="space-y-3">
                {customFees.map((fee) => (
                  <div key={fee.id} className="flex gap-3 items-end">
                    <div className="flex-1 space-y-2">
                      <Label>Nombre de la Tarifa</Label>
                      <Input
                        placeholder="Ej: Limpieza, Servicios..."
                        value={fee.name}
                        onChange={(e) => handleUpdateCustomFee(fee.id, "name", e.target.value)}
                      />
                    </div>
                    <div className="w-32 space-y-2">
                      <Label>Monto</Label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={fee.amount}
                        onChange={(e) => handleUpdateCustomFee(fee.id, "amount", e.target.value)}
                      />
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveCustomFee(fee.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">No hay tarifas personalizadas agregadas</p>
            )}
          </div>
        </div>
      </WizardStepContent>

      <WizardStepContent currentStep={currentStep} stepNumber={4}>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Resumen del Contrato</h2>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detalles de Propiedad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Propiedad:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {mockProperties.find((p) => p.id === selectedProperty)?.name || "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Unidad:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {availableUnits.find((u) => u.id === selectedUnit)?.name || "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Tipo de Contrato:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {contractType === "month-to-month"
                    ? "Mes a Mes"
                    : contractType === "fixed-term"
                      ? "Plazo Fijo"
                      : "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Frecuencia de Pago:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {paymentFrequency === "weekly"
                    ? "Semanal"
                    : paymentFrequency === "biweekly"
                      ? "Quincenal"
                      : paymentFrequency === "monthly"
                        ? "Mensual"
                        : "Trimestral"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Fecha de Inicio:</span>
                <span className="font-medium text-gray-900 dark:text-white">{startDate || "-"}</span>
              </div>
              {contractType === "fixed-term" && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Fecha de Finalización:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{endDate || "-"}</span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Información Financiera</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Monto de Renta:</span>
                <span className="font-medium text-gray-900 dark:text-white">${rentAmount || "0.00"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Primer Pago:</span>
                <span className="font-medium text-gray-900 dark:text-white">{firstPaymentDate || "-"}</span>
              </div>
              {hasLateFee && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Cargo por Mora:</span>
                  <span className="font-medium text-gray-900 dark:text-white">${lateFeeAmount || "0.00"}</span>
                </div>
              )}
              {securityDeposit && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Depósito de Seguridad:</span>
                  <span className="font-medium text-gray-900 dark:text-white">${securityDeposit}</span>
                </div>
              )}
              <Separator className="my-2" />
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Tarifas Recurrentes:</p>
                {hoaFee && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Administración (HOA):</span>
                    <span className="text-gray-900 dark:text-white">${hoaFee}</span>
                  </div>
                )}
                {petFee && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Tarifa de Mascota:</span>
                    <span className="text-gray-900 dark:text-white">${petFee}</span>
                  </div>
                )}
                {parkingFee && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Estacionamiento:</span>
                    <span className="text-gray-900 dark:text-white">${parkingFee}</span>
                  </div>
                )}
                {customFees.map(
                  (fee) =>
                    fee.name &&
                    fee.amount && (
                      <div key={fee.id} className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">{fee.name}:</span>
                        <span className="text-gray-900 dark:text-white">${fee.amount}</span>
                      </div>
                    ),
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inquilinos ({selectedTenants.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedTenants.length > 0 ? (
                <div className="space-y-3">
                  {selectedTenants.map((tenantId) => {
                    const tenant = mockTenants.find((t) => t.id === tenantId)
                    if (!tenant) return null
                    return (
                      <div
                        key={tenantId}
                        className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          <span className="text-blue-600 dark:text-blue-300 font-semibold">
                            {tenant.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{tenant.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{tenant.email}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">No hay inquilinos seleccionados</p>
              )}
            </CardContent>
          </Card>
        </div>
      </WizardStepContent>
    </Wizard>
  )
}
