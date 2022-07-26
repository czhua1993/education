import { Spin, SpinProps } from 'antd'
import classNames from 'classnames'

interface LoadingProps extends SpinProps {
  fixed?: boolean
  className?: string
}

export const Loading = (props: LoadingProps) => {
  const { fixed, className, ...spinProps } = props

  return (
    <div
      className={classNames(
        'py-10 flex-1 flex flex-col justify-center items-center',
        fixed && 'fixed inset-0',
        className
      )}
    >
      <Spin {...spinProps} />
    </div>
  )
}
