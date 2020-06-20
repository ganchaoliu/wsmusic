import axios from 'axios'

export function request(config){
    const instance = axios.create({
      timeout:5000,
      withCredentials: true //关键
    })

  instance.defaults.withCredentials = true

  // instance.interceptors.request.use(config=>{
  //   //请求成功
  //   //1.比如config中的一些信息不符合服务器的要求
  //   //2.每次请求是需要显示正在加载的状态
  //   //3.登陆需要携带特殊的信息，比如需要带token
  //
  //   console.log(config);
  //   return config
  // },err=>{
  //   //请求失败
  //   console.log(err);
  // });
  // instance.interceptors.response.use(res=>{
  //   //响应成功
  //   console.log(res);
  // },err=>{
  //   //响应失败
  //   console.log(err);
  // })

  return instance(config)  //instance原本就是一个promise
}


// export function request(config){
//   return new Promise((resolve,reject)=>{
//     const instance = axios.create({
//       baseURL:'http://123.207.32.32:8000',
//       timeout:5000
//     })
//     instance(config)
//       .then(res=>{
//         resolve(res)
//       }).catch(err=>{
//       reject(err)
//     })
//   })
// }
