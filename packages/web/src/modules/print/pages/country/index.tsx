import { Tabs } from 'antd'
import _ from 'lodash'
import { useState } from 'react'

import { AutoFontSize } from '../../components/auto-font-size'
import { PrintPage } from '../../components/print-page'
import { Flags } from './flags'
import zh from './zh.json'

const { TabPane } = Tabs

const codeList = Object.keys(zh.countries)
const textList = Object.values(zh.countries)
const list = _.flatMap(textList.map((key, index) => [key, codeList[index]]))

export default function PrintCountry() {
  const [tab, setTab] = useState('1')
  return (
    <div style={{ width: '300mm' }} className="mx-auto">
      <Tabs size="large" activeKey={tab} onChange={setTab}>
        <TabPane tab="国家" key="1">
          <PrintPage
            content={textList.map((text, index) => (
              <AutoFontSize key={index}>{text}</AutoFontSize>
            ))}
          />
        </TabPane>
        <TabPane tab="国旗" key="2">
          <PrintPage
            content={codeList.map((key, index) => {
              const Flag = Flags[key]
              return Flag ? (
                <Flag
                  key={index}
                  style={{ height: '100%', display: 'block' }}
                />
              ) : null
            })}
          />
        </TabPane>
        <TabPane tab="国家+国旗" key="3">
          <PrintPage
            content={list.map((key, index) => {
              const Flag = Flags[key]
              return Flag ? (
                <Flag
                  key={index}
                  style={{ height: '100%', display: 'block' }}
                />
              ) : (
                <AutoFontSize key={index}>{key}</AutoFontSize>
              )
            })}
          />
        </TabPane>
      </Tabs>
    </div>
  )
}
