import './index.less'

import { useMemoizedFn, useRequest } from 'ahooks'
import { Button, Checkbox } from 'antd'
import { useRef, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'

import { getBook } from '../../apis/get-book'
import { getChapterList } from '../../apis/get-chapter-list'
import { Chapter } from './components/chapter'
import { saveAsDocx } from './save-as-docx'

export default function BookDetail() {
  const { name } = useParams<{ name: string }>()
  const { data: book } = useRequest(() => getBook(name!))
  const [chapterList, setChapterList] = useState<string[]>([])
  const ref = useRef<HTMLDivElement>(null)

  const handlePrint = useReactToPrint({
    content: () => ref.current!,
  })

  const download = useMemoizedFn(async () => {
    const data = await getChapterList(name!, chapterList)
    console.log(data)
    saveAsDocx(data!)
  })

  return (
    <div
      className="flex flex-col overflow-auto bg-white p-5 py-3"
      style={{ height: 'calc(100vh - 150px)' }}
    >
      <div className="text-center text-2xl pb-2 font-bold border-0 border-b border-solid border-b-gray-100">
        {book?.name}
      </div>
      <div className="flex-1 flex overflow-auto">
        <div className="flex-shrink-0 overflow-auto py-2 border-0 border-r border-solid border-r-gray-100">
          {book?.chapterList.map((chapter) => (
            <div key={chapter.id}>
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
                <a key={chapter.id}>{chapter.title || chapter.id}</a>
              </Checkbox>
            </div>
          ))}
        </div>
        <div className="flex-1 overflow-auto px-5 pt-5 relative">
          <div className="absolute right-4 top-4">
            <Button type="primary" onClick={handlePrint}>
              打印
            </Button>
            <CopyToClipboard
              text={`${window.location.protocol}//${
                window.location.host
              }/book/print/${name}?chapterList=${JSON.stringify(chapterList)}`}
            >
              <Button className="ml-2">复制地址</Button>
            </CopyToClipboard>
            <Button type="primary" className="ml-2" onClick={download}>
              下载
            </Button>
          </div>
          <div ref={ref} className="chapter">
            {chapterList.map((chapterId) => (
              <Chapter code={name!} chapterId={chapterId} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
