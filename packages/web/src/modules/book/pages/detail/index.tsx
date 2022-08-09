import { useRequest } from 'ahooks'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { gql, useQuery } from '@apollo/client'

import { getBook } from './apis/get-book'
import { getChapter } from './apis/get-chapter'

export default function BookDetail() {
  const { code } = useParams<{ code: string }>()
  const { data: book } = useRequest(() => getBook(code!))
  const [chapterId, setChapterId] = useState('')
  const { data: chapter } = useRequest(() => getChapter(code!, chapterId), {
    refreshDeps: [chapterId],
  })

  return (
    <div
      className="flex flex-col overflow-auto"
      style={{ height: 'calc(100vh - 150px)' }}
    >
      <div>{book?.title}</div>
      <div className="flex-1 flex overflow-auto">
        <div className="flex-shrink-0 overflow-auto">
          {book?.chapterList.map((chapter: any) =>
            chapter.title ? (
              <a
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
        <div className="flex-1 overflow-auto">
          <div dangerouslySetInnerHTML={{ __html: chapter?.text || '' }} />
        </div>
      </div>
    </div>
  )
}
