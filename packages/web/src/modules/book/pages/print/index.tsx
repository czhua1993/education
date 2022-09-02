import '../detail/index.less'

import { useMount } from 'ahooks'
import ReactDOM from 'react-dom'
import { useParams, useSearchParams } from 'react-router-dom'

import { Chapter } from '../detail/components/chapter'

export default function BookPrint() {
  const { code } = useParams<{ code: string }>()
  const [searchParams] = useSearchParams()
  const chapterList: string[] = JSON.parse(
    searchParams.get('chapterList') || '[]'
  )

  useMount(() => {
    document.getElementById('root')!.style.display = 'none'
  })

  return ReactDOM.createPortal(
    <div className="chapter">
      {chapterList.map((chapterId) => (
        <Chapter code={code!} chapterId={chapterId} />
      ))}
    </div>,
    document.getElementById('print')!
  )
}
