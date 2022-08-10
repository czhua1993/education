import { Link } from 'react-router-dom'

const bookList = [
  {
    code: 'shuke-beita',
    name: '舒克和贝塔',
  },
  {
    code: 'five-thousand-years',
    name: '上下五千年',
  },
]

export default function BookList() {
  return (
    <div>
      {bookList.map((book) => (
        <Link
          key={book.name}
          to={`/book/list/${book.code}`}
          className="text-xl m-10"
        >
          {book.name}
        </Link>
      ))}
    </div>
  )
}
