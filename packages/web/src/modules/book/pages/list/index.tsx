import { useRequest } from 'ahooks'
import { Link } from 'react-router-dom'

import { getBooks } from '../../apis/get-books'

export default function BookList() {
  const { data: books } = useRequest(getBooks)

  return (
    <div>
      {books?.map((book) => (
        <Link
          key={book.name}
          to={`/book/list/${book.name}`}
          className="text-xl m-10"
        >
          {book.name}
        </Link>
      ))}
    </div>
  )
}
