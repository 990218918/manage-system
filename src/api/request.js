import axios from "axios";
import config from "../config";
import { ElMessage } from 'element-plus';
// import { de } from "element-plus/es/locale";

const NETWORK_ERROR = '网络请求异常，请稍后重试！'

// 创建一个axios实例对象
const service = axios.create({
    baseURL: config.baseApi
})

service.interceptors.request.use((req) => {
    return req
})

service.interceptors.response.use((res) => {
    const { code, data, msg } = res.data
    if (code == 200) {
        return data
    } else {
        ElMessage.error(msg || NETWORK_ERROR)
        return Promise.reject(msg || NETWORK_ERROR)
    }
})

function request(options) {
    options.method = options.method || 'get'
    if (options.method.toLowerCase() == 'get') {
        options.params = options.data
    }

    // 对mock的处理 
    let isMock = config.mock
    if (typeof options.mock !== 'undefined') {
        isMock = options.mock
    }

    if (config.env == 'prod') {
        service.defaults.baseURL = config.baseApi
    } else {
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
    }
    return service(options)
}

export default request