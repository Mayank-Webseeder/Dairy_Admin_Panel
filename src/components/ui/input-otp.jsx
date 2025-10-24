import * as React from "react"
import { OTPInput } from "input-otp"
import { cn } from "./utils"

const InputOTP = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <OTPInput
      ref={ref}
      className={cn("relative flex items-center gap-2", className)}
      {...props}
    />
  )
})
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("flex items-center", className)} {...props} />
  )
})
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        className
      )}
      {...props}
    />
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef((props, ref) => {
  return <div ref={ref} role="separator" {...props} />
})
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }