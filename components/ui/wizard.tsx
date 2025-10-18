"use client"

import { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"

export interface WizardStep {
  number: number
  title: string
  description?: string
}

export interface WizardProps {
  steps: WizardStep[]
  currentStep: number
  onStepChange: (step: number) => void
  onComplete: () => void
  children: ReactNode
  title?: string
  subtitle?: string
  canGoNext?: boolean
  canGoPrevious?: boolean
  nextButtonText?: string
  previousButtonText?: string
  submitButtonText?: string
  showHeader?: boolean
  showCard?: boolean
}

export function Wizard({
  steps,
  currentStep,
  onStepChange,
  onComplete,
  children,
  title,
  subtitle,
  canGoNext = true,
  canGoPrevious = true,
  nextButtonText = "Siguiente",
  previousButtonText = "Anterior",
  submitButtonText = "Finalizar",
  showHeader = true,
  showCard = true,
}: WizardProps) {
  const isFirstStep = currentStep === 1
  const isLastStep = currentStep === steps.length

  const handleNext = () => {
    if (canGoNext && !isLastStep) {
      onStepChange(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (canGoPrevious && !isFirstStep) {
      onStepChange(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    if (isLastStep) {
      onComplete()
    }
  }

  const progressIndicator = (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center flex-1">
          <div className="flex flex-col items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                currentStep >= step.number
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              }`}
            >
              {currentStep > step.number ? <Check className="h-5 w-5" /> : step.number}
            </div>
            <span
              className={`mt-2 text-sm font-medium ${
                currentStep >= step.number ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {step.title}
            </span>
            {step.description && (
              <span className="text-xs text-gray-400 dark:text-gray-500 text-center mt-1">{step.description}</span>
            )}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`h-1 flex-1 mx-4 transition-colors ${
                currentStep > step.number ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )

  const navigationButtons = (
    <div className="flex justify-between pt-6">
      <Button variant="outline" onClick={handlePrevious} disabled={!canGoPrevious || isFirstStep}>
        <ChevronLeft className="h-4 w-4 mr-2" />
        {previousButtonText}
      </Button>
      {isLastStep ? (
        <Button onClick={handleSubmit}>
          {submitButtonText}
          <Check className="h-4 w-4 ml-2" />
        </Button>
      ) : (
        <Button onClick={handleNext} disabled={!canGoNext}>
          {nextButtonText}
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      )}
    </div>
  )

  const content = (
    <>
      {showHeader && (title || subtitle) && (
        <div className="mb-8">
          {title && <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{title}</h1>}
          {subtitle && <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>}
        </div>
      )}

      <div className="mb-8">{progressIndicator}</div>

      {showCard ? (
        <Card>
          <CardContent className="pt-6">
            {children}
            {navigationButtons}
          </CardContent>
        </Card>
      ) : (
        <>
          {children}
          {navigationButtons}
        </>
      )}
    </>
  )

  return <div className="p-6 max-w-5xl mx-auto">{content}</div>
}

export interface WizardStepContentProps {
  currentStep: number
  stepNumber: number
  children: ReactNode
}

export function WizardStepContent({ currentStep, stepNumber, children }: WizardStepContentProps) {
  if (currentStep !== stepNumber) {
    return null
  }

  return <div className="space-y-6">{children}</div>
}
