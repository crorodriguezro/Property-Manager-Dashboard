"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface WizardStep {
  id: string
  title: string
  description?: string
}

interface WizardStepperProps {
  steps: WizardStep[]
  currentStep: number
  onStepClick?: (stepIndex: number) => void
}

export function WizardStepper({ steps, currentStep, onStepClick }: WizardStepperProps) {
  return (
    <div className="w-full mb-12">
      {/* Horizontal stepper for larger screens */}
      <div className="hidden md:flex gap-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            {/* Step indicator */}
            <button
              onClick={() => onStepClick?.(index)}
              className={cn(
                "relative flex items-center justify-center w-12 h-12 rounded-full border-2 font-semibold transition-all flex-shrink-0",
                index < currentStep
                  ? "bg-primary border-primary text-primary-foreground"
                  : index === currentStep
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-muted border-muted text-muted-foreground",
              )}
              disabled={!onStepClick}
            >
              {index < currentStep ? <Check className="w-5 h-5" /> : <span>{index + 1}</span>}
            </button>

            {/* Step info */}
            <div className="ml-4 flex-1">
              <p
                className={cn(
                  "text-sm font-semibold transition-colors",
                  index <= currentStep ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {step.title}
              </p>
              {step.description && (
                <p
                  className={cn(
                    "text-xs transition-colors",
                    index <= currentStep ? "text-foreground/70" : "text-muted-foreground",
                  )}
                >
                  {step.description}
                </p>
              )}
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-1 mx-2 rounded transition-colors",
                  index < currentStep ? "bg-primary" : "bg-muted",
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Vertical stepper for mobile */}
      <div className="md:hidden flex flex-col gap-6">
        {steps.map((step, index) => (
          <div key={step.id} className="flex gap-4">
            {/* Step indicator */}
            <div className="flex flex-col items-center flex-shrink-0">
              <button
                onClick={() => onStepClick?.(index)}
                className={cn(
                  "relative flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold transition-all",
                  index < currentStep
                    ? "bg-primary border-primary text-primary-foreground"
                    : index === currentStep
                      ? "bg-primary border-primary text-primary-foreground"
                      : "bg-muted border-muted text-muted-foreground",
                )}
                disabled={!onStepClick}
              >
                {index < currentStep ? <Check className="w-4 h-4" /> : <span>{index + 1}</span>}
              </button>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-1 h-12 mt-2 rounded transition-colors",
                    index < currentStep ? "bg-primary" : "bg-muted",
                  )}
                />
              )}
            </div>

            {/* Step info */}
            <div className="flex-1 pt-1">
              <p
                className={cn(
                  "text-sm font-semibold transition-colors",
                  index <= currentStep ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {step.title}
              </p>
              {step.description && (
                <p
                  className={cn(
                    "text-xs transition-colors",
                    index <= currentStep ? "text-foreground/70" : "text-muted-foreground",
                  )}
                >
                  {step.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
