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
        <TabPane tab="省" key="1">
          <PrintPage
            row={9}
            col={4}
            content={list.map((text, index) => (
              <AutoFontSize key={index} fontSize={72}>
                {text[0]}
              </AutoFontSize>
            ))}
          />
        </TabPane>
        <TabPane tab="省会" key="2">
          <PrintPage
            row={9}
            col={4}
            content={list.map((text, index) => (
              <AutoFontSize key={index} fontSize={72}>
                {text[1]}
                <br />
                {text[2]}
              </AutoFontSize>
            ))}
          />
        </TabPane>
      </Tabs>
    </div>
  )
}
