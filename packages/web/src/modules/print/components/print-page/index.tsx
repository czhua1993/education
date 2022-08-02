import { useBoolean } from 'ahooks'
import { Button } from 'antd'
import classNames from 'classnames'
import _ from 'lodash'
import { useMemo, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

import styles from './index.module.less'
import { getPageStyle } from './utils'

interface PrintPageProps {
  /** 纸张大小 */
  paper?: 'A4' | 'A5'
  /** 纸张方向，默认竖向 */
  orientation?: 'horizontal' | 'vertical'
  /** 行 */
  row?: number
  /** 列 */
  col?: number
  /** 打印内容 */
  content: React.ReactNode[]
  /** 无边框 */
  noBorder?: boolean
}

export const PrintPage = (props: PrintPageProps) => {
  const {
    paper = 'A4',
    orientation = 'vertical',
    row = 8,
    col = 4,
    content,
    noBorder,
  } = props
  const [flip, { toggle: toggleFlip }] = useBoolean(false)
  const ref = useRef<HTMLDivElement>(null)

  const handlePrint = useReactToPrint({
    content: () => ref.current!,
  })

  const chunks = useMemo(
    () => _.chunk(content, row * col),
    [content, row * col]
  )

  const style = useMemo(
    () => getPageStyle(paper, orientation),
    [paper, orientation]
  )

  const itemStyle = useMemo(() => {
    return {
      width: Math.floor(parseInt(style.width) / col) - 2 + 'mm',
      height: Math.floor(parseInt(style.height) / row) - 2 + 'mm',
    }
  }, [style, row, col])

  return (
    <div className="flex flex-col items-center pt-3">
      <div
        className="flex justify-between items-center"
        style={{ width: style.width }}
      >
        <div>
          <Button size="large" onClick={toggleFlip}>
            当前{flip ? '反' : '正'}面，点击翻转
          </Button>
        </div>
        <Button size="large" type="primary" onClick={handlePrint}>
          打印
        </Button>
      </div>
      <div ref={ref}>
        {chunks.map((chunk, index) => (
          <table
            key={index}
            className={classNames(styles.table, {
              [styles.noBorder]: noBorder,
            })}
            style={style}
          >
            <tbody>
              {new Array(row).fill('').map((_tr, trIdx) => (
                <tr key={trIdx}>
                  {new Array(col).fill('').map((_td, tdIdx) => {
                    const start = trIdx * col
                    const end = (trIdx + 1) * col
                    const old = [...chunk, ...new Array(col).fill(null)]
                    const list = flip
                      ? old.slice(start, end).reverse()
                      : old.slice(start, end)
                    return (
                      <td key={tdIdx}>
                        <div style={itemStyle}>{list[tdIdx]}</div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={col}>
                  {index + 1} / {chunks.length}
                </td>
              </tr>
            </tfoot>
          </table>
        ))}
      </div>
    </div>
  )
}
