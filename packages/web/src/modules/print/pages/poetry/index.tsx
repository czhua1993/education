import { Tabs } from 'antd'
import _ from 'lodash'
import { useState } from 'react'

import { AutoFontSize } from '../../components/auto-font-size'
import { PrintPage } from '../../components/print-page'
import { list } from './data'

const { TabPane } = Tabs

export default function Poetry() {
  const [tab, setTab] = useState('1')

  return (
    <div style={{ width: '300mm' }} className="mx-auto bg-white px-5">
      <Tabs size="large" activeKey={tab} onChange={setTab}>
        <TabPane tab="83首" key="1">
          <PrintPage
            paper="A5"
            row={1}
            col={1}
            noBorder
            content={list.map((text, index) => (
              <AutoFontSize
                key={index}
                lineHeight={text.length > 6 ? 1 : 1.4}
                fontSize={text.length > 6 ? 72 : 80}
              >
                {text.map((t, idx) => (
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
