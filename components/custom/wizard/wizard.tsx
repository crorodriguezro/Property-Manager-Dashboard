"use client"

import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"

interface WizardProps {
  currentStep: number
  totalSteps: number
  onNext: () => void
  onPrevious: () => void
  onSubmit?: () => void
  canProceed?: boolean
  children: ReactNode
  showNavigation?: boolean
}

export function Wizard({
                         currentStep,
                         totalSteps,
                         onNext,
                         onPrevious,
                         onSubmit,
                         canProceed = true,
                         children,
                         showNavigation = true,
                       }: WizardProps) {
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === totalSteps - 1

  return (
    <div className="w-full">
      <div className="mb-8">{children}</div>

      {showNavigation && (
        <div className="flex gap-4 justify-between mt-8">
          <Button variant="outline" onClick={onPrevious} disabled={isFirstStep}>
            Previous
          </Button>

          {isLastStep ? (
            <Button onClick={onSubmit} disabled={!canProceed}>
              Complete
            </Button>
          ) : (
            <Button onClick={onNext} disabled={!canProceed}>
              Next
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
