const ScriptPromises: Record<string, Promise<string> | undefined> = {}

/**
 * 加载脚本
 * @param src
 * @returns
 */
export const loadScript = async (src: string, id?: string) => {
  return ScriptPromises[id || src]
    ? ScriptPromises[id || src]
    : (ScriptPromises[id || src] = new Promise((resolve, reject) => {
        const tagScript = document.createElement('script')
        tagScript.type = 'text/javascript'
        tagScript.src = src
        if (id) {
          tagScript.id = id
        }
        document.body.appendChild(tagScript)
        tagScript.onload = () => {
          resolve('')
        }
        tagScript.onerror = () => {
          reject(new Error(`load ${src} failed`))
        }
      }))
}
