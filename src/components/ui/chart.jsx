import * as React from "react"
import { Recharts, Pie, Tooltip, ResponsiveContainer } from "recharts"
import { useTheme } from "next-themes"
import { cn } from "./utils"
const Chart = ResponsiveContainer
const ChartContainer = React.forwardRef(({ id, className, children, ...props }, ref) => {
  const chartId = React.useId()
  const Component = Recharts
  return (
    <div
      data-chart
      ref={ref}
      id={id ?? chartId}
      className={cn(
        "min-h-[200px] w-full aspect-video [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke-dasharray='3 3']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-radial-bar-sector]:fill-primary [&_.recharts-reference-line_line]:stroke-border [&_.recharts-sector[path_stroke='var(--background)']]:stroke-transparent [&_.recharts-surface]:outline-none [&_.recharts-tooltip-wrapper]:outline-none",
        className
      )}
      {...props}
    >
      <Component>{children}</Component>
    </div>
  )
})
ChartContainer.displayName = "Chart"
const ChartTooltip = Tooltip
const ChartTooltipContent = React.forwardRef(({ className, ...props }, ref) => {
  const { resolvedTheme } = useTheme()
  return (
    <TooltipPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  )
})
ChartTooltipContent.displayName = TooltipPrimitive.Content.displayName
const ChartLegend = Legend
const ChartLegendContent = React.forwardRef(({ className, ...props }, ref) => (
  <LegendPrimitive.Content
    ref={ref}
    className={cn(
      "flex items-center justify-center gap-4 [&>li]:flex [&>li]:items-center [&>li]:gap-1.5 [&>li]:text-muted-foreground",
      className
    )}
    {...props}
  />
))
ChartLegendContent.displayName = "ChartLegend"
const ChartStyle = ({ id, config }) => {
  const { resolvedTheme } = useTheme()
  const theme = resolvedTheme === "light" ? "light" : "dark"
  const styles = React.useMemo(() => getThemeCssVariables(config, theme), [
    config,
    theme,
  ])
  return (
    <style
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{
        __html: `
[data-chart][id="${id}"] {
${styles}
}
`,
      }}
    />
  )
}
const ChartConfig = ({ children, ...config }) => {
  const id = React.useId()
  const configValue = {
    id,
    config,
  }
  return (
    <ChartContext.Provider value={configValue}>
      <ChartStyle id={id} config={config} />
      {children}
    </ChartContext.Provider>
  )
}
const useChart = () => {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a <ChartConfig />")
  }
  return context
}
export {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  ChartConfig,
  useChart,
}