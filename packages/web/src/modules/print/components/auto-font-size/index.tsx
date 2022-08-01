import classNames from 'classnames'
import _ from 'lodash'
import React, { useLayoutEffect, useRef } from 'react'

import styles from './index.module.less'
import { getLines } from './utils'

interface AutoFontSizeProps {
  fontSize?: number
  /** 英文 */
  isEnglish?: boolean
  children: React.ReactNode
  lineHeight?: number
}

export const AutoFontSize = (props: AutoFontSizeProps) => {
  const { children, fontSize = 80, isEnglish = false, lineHeight = 1 } = props
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (ref.current) {
      const parent = ref.current.parentNode as HTMLDivElement
      while (
        (ref.current.clientWidth > parent.clientWidth ||
          ref.current.clientHeight > parent.clientHeight) &&
        parseInt(ref.current.style.fontSize) > 12
      ) {
        ref.current.style.fontSize =
          parseInt(ref.current.style.fontSize) - 2 + 'px'
      }
    }
  })

  return (
    <div
      ref={ref}
      className={classNames(styles.text, {
        [styles.english]: isEnglish,
      })}
      style={{ fontSize, lineHeight }}
    >
      {typeof children === 'string'
        ? getLines(children, isEnglish).map((s, i) => <div key={i}>{s}</div>)
        : children}
    </div>
  )
}
