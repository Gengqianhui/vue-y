const path=require("path");
function resolve(dir){
    return path.join(__dirname,dir);
}
module.exports={
    devServer:{
        /*
            默认端口8080，在@vue----cli-service----lib----commands----serve.js中
            const defaults = {
                host: '0.0.0.0',
                port: 8080,
                https: false
            }
        */
        port:3001,
        proxy:{
            "/hotMusicList":{
                target:"http://ustbhuangyi.com",// 目标服务器路径
                changeOrigin:true,// 是否允许改变源，默认为true
                pathRewrite:{// 重写路径
                    "^/hotMusicList":""
                }
            },
            "/banner":{
                target:"http://ustbhuangyi.com",// 目标服务器路径
                changeOrigin:true,// 是否允许改变源，默认为true
                pathRewrite:{// 重写路径
                    "^/banner":""
                }
            },
            "/vkey":{
                target:"http://ustbhuangyi.com",// 目标服务器路径
                changeOrigin:true,// 是否允许改变源，默认为true
                pathRewrite:{// 重写路径
                    "^/vkey":""
                }
            },
            "/lyric":{
                target:"http://ustbhuangyi.com",// 目标服务器路径
                changeOrigin:true,// 是否允许改变源，默认为true
                pathRewrite:{// 重写路径
                    "^/lyric":""
                }
            }
        }
    },
    chainWebpack:(config)=>{
        config.resolve.alias
        .set("@",path.join(__dirname,"./src"))
        .set("components",path.join(__dirname,"./src/components"))
        .set("pages",path.join(__dirname,"./src/pages"))
        .set("style",resolve("./src/style"))
        .set("font",resolve("./src/font"))
        .set("utils",resolve("./src/utils"))
    }
};