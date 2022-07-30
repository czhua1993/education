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
    <div style={{ width: '300mm' }} className="mx-auto">
      <Tabs size="large" activeKey={tab} onChange={setTab}>
        <TabPane tab="奥特曼" key="1">
          <PrintPage
            row={12}
            col={9}
            content={list.map((text, index) => (
              <AutoFontSize key={index}>{text}</AutoFontSize>
            ))}
          />
        </TabPane>
      </Tabs>
    </div>
  )
}
