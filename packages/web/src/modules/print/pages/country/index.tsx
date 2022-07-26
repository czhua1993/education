import React from 'react'

import { AutoFontSize } from '../../components/auto-font-size'
import { PrintPage } from '../../components/print-page'
import zh from './zh.json'

const countries = Object.values(zh.countries)

export default function PrintCountry() {
  return (
    <PrintPage
      content={countries.map((text) => (
        <AutoFontSize>{text}</AutoFontSize>
      ))}
    />
  )
}
