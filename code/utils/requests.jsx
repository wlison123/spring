//对于axios进行二次封装
import axios from "axios"

//底下的代码也是创建axios实例
let requests = axios.create({
  //基础路径
  // baseURL: "/",
  //请求不能超过5S
  timeout: 5000
})

//请求拦截器----在项目中发请求（请求没有发出去）可以做一些事情
requests.interceptors.request.use((config) => {
  return config
})

//响应拦截器----当服务器手动请求之后，做出响应（相应成功）会执行的
requests.interceptors.response.use(
  (res) => {
    if (res.status >= 200 && res.status <= 300) {
      return res.data
    }
    return Promise.reject(res)
  },
  (err) => {
    console.log('error',err);
  }
)
//最终需要对外暴露（不对外暴露外面模块没办法使用）
//这里的代码是暴露一个axios实例
export default requests
