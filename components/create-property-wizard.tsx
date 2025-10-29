"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wizard, WizardStepContent } from "@/components/ui/wizard"
import { Plus, X } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

type PropertyType = "unifamiliar" | "multifamiliar" | "comercial"

type Unit = {
  id: string
  name: string
  bedrooms: string
  bathrooms: string
  size: string
  note: string
  marketRent: string
}

export default function CreatePropertyWizard() {
  const [currentStep, setCurrentStep] = useState(1)

  const [propertyType, setPropertyType] = useState<PropertyType | "">("")
  const [address1, setAddress1] = useState("")
  const [address2, setAddress2] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [country, setCountry] = useState("")

  const [units, setUnits] = useState<Unit[]>([
    {
      id: "1",
      name: "",
      bedrooms: "",
      bathrooms: "",
      size: "",
      note: "",
      marketRent: "",
    },
  ])

  const handleAddUnit = () => {
    setUnits([
      ...units,
      {
        id: Date.now().toString(),
        name: "",
        bedrooms: "",
        bathrooms: "",
        size: "",
        note: "",
        marketRent: "",
      },
    ])
  }

  const handleRemoveUnit = (id: string) => {
    if (units.length > 1) {
      setUnits(units.filter((unit) => unit.id !== id))
    }
  }

  const handleUpdateUnit = (id: string, field: keyof Unit, value: string) => {
    setUnits(units.map((unit) => (unit.id === id ? { ...unit, [field]: value } : unit)))
  }

  const handleSubmit = () => {
    const propertyData = {
      propertyType,
      address1,
      address2,
      city,
      state,
      country,
      units,
    }
    console.log("Creating property:", propertyData)
    alert("¡Propiedad creada exitosamente!")
  }

  const steps = [
    { number: 1, title: "Información de Propiedad" },
    { number: 2, title: "Unidades" },
  ]

  return (
    <Wizard
      steps={steps}
      currentStep={currentStep}
      onStepChange={setCurrentStep}
      onComplete={handleSubmit}
      title="Agregar Nueva Propiedad"
      subtitle="Complete los siguientes pasos para registrar una propiedad"
      nextButtonText="Siguiente"
      previousButtonText="Anterior"
      submitButtonText="Crear Propiedad"
    >
      <WizardStepContent currentStep={currentStep} stepNumber={1}>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Información de Propiedad
          </h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="propertyType">Tipo de Propiedad *</Label>
              <Select value={propertyType} onValueChange={(value) => setPropertyType(value as PropertyType)}>
                <SelectTrigger id="propertyType">
                  <SelectValue placeholder="Seleccionar tipo de propiedad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unifamiliar">Unifamiliar</SelectItem>
                  <SelectItem value="multifamiliar">Multifamiliar</SelectItem>
                  <SelectItem value="comercial">Comercial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address1">Dirección 1 *</Label>
              <Input
                id="address1"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                placeholder="Calle y número"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address2">Dirección 2</Label>
              <Input
                id="address2"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                placeholder="Apartamento, suite, piso (opcional)"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="city">Ciudad *</Label>
                <Input
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Ciudad"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">Estado/Departamento *</Label>
                <Input
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="Estado o Departamento"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">País *</Label>
              <Input
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="País"
              />
            </div>
          </div>
        </div>
      </WizardStepContent>

      <WizardStepContent currentStep={currentStep} stepNumber={2}>
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Unidades</h2>
            <Button variant="outline" size="sm" onClick={handleAddUnit}>
              <Plus className="h-4 w-4 mr-2" />
              Agregar Otra Unidad
            </Button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-12 gap-3 text-sm font-medium text-gray-700 dark:text-gray-300 px-3">
              <div className="col-span-2">Nombre Unidad</div>
              <div className="col-span-1">Habitaciones</div>
              <div className="col-span-1">Baños</div>
              <div className="col-span-2">Tamaño (m²)</div>
              <div className="col-span-2">Renta Mercado</div>
              <div className="col-span-3">Nota</div>
              <div className="col-span-1"></div>
            </div>

            <div className="space-y-3">
              {units.map((unit, index) => (
                <div
                  key={unit.id}
                  className="grid grid-cols-12 gap-3 items-start p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="col-span-2">
                    <Input
                      value={unit.name}
                      onChange={(e) => handleUpdateUnit(unit.id, "name", e.target.value)}
                      placeholder="Ej: Unidad A"
                    />
                  </div>

                  <div className="col-span-1">
                    <Input
                      type="number"
                      value={unit.bedrooms}
                      onChange={(e) => handleUpdateUnit(unit.id, "bedrooms", e.target.value)}
                      placeholder="0"
                      min="0"
                    />
                  </div>

                  <div className="col-span-1">
                    <Input
                      type="number"
                      value={unit.bathrooms}
                      onChange={(e) => handleUpdateUnit(unit.id, "bathrooms", e.target.value)}
                      placeholder="0"
                      min="0"
                      step="0.5"
                    />
                  </div>

                  <div className="col-span-2">
                    <Input
                      type="number"
                      value={unit.size}
                      onChange={(e) => handleUpdateUnit(unit.id, "size", e.target.value)}
                      placeholder="0"
                      min="0"
                    />
                  </div>

                  <div className="col-span-2">
                    <Input
                      type="number"
                      value={unit.marketRent}
                      onChange={(e) => handleUpdateUnit(unit.id, "marketRent", e.target.value)}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div className="col-span-3">
                    <Textarea
                      value={unit.note}
                      onChange={(e) => handleUpdateUnit(unit.id, "note", e.target.value)}
                      placeholder="Notas opcionales"
                      rows={1}
                      className="resize-none"
                    />
                  </div>

                  <div className="col-span-1 flex justify-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveUnit(unit.id)}
                      disabled={units.length === 1}
                    >
                      <X className="h-4 w-4"/>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {units.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <p>No hay unidades agregadas</p>
                <p className="text-sm">Haga clic en "Agregar Otra Unidad" para comenzar</p>
              </div>
            )}
          </div>
        </div>
      </WizardStepContent>
    </Wizard>
  )
}
