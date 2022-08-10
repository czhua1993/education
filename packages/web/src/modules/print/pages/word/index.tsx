import { Tabs } from 'antd'
import _ from 'lodash'
import { useState } from 'react'

import { AutoFontSize } from '../../components/auto-font-size'
import { PrintPage } from '../../components/print-page'
import { list, list2 } from './data'

const { TabPane } = Tabs

export default function Poetry() {
  const [tab, setTab] = useState('1')

  return (
    <div style={{ width: '300mm' }} className="mx-auto bg-white px-5">
      <Tabs size="large" activeKey={tab} onChange={setTab}>
        <TabPane tab="奥特曼-字" key="1">
          <PrintPage
            row={12}
            col={9}
            content={list.map((text, index) => (
              <AutoFontSize key={index}>{text}</AutoFontSize>
            ))}
          />
        </TabPane>
        <TabPane tab="奥特曼-名称" key="2">
          <PrintPage
            row={8}
            col={3}
            content={list2.map((text, index) => (
              <AutoFontSize key={index}>
                {text
                  .filter((i) => i)
                  .map((t, idx) => (
                    <div key={idx}>{t}</div>
                  ))}
              </AutoFontSize>
            ))}
          />
        </TabPane>
      </Tabs>
    </div>
  )
}
