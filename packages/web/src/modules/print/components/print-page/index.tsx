import classNames from 'classnames'
import _ from 'lodash'
import { useMemo } from 'react'

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
}

export const PrintPage = (props: PrintPageProps) => {
  const {
    paper = 'A4',
    orientation = 'vertical',
    row = 8,
    col = 4,
    content,
  } = props

  const chunks = _.chunk(content, row * col)

  const style = useMemo(
    () => getPageStyle(paper, orientation),
    [paper, orientation]
  )

  const itemStyle = useMemo(() => {
    return {
      width: Math.floor(parseInt(style.width) / col) + 'mm',
      height: Math.floor(parseInt(style.height) / row) + 'mm',
    }
  }, [style, row, col])

  return (
    <div className={classNames(styles.print)}>
      <div>
        {chunks.map((chunk, index) => (
          <table key={index} className={classNames(styles.table)} style={style}>
            <tbody>
              {new Array(row).fill('').map((_tr, trIdx) => (
                <tr key={trIdx}>
                  {new Array(col).fill('').map((_td, tdIdx) => {
                    const index = trIdx * col + tdIdx
                    return (
                      <td key={tdIdx}>
                        <div style={itemStyle}>{content[index]}</div>
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
