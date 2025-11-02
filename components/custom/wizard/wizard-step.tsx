import type React from "react"
import { cn } from "@/lib/utils"

interface WizardStepProps {
  isActive: boolean
  children: React.ReactNode
  className?: string
}

export function WizardStep({ isActive, children, className }: WizardStepProps) {
  if (!isActive) return null

  return <div className={cn("animate-in fade-in duration-300", className)}>{children}</div>
}
