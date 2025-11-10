import {useEffect, useState} from "@wordpress/element";

export default function useBreakpoint(maxWidth: number = 1024) {
  const [matched, setMatched] = useState<boolean>(window.screen.width < maxWidth)

  useEffect(() => {

    const listener = () => {
      const width = window.screen.width || window.innerWidth || document.documentElement.clientWidth
      if (width < maxWidth) setMatched(true)
    }

    window.addEventListener('resize', listener)
    return () => window.removeEventListener('resize', listener)
  }, []);

  return matched
}