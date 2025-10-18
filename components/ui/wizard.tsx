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
    <div className="relative">
      <div className="flex items-start justify-between mb-2">
        {steps.map((step, index) => {
          const isActive = currentStep === step.number
          const isCompleted = currentStep > step.number
          const isPending = currentStep < step.number

          return (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1 relative">
                <div className="relative z-10">
                  <div
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center font-semibold
                      transition-all duration-300 ease-in-out
                      ${
                        isCompleted
                          ? "bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30 scale-100"
                          : isActive
                            ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl shadow-blue-500/40 scale-110 ring-4 ring-blue-100 dark:ring-blue-900"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border-2 border-gray-300 dark:border-gray-700"
                      }
                    `}
                  >
                    {isCompleted ? (
                      <Check className="h-6 w-6 animate-in fade-in zoom-in duration-300" />
                    ) : (
                      <span className="text-base">{step.number}</span>
                    )}
                  </div>
                </div>

                <div className="mt-3 text-center max-w-[140px]">
                  <span
                    className={`
                      block text-sm font-semibold transition-colors duration-200
                      ${
                        isActive
                          ? "text-blue-700 dark:text-blue-400"
                          : isCompleted
                            ? "text-green-700 dark:text-green-400"
                            : "text-gray-500 dark:text-gray-400"
                      }
                    `}
                  >
                    {step.title}
                  </span>
                  {step.description && (
                    <span className="block text-xs text-gray-400 dark:text-gray-500 mt-1 leading-tight">
                      {step.description}
                    </span>
                  )}
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="flex-1 px-2 pt-6 -mt-6">
                  <div className="relative h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`
                        absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-in-out
                        ${
                          currentStep > step.number
                            ? "w-full bg-gradient-to-r from-green-500 to-green-600"
                            : "w-0 bg-gradient-to-r from-blue-500 to-blue-600"
                        }
                      `}
                    />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )

  const navigationButtons = (
    <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800 mt-8">
      <Button
        variant="outline"
        onClick={handlePrevious}
        disabled={!canGoPrevious || isFirstStep}
        size="lg"
        className="min-w-[120px]"
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        {previousButtonText}
      </Button>

      <div className="text-sm text-gray-500 dark:text-gray-400">
        Paso {currentStep} de {steps.length}
      </div>

      {isLastStep ? (
        <Button onClick={handleSubmit} size="lg" className="min-w-[120px] bg-green-600 hover:bg-green-700">
          {submitButtonText}
          <Check className="h-4 w-4 ml-2" />
        </Button>
      ) : (
        <Button onClick={handleNext} disabled={!canGoNext} size="lg" className="min-w-[120px]">
          {nextButtonText}
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      )}
    </div>
  )

  const content = (
    <>
      {showHeader && (title || subtitle) && (
        <div className="mb-10">
          {title && (
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-3">
              {title}
            </h1>
          )}
          {subtitle && <p className="text-lg text-gray-600 dark:text-gray-400">{subtitle}</p>}
        </div>
      )}

      <div className="mb-10">{progressIndicator}</div>

      {showCard ? (
        <Card className="border-2 shadow-lg">
          <CardContent className="pt-8 pb-6">
            <div className="min-h-[400px]">{children}</div>
            {navigationButtons}
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="min-h-[400px]">{children}</div>
          {navigationButtons}
        </>
      )}
    </>
  )

  return <div className="p-6 max-w-6xl mx-auto">{content}</div>
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

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-5 duration-300">
      {children}
    </div>
  )
}
