"use client"

import { useState } from "react"
import { WizardStepper } from "@/components/custom/wizard/wizard-stepper"
import { WizardStep } from "@/components/custom/wizard/wizard-step"
import { Wizard } from "@/components/custom/wizard/wizard"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const steps = [
  {
    id: "personal",
    title: "Personal Information",
    description: "Tell us about yourself",
  },
  {
    id: "address",
    title: "Address",
    description: "Where do you live?",
  },
  {
    id: "preferences",
    title: "Preferences",
    description: "Your choices",
  },
  {
    id: "review",
    title: "Review",
    description: "Confirm your details",
  },
]

interface FormData {
  firstName: string
  lastName: string
  email: string
  street: string
  city: string
  country: string
  notifications: boolean
  newsletter: boolean
}

export default function WizardDemo() {
  const [currentStep, setCurrentStep] = useState(0)
  const [canProceed, setCanProceed] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    country: "",
    notifications: true,
    newsletter: false,
  })

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    validateStep(currentStep, { ...formData, [field]: value })
  }

  const validateStep = (step: number, data: FormData) => {
    switch (step) {
      case 0: // Personal
        setCanProceed(data.firstName.trim() !== "" && data.lastName.trim() !== "" && data.email.trim() !== "")
        break
      case 1: // Address
        setCanProceed(data.street.trim() !== "" && data.city.trim() !== "" && data.country.trim() !== "")
        break
      default:
        setCanProceed(true)
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
      validateStep(currentStep + 1, formData)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex < currentStep) {
      setCurrentStep(stepIndex)
    }
  }

  const handleSubmit = () => {
    console.log("Form submitted:", formData)
    alert("Form submitted! Check console for details.")
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/10 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Multi-Step Form Wizard</h1>
          <p className="text-muted-foreground">Complete your profile in just a few steps</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep].title}</CardTitle>
            <CardDescription>{steps[currentStep].description}</CardDescription>
          </CardHeader>
          <CardContent>
            <WizardStepper steps={steps} currentStep={currentStep} onStepClick={handleStepClick} />

            <Wizard
              currentStep={currentStep}
              totalSteps={steps.length}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onSubmit={handleSubmit}
              canProceed={canProceed}
            >
              {/* Step 0: Personal Information */}
              <WizardStep isActive={currentStep === 0}>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">First Name</label>
                      <Input
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Last Name</label>
                      <Input
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email Address</label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                </div>
              </WizardStep>

              {/* Step 1: Address */}
              <WizardStep isActive={currentStep === 1}>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Street Address</label>
                    <Input
                      placeholder="123 Main St"
                      value={formData.street}
                      onChange={(e) => handleInputChange("street", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">City</label>
                      <Input
                        placeholder="New York"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Country</label>
                      <Input
                        placeholder="USA"
                        value={formData.country}
                        onChange={(e) => handleInputChange("country", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </WizardStep>

              {/* Step 2: Preferences */}
              <WizardStep isActive={currentStep === 2}>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted transition">
                    <input
                      type="checkbox"
                      checked={formData.notifications}
                      onChange={(e) => handleInputChange("notifications", e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">Enable notifications</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted transition">
                    <input
                      type="checkbox"
                      checked={formData.newsletter}
                      onChange={(e) => handleInputChange("newsletter", e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">Subscribe to newsletter</span>
                  </label>
                </div>
              </WizardStep>

              {/* Step 3: Review */}
              <WizardStep isActive={currentStep === 3}>
                <div className="space-y-4">
                  <div className="p-4 bg-secondary/50 rounded-lg space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-semibold">
                        {formData.firstName} {formData.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-semibold">{formData.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-semibold">
                        {formData.street}, {formData.city}, {formData.country}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Preferences</p>
                      <p className="text-sm">
                        {formData.notifications && "• Notifications enabled"}
                        {formData.notifications && formData.newsletter && " • "}
                        {formData.newsletter && "• Newsletter enabled"}
                      </p>
                    </div>
                  </div>
                </div>
              </WizardStep>
            </Wizard>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>
    </main>
  )
}
