import axios from 'axios'
import { Message,MessageBox } from 'element-ui'

// 配置axios
axios.defaults.headers.post['Content-Type']='application/json';
const service =axios.create({
  baseURL:'http://192.168.20.20:8080/',
  timeout:30000,
})
service.interceptors.request.use(config => {
  // Do something before request is sent
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.error('err:::::' + error)// for debug
    Message({
      showClose: true,
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

function setBaseURL(url) {

  service.defaults.baseURL=url
}
function getBaseURL() {
  return service.defaults.baseURL
}
//在此处配置全局请求
import generalUrl from './general/url.js'
import firewallUrl from './firewall/url.js'
import intelligenceUrl from './intelligence/url.js'
const generalUrls=generalUrl.createHttpUrl(service);
const firewallUrls=firewallUrl.createHttpUrl(service);
const intelligenceUrls=intelligenceUrl.createHttpUrl(service);
export default{
  service:service,
  //base config
  setBaseURL:setBaseURL,
  getBaseURL:getBaseURL,
  baseConfig:data=>service({method:'get',baseURL:'static/config/config.json',data}),
  generalUrl:generalUrls,
  firewallUrl:firewallUrls,
  intelligenceUrl:intelligenceUrls
}

