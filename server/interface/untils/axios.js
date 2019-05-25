import axios from 'axios'

const instance = axios.create({
    baseURL: `http://${process.env.HOST||'localhost'}:${process.env.PORT||3000}`, // 获取环境变量主机
    timeout: 2000,
    headers: {
        
    }
})

export default instance