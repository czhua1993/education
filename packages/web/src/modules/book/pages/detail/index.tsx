import './index.less'

import { useRequest } from 'ahooks'
import { Button } from 'antd'
import { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'

import { getBook } from './apis/get-book'
import { getChapter } from './apis/get-chapter'

export default function BookDetail() {
  const { code } = useParams<{ code: string }>()
  const { data: book } = useRequest(() => getBook(code!))
  const [chapterId, setChapterId] = useState('')
  const { data: chapter } = useRequest(() => getChapter(code!, chapterId), {
    refreshDeps: [chapterId],
  })

  const ref = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({
    content: () => ref.current!,
  })

  return (
    <div
      className="flex flex-col overflow-auto bg-white p-5 py-3"
      style={{ height: 'calc(100vh - 150px)' }}
    >
      <div className="text-center text-2xl pb-2 font-bold border-0 border-b border-solid border-b-gray-100">
        {book?.title}
      </div>
      <div className="flex-1 flex overflow-auto">
        <div className="flex-shrink-0 overflow-auto py-2 border-0 border-r border-solid border-r-gray-100">
          {book?.chapterList.map((chapter: any) =>
            chapter.title ? (
              <a
                key={chapter.id}
                className="block"
                onClick={() => {
                  setChapterId(chapter.id)
                }}
              >
                {chapter.title}
              </a>
            ) : null
          )}
        </div>
        <div className="flex-1 overflow-auto px-5 pt-5 relative">
          <div className="absolute right-4 top-4">
            <Button type="primary" onClick={handlePrint}>
              打印
            </Button>
          </div>
          <div
            ref={ref}
            className="chapter"
            dangerouslySetInnerHTML={{ __html: chapter?.text || '' }}
          />
        </div>
      </div>
    </div>
  )
}
