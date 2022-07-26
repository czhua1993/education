# navigation

路由使用 BrowserHistory

## 路由缓存参数

跳转前设置当前页缓存，返回时可以取到之前存的数据

```typescript
// 跳转前设置缓存参数
navigation.cache.setItem('params', params)
// 带缓存跳转
navigation.pushWithCache('/pathname', {}, { params })

// 获取缓存参数
navigation.cache.getItem(params)
```

如果父路由有缓存数据，子路由跳转不清除缓存（判断缓存列表中路由是否匹配）
