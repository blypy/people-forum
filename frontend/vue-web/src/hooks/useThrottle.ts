import { useRef } from 'react'

// 节流Hook
export function useThrottle() {
  const throttleTimerRef = useRef<NodeJS.Timeout | null>(null)
  const isThrottlingRef = useRef<boolean>(false)

  const throttle = (callback: () => void, delay: number = 500) => {
    if (isThrottlingRef.current) return

    isThrottlingRef.current = true
    callback()

    throttleTimerRef.current = setTimeout(() => {
      isThrottlingRef.current = false
    }, delay)
  }

  return {
    isThrottlingRef,
    throttle
  }
}
