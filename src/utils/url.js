// 开发环境下 url  在.env.development文件里
export const BASE_URL = process.env.REACT_APP_URL
// 导出 BASE_URL 然后在用到  http://localhost:8080 的地方导入 替换就行
// console.log(BASE_URL)