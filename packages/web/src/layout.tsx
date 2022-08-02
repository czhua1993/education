import { useState } from 'react'
import { Routes, useLocation } from 'react-router-dom'

import { ProLayout, ProSettings, SettingDrawer } from '@ant-design/pro-layout'

import { Route } from './components-x/route'
import defaultSettings from './configs/default-settings'
import { menu, routes } from './configs/routes'
import { navigation } from './utils/navigation'

export const Layout = () => {
  const [settings, setSetting] = useState<Partial<ProSettings>>(defaultSettings)
  const [pathname, setPathname] = useState('/')
  const location = useLocation()

  return (
    <div
      id="pro-layout"
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        {...settings}
        route={{ routes: menu }}
        fixedHeader
        location={{
          pathname: location.pathname,
        }}
        menuItemRender={(item: any, dom: any) => (
          <a
            onClick={() => {
              setPathname(item.path)
              navigation.push(item.path)
            }}
          >
            {dom}
          </a>
        )}
        headerTheme="dark"
        pageTitleRender={() => 'Education'}
      >
        <Routes>{routes.map((item) => Route(item))}</Routes>
      </ProLayout>
      {/* 首页才展示侧边配置栏 */}
      {pathname === '/' && (
        <SettingDrawer
          pathname={pathname}
          enableDarkTheme
          getContainer={() => document.getElementById('pro-layout')}
          settings={settings}
          onSettingChange={(changeSetting) => {
            setSetting(changeSetting)
          }}
          disableUrlParams={false}
        />
      )}
    </div>
  )
}
