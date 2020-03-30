import axios from "axios";
// 请求拦截器
axios.interceptors.request.use(function (config) {
    // console.log("请求拦截器",config)
    // config.url=`/lyric/music/api/lyric?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&songmid=001Qu4I30eVFYb&platform=yqq&hostUin=0&needNewCode=0&categoryId=10000000&pcachetime=1581573879680&name=wql&age=24`;
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(function (response) {
    // console.log("响应拦截器", response)
    return response.data;// 这里return出去的是 .then() 中的数据
}, function (error) {
    return Promise.reject(error);
});

export default axios;