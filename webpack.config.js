const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const env = require('./env.json');

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
        host: env.HOST,
        port:80,
        historyApiFallback: true,
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./dashboard/public/index.html'
        })
    ]
}