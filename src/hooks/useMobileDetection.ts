import { useEffect, useState } from 'react'

const MOBILE_WIDTH = 768

export const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const onResize = () => {
      const isMobile = window.innerWidth < MOBILE_WIDTH
      setIsMobile(isMobile)
    }

    window.addEventListener('resize', onResize)
    onResize()

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return isMobile
}
