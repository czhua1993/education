import { useMount } from 'ahooks'

import { navigation } from '@/utils/navigation'

export default function Index() {
  useMount(() => {
    navigation.push('/book/list')
  })

  return null
}
