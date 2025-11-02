"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
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
  { id: "amenities", title: "Amenidades", description: "Servicios disponibles" },
  { id: "owner", title: "Propietario", description: "Información del dueño" },
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
  const [squareFeet, setSquareFeet] = useState("")
  const [lotSize, setLotSize] = useState("")
  const [parkingSpaces, setParkingSpaces] = useState("")
  const [numFloors, setNumFloors] = useState("")

  // Amenities
  const [amenities, setAmenities] = useState<string[]>([])

  // Owner Information
  const [ownerName, setOwnerName] = useState("")
  const [ownershipPercentage, setOwnershipPercentage] = useState("100")

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

  const handleAmenityToggle = (amenity: string) => {
    setAmenities(
      amenities.includes(amenity)
        ? amenities.filter((a) => a !== amenity)
        : [...amenities, amenity]
    )
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
        squareFeet,
        lotSize,
        parkingSpaces,
        numFloors,
      },
      amenities,
      owner: {
        name: ownerName,
        ownership: ownershipPercentage,
      },
      description,
      units,
    }
    console.log("Creating property:", propertyData)
    alert("¡Propiedad creada exitosamente!")
  }

  return (
    <div className="space-y-8">
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
         <div>
           <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
             Información Básica
           </h2>

           <div className="space-y-6">
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
               <Label htmlFor="address1">Dirección *</Label>
               <Input
                 id="address1"
                 value={address1}
                 onChange={(e) => setAddress1(e.target.value)}
                 placeholder="Calle y número"
               />
             </div>

             <div className="space-y-2">
               <Label htmlFor="address2">Apartamento/Piso/Suite (Opcional)</Label>
               <Input
                 id="address2"
                 value={address2}
                 onChange={(e) => setAddress2(e.target.value)}
                 placeholder="Apartamento, suite, piso"
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

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
         </div>
        </WizardStep>

        {/* Step 2: Property Details */}
        <WizardStep isActive={currentStep === 1}>
         <div>
           <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
             Detalles de la Propiedad
           </h2>

           <div className="space-y-6">
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

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                 <Label htmlFor="squareFeet">Área Total (ft²)</Label>
                 <Input
                   id="squareFeet"
                   type="number"
                   value={squareFeet}
                   onChange={(e) => setSquareFeet(e.target.value)}
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

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

               <div className="space-y-2">
                 <Label htmlFor="numFloors">Número de Pisos</Label>
                 <Input
                   id="numFloors"
                   type="number"
                   value={numFloors}
                   onChange={(e) => setNumFloors(e.target.value)}
                   placeholder="0"
                 />
               </div>
             </div>
           </div>
         </div>
        </WizardStep>

        {/* Step 3: Amenities */}
        <WizardStep isActive={currentStep === 2}>
         <div>
           <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
             Amenidades
           </h2>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {AMENITIES.map((amenity) => (
               <Card key={amenity} className="p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                 <Checkbox
                   id={amenity}
                   checked={amenities.includes(amenity)}
                   onCheckedChange={() => handleAmenityToggle(amenity)}
                 />
                 <Label htmlFor={amenity} className="cursor-pointer font-medium text-gray-900 dark:text-white">
                   {amenity}
                 </Label>
               </Card>
             ))}
           </div>
         </div>
        </WizardStep>

        {/* Step 4: Owner Information */}
        <WizardStep isActive={currentStep === 3}>
         <div>
           <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
             Información del Propietario
           </h2>

           <div className="space-y-6">
             <div className="space-y-2">
               <Label htmlFor="ownerName">Nombre del Propietario *</Label>
               <Input
                 id="ownerName"
                 value={ownerName}
                 onChange={(e) => setOwnerName(e.target.value)}
                 placeholder="Nombre completo"
               />
             </div>

             <div className="space-y-2">
               <Label htmlFor="ownershipPercentage">Porcentaje de Propiedad (%)</Label>
               <Input
                 id="ownershipPercentage"
                 type="number"
                 value={ownershipPercentage}
                 onChange={(e) => setOwnershipPercentage(e.target.value)}
                 min="0"
                 max="100"
                 placeholder="100"
               />
             </div>

             <div className="space-y-2">
               <Label htmlFor="description">Descripción de la Propiedad</Label>
               <Textarea
                 id="description"
                 value={description}
                 onChange={(e) => setDescription(e.target.value)}
                 placeholder="Describe la propiedad, condiciones, características especiales..."
                 rows={4}
               />
             </div>
           </div>
         </div>
        </WizardStep>

        {/* Step 5: Units */}
        <WizardStep isActive={currentStep === 4}>
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
        </WizardStep>
      </Wizard>
    </div>
  )
}
