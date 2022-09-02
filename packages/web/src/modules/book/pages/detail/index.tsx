import './index.less'

import { useBoolean, useRequest } from 'ahooks'
import { Button, Checkbox } from 'antd'
import { useRef, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'

import { getBook } from './apis/get-book'
import { Chapter } from './components/chapter'

export default function BookDetail() {
  const { code } = useParams<{ code: string }>()
  const { data: book } = useRequest(() => getBook(code!))
  const [chapterList, setChapterList] = useState<string[]>([])

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
          {book?.chapterList.map((chapter) =>
            chapter.title ? (
              <div>
                <Checkbox
                  checked={chapterList.indexOf(chapter.id) > -1}
                  onChange={() => {
                    const index = chapterList.indexOf(chapter.id)
                    const newList = [...chapterList]
                    if (index > -1) {
                      newList.splice(index, 1)
                      setChapterList(newList)
                    } else {
                      newList.push(chapter.id)
                      setChapterList(
                        book?.chapterList
                          .filter((chapter) => newList.indexOf(chapter.id) > -1)
                          .map((chapter) => chapter.id)
                      )
                    }
                  }}
                >
                  <a key={chapter.id}>{chapter.title}</a>
                </Checkbox>
              </div>
            ) : null
          )}
        </div>
        <div className="flex-1 overflow-auto px-5 pt-5 relative">
          <div className="absolute right-4 top-4">
            <Button type="primary" onClick={handlePrint}>
              打印
            </Button>
            <CopyToClipboard
              text={`${window.location.protocol}//${
                window.location.host
              }/book/print/${code}?chapterList=${JSON.stringify(chapterList)}`}
            >
              <Button className="ml-2">复制地址</Button>
            </CopyToClipboard>
          </div>
          <div ref={ref} className="chapter">
            {chapterList.map((chapterId) => (
              <Chapter code={code!} chapterId={chapterId} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
