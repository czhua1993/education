import { client } from '@/graphql/client'
import { gql } from '@apollo/client'

export const getChapter = async (book: string, id: string) => {
  if (!book || !id) {
    return null
  }
  const {
    data: { chapter },
  } = await client.query({
    query: gql`
      query getChapter($book: String, $id: String) {
        chapter(book: $book, id: $id) {
          id
          text
        }
      }
    `,
    variables: { book, id },
  })
  return chapter
}
