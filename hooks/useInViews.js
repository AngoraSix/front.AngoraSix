import { useState, useEffect, useRef } from "react"

export const useInView = (options = {}) => {
  const [inView, setInView] = useState(false)
  const [entry, setEntry] = useState({})
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        setEntry(entry)

        if (entry.isIntersecting && options.triggerOnce) {
          observer.unobserve(ref.current)
        }
      },
      {
        threshold: options.threshold || 0,
        rootMargin: options.rootMargin || "0px",
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [options.threshold, options.rootMargin, options.triggerOnce])

  return [ref, inView, entry]
}
