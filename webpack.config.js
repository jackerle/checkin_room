const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry : './dashboard/src/index.js',
    output : {
        path : path.join(__dirname,"/dashboard/dist"),
        filename : 'bundle.js'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env','@babel/preset-react'],
                    }
                }
            }
        ]
    },
    devServer:{
        host: 'jackerle.bike',
        port:80
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./dashboard/public/index.html'
        })
    ]
}