"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CircleArrowUp } from "lucide-react"

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    setIsVisible(window.scrollY > 500)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const buttonAnimation = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.4, ease: "easeInOut", stiffness: 100 },
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div {...buttonAnimation} className="fixed right-5 top-20 z-50">
          <motion.button
            whileTap={{ scale: 1.2 }}
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <CircleArrowUp
              size={40}
              absoluteStrokeWidth={true}
              strokeWidth={1.5}
            />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
