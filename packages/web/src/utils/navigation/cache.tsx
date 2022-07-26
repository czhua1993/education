/* eslint-disable @typescript-eslint/no-explicit-any */

const mergeMap = (map: Cache, src: Record<string, any>) => {
  Object.keys(src).forEach((key) => {
    map.set(key, src[key])
  })
  return map
}

export class Cache extends Map<string, any> {
  popItem<T>(key: string): T | undefined {
    const cachedValue = this.getItem(key)
    super.delete(key)
    return cachedValue
  }

  setItem<T = any>(key: string, value: T) {
    super.set(key, value)
  }

  getItem<T = any>(key: string): T | undefined {
    return super.get(key)
  }

  merge(value: Record<string, any>) {
    return mergeMap(this, value)
  }

  removeItem(key: string) {
    this.delete(key)
  }
}
