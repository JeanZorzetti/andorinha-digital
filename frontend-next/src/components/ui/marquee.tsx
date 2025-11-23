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
    // Inject keyframes if they don't exist
    const keyframesId = 'marquee-keyframes-injected'
    if (!document.getElementById(keyframesId)) {
      const style = document.createElement('style')
      style.id = keyframesId
      style.textContent = `
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-100% - 1rem));
          }
        }

        @keyframes marquee-vertical {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(calc(-100% - 1rem));
          }
        }
      `
      document.head.appendChild(style)
      console.log('✅ Marquee keyframes injected into document')
    }

    // Debug logs
    console.log('=== MARQUEE DEBUG ===')
    if (itemRef.current) {
      const itemStyles = window.getComputedStyle(itemRef.current)
      console.log('Item computed styles:', {
        animation: itemStyles.animation,
        animationName: itemStyles.animationName,
        animationPlayState: itemStyles.animationPlayState,
      })

      // Force reflow to trigger animation
      setTimeout(() => {
        const animations = document.getAnimations()
        const marqueeAnimations = animations.filter(anim => {
          const effect = anim.effect as KeyframeEffect | null
          return effect?.target === itemRef.current
        })
        console.log('Animations after injection:', marqueeAnimations.length)
      }, 100)
    }
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
