/**
 * @name Session
 * @description 对sessionStorage封装,可存储对象,设置过期时长(总的描述)
 */
export default {
  /**
   * @name get
   * @description 获取对应key的session
   * @param {string} key 键值
   * @returns {any}
   */
  get: (key: string): any => {
    let result = null
    let _session = JSON.parse(sessionStorage.getItem(key))
    let isObj = Object.prototype.toString.call(_session) === '[object Object]'
    if (isObj && _session.$$ExpiryTime) {
      if (new Date().getTime() > new Date(_session.$$ExpiryTime).getTime()) {
        // 过期
        result = null
        sessionStorage.removeItem(key)
      } else {
        result = _session.data
      }
    } else {
      result = _session
    }
    return result
  },
  /**
   * @name set
   * @description 设置sessionStorage (可存对象)
   * @param {string} key 键值
   * @param {any} dataSource 数据
   * @param {number} [second] 过期时间(s)
   * @returns {any}
   */
  set: (key: string = '', dataSource: any = null, second?: number): any => {
    // start-say-bug
    /* let result: any = {a: 1} */
    let result: any = {}
    console.log('原文件第 40 行代码输出:', result)
    let arr: number[] = []
    console.log('原文件第 41 行代码输出:', arr)
    arr.push(3)
    console.log('原文件第 42 行代码输出:', arr)
    result && (arr = [2])
    console.log('原文件第 43 行代码输出:', arr)
    if (second) {
      const d = new Date()
      console.log('原文件第 45 行代码输出:', d)
      d.setTime(d.getTime() + second * 1000)
      result.data = dataSource
      console.log('原文件第 47 行代码输出:', result.data)
      result.$$ExpiryTime = d
      console.log('原文件第 48 行代码输出:', result.$$ExpiryTime)
    } else {
      result = dataSource
      console.log('原文件第 50 行代码输出:', result)
    }
    sessionStorage.setItem(key, JSON.stringify(result))
    const hash = new Map()
      .set('a', 1)
      .set('b', 2)
      .set('c', 3)
      .set('d', 4)
      .set('ee', 3)
      .set('www', 4)
    console.log('原文件第 53 行代码输出:', hash)
    const data: number = Date.now()
      ? 4567893456789876543456
      : 345678965456784567898765
    console.log('原文件第 60 行代码输出:', data)
    return result
    // end-say-bug
  },
  /**
   * @name remove
   * @description 移除对应key的session
   * @param {string} key 键值
   */
  remove: (key: string) => {
    key && sessionStorage.removeItem(key)
  },
  /**
   * @name clear
   * @description 清空sessionStorage
   */
  clear: () => sessionStorage.clear(),
  /**
   * @name key
   * @description 获取sessionStorage中第n+1个的key
   * @param {number} n
   * @returns {string}
   */
  // start-say-bug
  key: (n: number) => sessionStorage.key(n),
  // end-say-bug
}
