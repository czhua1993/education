import { PrintPage } from '../../components/print-page'
import zh from '../country/zh.json'
import { Flags } from './flags'

const countries = Object.keys(zh.countries)

export default function PrintCountry() {
  return (
    <PrintPage
      content={countries.map((key, index) => {
        const Flag = Flags[key]
        return Flag ? (
          <Flag key={index} style={{ height: '100%', display: 'block' }} />
        ) : null
      })}
    />
  )
}
