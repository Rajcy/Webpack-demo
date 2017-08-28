//声明引用htmlWebpack的插件
const htmlWebpackPlugin = require('html-webpack-plugin')


//若想使用Webpack命令行中的指令运行webpack时
//进入package.json文件修改npm的script脚本


//entry：string 单独入口 | object 多个入口多个文件 | array 多个入口合并在一个文件中
//output：
// path：打包后的地址
// filename：文件名
//   //在多个入口时需要利用占位符生成多个打包文件
//   [name]:entry中键名
//   [hash]:这次打包的hash值
//   [chunkhash]:每个文件的hash值 (相当于文件的版本号)

//打包方式1
//当需要打包的js文件为单一文件时
// var path = require("path")
// module.exports = {
// 	entry :'./src/script/main.js',
// 	output :{
// 		path:path.resolve(__dirname,'disk/js'),
// 		filename:'bundle.js'
// 	}
// }

//打包方式2 entry参数为数组，数组内为多个入口路径
//当需要打包两个不互相依赖的，且互相平行的JS文件，却想打包到一起时
// var path = require("path")
// module.exports = {
// 	entry :['./src/script/main.js','./src/script/a.js'],
// 	output :{
// 		path:path.resolve(__dirname,'disk/js'),
// 		filename:'bundle.js'
// 	}
// }

//打包方式3 entry参数为object ，object的格式为键值对形式
//当大型的多页面程序中，不同页面的chunk块需要分别打包，
//var path = require('path');
// module.exports = {
// 	entry: {
// 		main: './src/script/main.js',
// 		a: './src/script/a.js'
// 	},
// 	output: {
// 		path: __dirname + '/disk',           //所有输出都将在disk文件夹下
// 		filename: 'js/[name]-[chunkhash].js',//‘js/’为入口打包输出时所用的相对路径
// 	    publicPath: 'http://cdn.com/'        //提供发布的站位服务，上线时，在html文件中引用的这个js文件的路径，就会被替换为绝对路径以http://cdn.com/开头
// 	},
// 	plugins:[
// 		new htmlWebpackPlugin({             //打包成功后生成新的html
// 			template:'index.html',          //以根目录下的index.html为模板
// 			//filename:'index-[hash].html', //此处可自定义打包后新生成的文件名，此处的index-[hash]为版本号
//             filename:'index.html',
// 			//inject:'head',                 //inject的参数有head与body,false，用于指定脚本标签时放在head里还是放在body里
// 			inject:false,
// 			title:"Webpack is 6666!!!",      //改变模板中的title并更新，需要在index模板中有相对应操作
// 			date: ""+new Date(),             //提供一个新Date时间给摸版
// 			minify: {                        //对发布的html代码进行压缩
//                removeComments: true,      //除去注释
//                collapseWhitespace: true   //出去空格
// 			}
// 		})
// 	]
// }


//处理多页面时的情况
// module.exports = {
// 	entry: {
// 		main: './src/script/main.js',
// 		a: './src/script/a.js',
// 		b: './src/script/b.js',
// 		c: './src/script/c.js'
// 	},
// 	output: {
// 		path: __dirname + '/disk',            //所有输出都将在disk文件夹下
// 		filename: 'js/[name]-[chunkhash].js', //‘js/’为入口打包输出时所用的相对路径
// 	    publicPath: 'http://cdn.com/'         //提供发布的站位服务，上线时，在html文件中引用的这个js文件的路径，就会被替换为绝对路径以http://cdn.com/开头
// 	},
// 	plugins: [
// 	    new htmlWebpackPlugin({               //打包成功后生成新的html
// 	        template: 'template.html',           //以根目录下的index.html为模板
// 	        //filename:'index-[hash].html',   //此处可自定义打包后新生成的文件名，此处的index-[hash]为版本号
// 	        filename: 'a.html',
// 	        inject:'head',                    //inject的参数有head与body,false，用于指定脚本标签时放在head里还是放在body里
// 	        title: "A is 6666!!!",            //改变模板中的title并更新，需要在index模板中有相对应操作
//  			chunks:['main','a']               //允许该页只加载对其有用的指定chunks，即html里引入的chunks为哪些script

// 	    }),
// 	    new htmlWebpackPlugin({               //打包成功后生成新的html
// 	        template: 'template.html',           //以根目录下的index.html为模板
// 	        //filename:'index-[hash].html',   //此处可自定义打包后新生成的文件名，此处的index-[hash]为版本号
// 	        filename: 'b.html',
// 	        inject:'head',                    //inject的参数有head与body,false，用于指定脚本标签时放在head里还是放在body里
// 	        title: "B is 6666!!!",             //改变模板中的title并更新，需要在index模板中有相对应操作
//  			chunks:['b']                     //允许该页只加载对其有用的指定chunks，即html里引入的chunks为哪些script

// 	    }), new htmlWebpackPlugin({           //打包成功后生成新的html
// 	        template: 'template.html',           //以根目录下的index.html为模板
// 	        //filename:'index-[hash].html',   //此处可自定义打包后新生成的文件名，此处的index-[hash]为版本号
// 	        filename: 'c.html',
// 	        inject:'head',                     //inject的参数有head与body,false，用于指定脚本标签时放在head里还是放在body里
// 	        title: "C is 6666!!!",             //改变模板中的title并更新，需要在index模板中有相对应操作
//  			excludeChunks:['a','b']            //除了a,b之”外“的chunks都加载

// 	    })
// 	]
// }


//处理多页面的情况
//当main为公用js，a,b,c三个分别为独立js时    为了强化加载速度
//可以把main.js打包且用inline导入的方式放进abc三个页中，直接输出script而不是引用
module.exports = {
	entry: {
		main: './src/script/main.js',
		a: './src/script/a.js',
		b: './src/script/b.js',
		c: './src/script/c.js'
	},
	output: {
		path: __dirname + '/disk',            //所有输出都将在disk文件夹下
		filename: 'js/[name]-[chunkhash].js', //‘js/’为入口打包输出时所用的相对路径
	    publicPath: 'http://cdn.com/'         //提供发布的站位服务，上线时，在html文件中引用的这个js文件的路径，就会被替换为绝对路径以http://cdn.com/开头
	},
	plugins: [
	    new htmlWebpackPlugin({               //打包成功后生成新的html
	        template: 'template.html',           //以根目录下的index.html为模板
	        //filename:'index-[hash].html',   //此处可自定义打包后新生成的文件名，此处的index-[hash]为版本号
	        filename: 'a.html',
	        inject: false,                    //inject的参数有head与body,false，用于指定脚本标签时放在head里还是放在body里
	        title: "A is 6666!!!",            //改变模板中的title并更新，需要在index模板中有相对应操作
 			excludeChunks:['b','c']           //除了c,c之”外“的chunks都加载

	    }),
	    new htmlWebpackPlugin({               //打包成功后生成新的html
	        template: 'template.html',           //以根目录下的index.html为模板
	        //filename:'index-[hash].html',   //此处可自定义打包后新生成的文件名，此处的index-[hash]为版本号
	        filename: 'b.html',
	        inject:false,                     //inject的参数有head与body,false，用于指定脚本标签时放在head里还是放在body里
	        title: "B is 6666!!!",             //改变模板中的title并更新，需要在index模板中有相对应操作
 			excludeChunks:['a','c']            //除了a,c之”外“的chunks都加载

	    }), new htmlWebpackPlugin({           //打包成功后生成新的html
	        template: 'template.html',           //以根目录下的index.html为模板
	        //filename:'index-[hash].html',   //此处可自定义打包后新生成的文件名，此处的index-[hash]为版本号
	        filename: 'c.html',
	        inject:false,                     //inject的参数有head与body,false，用于指定脚本标签时放在head里还是放在body里
	        title: "C is 6666!!!",             //改变模板中的title并更新，需要在index模板中有相对应操作
 			excludeChunks:['a','b']            //除了a,b之”外“的chunks都加载

	    })
	]
}