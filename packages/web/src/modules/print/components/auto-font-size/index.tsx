import React, { useLayoutEffect, useRef } from 'react'

import styles from './index.module.less'

interface AutoFontSizeProps {
  fontSize?: number
  children: React.ReactNode
}

export const AutoFontSize = (props: AutoFontSizeProps) => {
  const { children, fontSize = 80 } = props
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (ref.current) {
      const parent = ref.current.parentNode as HTMLDivElement
      while (ref.current.clientWidth > parent.clientWidth) {
        ref.current.style.fontSize =
          parseInt(ref.current.style.fontSize) - 2 + 'px'
      }
    }
  })

  return (
    <div ref={ref} className={styles.text} style={{ fontSize }}>
      {children}
    </div>
  )
}
