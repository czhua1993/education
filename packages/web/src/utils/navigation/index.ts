/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createBrowserHistory, BrowserHistory, To } from 'history'
import queryString from 'query-string'

import { Cache } from './cache'

/** 路径对应缓存 */
interface PathCache {
  pathname: string
  cache: Cache
}

class Navigation {
  /** https://github.com/remix-run/history/blob/main/docs/api-reference.md */
  history: BrowserHistory
  /** 缓存堆栈 */
  stack = [] as PathCache[]
  nextPathname = ''
  cache = new Cache()

  constructor() {
    this.history = createBrowserHistory()
    this.history.listen(({ action, location }) => {
      if (action === Action.Push) {
        // 入栈
        const latest = this.stack[this.stack.length - 1]
        if (!latest) return
        // 当前页不需要缓存，清除所有
        if (
          location.pathname !== this.nextPathname &&
          // 如果是子路由，默认保存
          !this.stack.some(({ pathname }) =>
            location.pathname.includes(pathname)
          )
        ) {
          this.stack = []
          this.cache.clear()
        }
      } else if (action === Action.Pop) {
        // 出栈
        const index = this.stack
          .reverse()
          .findIndex(({ pathname }) => pathname === location.pathname)
        const lastIndex = index > -1 ? this.stack.length - 1 - index : index
        if (lastIndex > -1) {
          this.stack = this.stack.slice(0, lastIndex + 1)
          this.cache = this.stack[this.stack.length - 1].cache || new Cache()
        }
      }
    })
  }

  pushWithCache(to: string, state?: any, cache?: Record<string, any>) {
    const { pathname } = this.history.location
    this.nextPathname = queryString.parseUrl(to).url
    // 当前路由缓存入栈
    this.stack.push({ pathname, cache: this.cache.merge(cache || {}) })
    // 新创建路由缓存
    this.cache = new Cache()
    // 路由跳转
    this.history.push(to, state)
  }

  push(to: To, state?: any) {
    this.history.push(to, state)
  }
  replace(to: To, state?: any) {
    this.history.replace(to, state)
  }
  go(delta: number) {
    this.history.go(delta)
  }
  back() {
    this.history.back()
  }
  forward() {
    this.history.forward()
  }
}

export const navigation = new Navigation()
