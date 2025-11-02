"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wizard } from "@/components/custom/wizard/wizard"
import { WizardStepper } from "@/components/custom/wizard/wizard-stepper"
import { WizardStep } from "@/components/custom/wizard/wizard-step"

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

const AMENITIES = ["Piscina", "Gym", "Lavandería", "Ascensor", "Sistema de seguridad", "Amigable con mascotas", "Zona verde", "Estacionamiento techado"]

const WIZARD_STEPS = [
  { id: "basic", title: "Información Básica", description: "Nombre y dirección" },
  { id: "details", title: "Detalles de Propiedad", description: "Características" },
  { id: "units", title: "Unidades", description: "Configurar unidades" },
]

export default function CreatePropertyWizard() {
  const [currentStep, setCurrentStep] = useState(0)

  // Basic Information
  const [propertyName, setPropertyName] = useState("")
  const [propertyType, setPropertyType] = useState<PropertyType | "">("")
  const [address1, setAddress1] = useState("")
  const [address2, setAddress2] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [country, setCountry] = useState("")

  // Property Details
  const [yearBuilt, setYearBuilt] = useState("")
  const [squareMeters, setSquareMeters] = useState("")
  const [lotSize, setLotSize] = useState("")
  const [parkingSpaces, setParkingSpaces] = useState("")

  // Description
  const [description, setDescription] = useState("")

  // Units
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

  const handleNext = () => {
    if (currentStep < WIZARD_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    const propertyData = {
      propertyName,
      propertyType,
      address: {
        address1,
        address2,
        city,
        state,
        postalCode,
        country,
      },
      details: {
        yearBuilt,
        squareFeet: squareMeters,
        lotSize,
        parkingSpaces,
      },
      description,
      units,
    }
    console.log("Creating property:", propertyData)
    alert("¡Propiedad creada exitosamente!")
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
          Agregar Nueva Propiedad
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Complete los siguientes pasos para registrar una propiedad
        </p>
      </div>

      {/* Wizard Stepper */}
      <WizardStepper steps={WIZARD_STEPS} currentStep={currentStep} />

      {/* Wizard Content */}
      <Wizard
        currentStep={currentStep}
        totalSteps={WIZARD_STEPS.length}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSubmit={handleSubmit}
      >
        {/* Step 1: Basic Information */}
        <WizardStep isActive={currentStep === 0}>
         <Card className="p-6">
           <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
             Información Básica
           </h2>

           <div className="space-y-5">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="space-y-2">
                 <Label htmlFor="propertyName">Nombre de la Propiedad *</Label>
                 <Input
                   id="propertyName"
                   value={propertyName}
                   onChange={(e) => setPropertyName(e.target.value)}
                   placeholder="Ej: Villa Sunset, Edificio Central"
                 />
               </div>

               <div className="space-y-2">
                 <Label htmlFor="propertyType">Tipo de Propiedad *</Label>
                 <Select value={propertyType} onValueChange={(value) => setPropertyType(value as PropertyType)}>
                   <SelectTrigger  className="w-full"  id="propertyType">
                     <SelectValue placeholder="Seleccionar tipo de propiedad"/>
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="unifamiliar">Unifamiliar</SelectItem>
                     <SelectItem value="multifamiliar">Multifamiliar</SelectItem>
                     <SelectItem value="comercial">Comercial</SelectItem>
                   </SelectContent>
                 </Select>
               </div>
             </div>

               <div className="space-y-2">
                 <Label htmlFor="address1">Dirección *</Label>
                 <Input
                   id="address1"
                   value={address1}
                   onChange={(e) => setAddress1(e.target.value)}
                   placeholder="Calle y número"
                 />
               </div>

               <div className="space-y-2">
                 <Label htmlFor="address2">Apartamento/Piso/Edificio (Opcional)</Label>
                 <Input
                   id="address2"
                   value={address2}
                   onChange={(e) => setAddress2(e.target.value)}
                   placeholder="Apartamento, suite, piso"
                 />
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <Label htmlFor="postalCode">Código Postal</Label>
                   <Input
                     id="postalCode"
                     value={postalCode}
                     onChange={(e) => setPostalCode(e.target.value)}
                     placeholder="Código postal"
                   />
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
         </Card>
        </WizardStep>

        {/* Step 2: Property Details */}
        <WizardStep isActive={currentStep === 1}>
         <Card className="p-6">
           <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
             Detalles de la Propiedad
           </h2>

           <div className="space-y-5">
             <div className="space-y-2">
               <Label htmlFor="yearBuilt">Año de Construcción</Label>
               <Input
                 id="yearBuilt"
                 type="number"
                 value={yearBuilt}
                 onChange={(e) => setYearBuilt(e.target.value)}
                 placeholder="2020"
               />
             </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="squareFeet">Área Total (m²)</Label>
                  <Input
                    id="squareFeet"
                    type="number"
                    value={squareMeters}
                    onChange={(e) => setSquareMeters(e.target.value)}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lotSize">Tamaño del Terreno</Label>
                  <Input
                    id="lotSize"
                    type="number"
                    value={lotSize}
                    onChange={(e) => setLotSize(e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="parkingSpaces">Espacios de Estacionamiento</Label>
                  <Input
                    id="parkingSpaces"
                    type="number"
                    value={parkingSpaces}
                    onChange={(e) => setParkingSpaces(e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>
           </div>
         </Card>
        </WizardStep>

        <WizardStep isActive={currentStep === 2}>
         <Card className="p-6">
           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
             <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Unidades</h2>
             <Button variant="outline" size="sm" onClick={handleAddUnit}>
               <Plus className="h-4 w-4 mr-2" />
               Agregar Otra Unidad
             </Button>
           </div>

          <div className="space-y-4 overflow-x-auto">
            <div className="hidden lg:grid grid-cols-12 gap-3 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 min-w-[900px]">
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
                  className="lg:grid lg:grid-cols-12 gap-3 items-start p-3 bg-gray-50 dark:bg-gray-800 rounded-lg min-w-[900px] lg:min-w-0"
                >
                  {/* Mobile/Tablet: Stacked Layout */}
                  <div className="lg:hidden space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 space-y-2">
                        <Label className="text-xs text-gray-600 dark:text-gray-400">Nombre Unidad</Label>
                        <Input
                          value={unit.name}
                          onChange={(e) => handleUpdateUnit(unit.id, "name", e.target.value)}
                          placeholder="Ej: Unidad A"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveUnit(unit.id)}
                        disabled={units.length === 1}
                        className="ml-2"
                      >
                        <X className="h-4 w-4"/>
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label className="text-xs text-gray-600 dark:text-gray-400">Habitaciones</Label>
                        <Input
                          type="number"
                          value={unit.bedrooms}
                          onChange={(e) => handleUpdateUnit(unit.id, "bedrooms", e.target.value)}
                          placeholder="0"
                          min="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-gray-600 dark:text-gray-400">Baños</Label>
                        <Input
                          type="number"
                          value={unit.bathrooms}
                          onChange={(e) => handleUpdateUnit(unit.id, "bathrooms", e.target.value)}
                          placeholder="0"
                          min="0"
                          step="0.5"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label className="text-xs text-gray-600 dark:text-gray-400">Tamaño (m²)</Label>
                        <Input
                          type="number"
                          value={unit.size}
                          onChange={(e) => handleUpdateUnit(unit.id, "size", e.target.value)}
                          placeholder="0"
                          min="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-gray-600 dark:text-gray-400">Renta Mercado</Label>
                        <Input
                          type="number"
                          value={unit.marketRent}
                          onChange={(e) => handleUpdateUnit(unit.id, "marketRent", e.target.value)}
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs text-gray-600 dark:text-gray-400">Nota</Label>
                      <Textarea
                        value={unit.note}
                        onChange={(e) => handleUpdateUnit(unit.id, "note", e.target.value)}
                        placeholder="Notas opcionales"
                        rows={2}
                        className="resize-none"
                      />
                    </div>
                  </div>

                  {/* Desktop: Grid Layout */}
                  <div className="hidden lg:contents">
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
         </Card>
        </WizardStep>
      </Wizard>
    </div>
  )
}
