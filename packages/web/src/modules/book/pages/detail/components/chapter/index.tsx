import { useRequest } from 'ahooks'
import { Spin } from 'antd'

import { getChapter } from '../../apis/get-chapter'

export const Chapter = (props: { code: string; chapterId: string }) => {
  const { code, chapterId } = props
  const { data: chapter, loading } = useRequest(
    () => getChapter(code!, chapterId),
    {
      refreshDeps: [chapterId],
    }
  )

  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: chapter?.text || '' }}
        style={{ pageBreakAfter: 'always' }}
      />
      {loading && (
        <div className="h-20 flex justify-center items-center">
          <Spin />
        </div>
      )}
    </>
  )
}
