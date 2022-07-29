import { findAlpha2 } from 'iso3166-lookup'

import { Alpha2List } from './config'

export const countryList = Alpha2List.map((key) => {
  if (key === 'XK') {
    return 'Kosovo'
  }
  const res = findAlpha2(key)
  if (typeof res === 'string') {
    return res
  }
  return res?.country || ''
})
