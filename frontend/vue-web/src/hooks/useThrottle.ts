import { useState, useEffect, useRef } from 'react'

// 节流Hook
export function useThrottle<T>(value: T, delay: number = 1000): T {
  const [throttledValue, setThrottledValue] = useState<T>(value)
  const lastExecutedRef = useRef<number>(0)

  useEffect(() => {
    const now = Date.now()
    const timeElapsed = now - lastExecutedRef.current
    
    if (timeElapsed >= delay) {
      setThrottledValue(value)
      lastExecutedRef.current = now
    } else {
      const timerId = setTimeout(() => {
        setThrottledValue(value)
        lastExecutedRef.current = Date.now()
      }, delay - timeElapsed)
      
      return () => clearTimeout(timerId)
    }
  }, [value, delay])

  return throttledValue
} 