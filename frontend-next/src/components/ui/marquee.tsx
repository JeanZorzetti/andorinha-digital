import { ComponentPropsWithoutRef, useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Optional CSS class name to apply custom styles
   */
  className?: string
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean
  /**
   * Whether to pause the animation on hover
   * @default false
   */
  pauseOnHover?: boolean
  /**
   * Content to be displayed in the marquee
   */
  children: React.ReactNode
  /**
   * Whether to animate vertically instead of horizontally
   * @default false
   */
  vertical?: boolean
  /**
   * Number of times to repeat the content
   * @default 4
   */
  repeat?: number
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log('=== MARQUEE DEBUG ===')
    console.log('Container element:', containerRef.current)
    console.log('Item element:', itemRef.current)

    if (containerRef.current) {
      const containerStyles = window.getComputedStyle(containerRef.current)
      console.log('Container computed styles:', {
        display: containerStyles.display,
        overflow: containerStyles.overflow,
        '--duration': containerStyles.getPropertyValue('--duration'),
        '--gap': containerStyles.getPropertyValue('--gap'),
      })
    }

    if (itemRef.current) {
      const itemStyles = window.getComputedStyle(itemRef.current)
      console.log('Item computed styles:', {
        display: itemStyles.display,
        animation: itemStyles.animation,
        animationName: itemStyles.animationName,
        animationDuration: itemStyles.animationDuration,
        animationPlayState: itemStyles.animationPlayState,
        transform: itemStyles.transform,
      })

      // Check if keyframes exist
      const animations = document.getAnimations()
      console.log('All animations on page:', animations.length)
      const marqueeAnimations = animations.filter(anim => {
        const effect = anim.effect as KeyframeEffect | null
        return effect?.target === itemRef.current
      })
      console.log('Animations on marquee item:', marqueeAnimations)
    }

    console.log('Props:', { vertical, reverse, pauseOnHover, repeat })
    console.log('=== END DEBUG ===')
  }, [vertical, reverse, pauseOnHover, repeat])

  return (
    <div
      {...props}
      ref={containerRef}
      className={cn(
        "group flex [gap:var(--gap)] overflow-hidden p-2",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
      style={{
        "--gap": "1rem",
        "--duration": "40s"
      } as React.CSSProperties}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            ref={i === 0 ? itemRef : null}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
            style={{
              animation: vertical
                ? `marquee-vertical var(--duration) linear infinite${reverse ? ' reverse' : ''}`
                : `marquee var(--duration) linear infinite${reverse ? ' reverse' : ''}`,
              animationPlayState: 'running'
            } as React.CSSProperties}
          >
            {children}
          </div>
        ))}
    </div>
  )
}
