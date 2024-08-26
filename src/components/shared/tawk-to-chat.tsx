"use client"

import React, { useEffect } from "react"

const TawkToChat = () => {
  useEffect(() => {
    const tawkScript = document.createElement("script")
    tawkScript.async = true
    tawkScript.src = "https://embed.tawk.to/66cc044dea492f34bc0a127a/1i66f1lc9"
    tawkScript.charset = "UTF-8"
    tawkScript.setAttribute("crossorigin", "*")

    document.body.appendChild(tawkScript)

    return () => {
      document.body.removeChild(tawkScript)
    }
  }, [])

  return null
}

export default TawkToChat
