import { client } from '@/graphql/client'
import { gql } from '@apollo/client'

export const getPoetryList = async (
  params: {
    current: number
    pageSize: number
  },
  search: Record<string, string> = {}
) => {
  const { current, pageSize } = params
  const {
    data: { poetries },
  } = await client.query({
    query: gql`
      query GetPoetryList($offset: Int, $limit: Int, $search: PoetriesSearch) {
        poetries(offset: $offset, limit: $limit, search: $search) {
          count
          rows {
            id
            poetryId
            title
            author
            paragraphs
            tags
            dynasty
          }
        }
      }
    `,
    variables: { offset: (current - 1) * pageSize, limit: pageSize, search },
  })
  return poetries
}
