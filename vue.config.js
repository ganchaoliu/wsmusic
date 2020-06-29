module.exports= {
    configureWebpack: {
        resolve: {
            alias: {  //配置文件夹别名
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            }
        }
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000/',
                // target: 'http://musicapi.leanapp.cn/',
                pathRewrite: {'^/api': ''},
                changeOrigin: true,     // target是域名的话，需要这个参数，
                secure: false,          // 设置支持https协议的代理
            }
        }

    }
}