import { client } from '@/graphql/client'
import { gql } from '@apollo/client'

export const getChapter = async (code: string, id: string) => {
  if (!code || !id) {
    return null
  }
  const {
    data: { chapter },
  } = await client.query({
    query: gql`
      query getChapter($code: String, $id: String) {
        chapter(code: $code, id: $id) {
          id
          text
        }
      }
    `,
    variables: { code, id },
  })
  return chapter
}
