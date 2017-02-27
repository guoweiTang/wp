//amd规范开发
fis.hook('amd');
fis.match('**/{widgets,modules,components}/**.js', {
    isMod: true
})

//编译
fis.match('*.less', {
    parser: fis.plugin('less'),
    rExt: '.css'
});
//es6 ==> es5
fis.match('**.js', {
    parser: fis.plugin('babel-5.x', {
        blacklist: ['regenerator'],
        stage: 3
    }),
    rExt: 'js'
});
fis.match('::package', {
    postpackager: fis.plugin('loader', {
        resourceType: 'amd'
    })
});


//图片合并
fis.match('::package', {
    spriter: fis.plugin('csssprites')
});
fis.match('*.{css,less}', {
    // 给匹配到的文件分配属性 `useSprite`
    useSprite: true
});


////////////////////////////生产模式（压缩、打包、md5戳、发布目录）////////////////////////////
//文件压缩
fis.media('prod').match('*.js', {
    // fis-optimizer-uglify-js 插件进行压缩，已内置
    optimizer: fis.plugin('uglify-js')
});
fis.media('prod').match('*.css', {
    // fis-optimizer-clean-css 插件进行压缩，已内置
    optimizer: fis.plugin('clean-css')
});
fis.media('prod').match('*.png', {
    // fis-optimizer-png-compressor 插件进行压缩，已内置
    optimizer: fis.plugin('png-compressor')
});
// 压缩 内联的 js, css
fis.media('prod').match('*.{html,tpl}:{js,css}', {
  optimizer: fis.plugin('uglify-js')
});

//文件打包
fis.media('prod').match('::package', {
    postpackager: fis.plugin('loader', {
        useInlineMap: true,
        allInOne: true
    })
});
fis.media('prod').match('::package', {
  packager: fis.plugin('map', {
    'pkg/static.js': [
       'node_modules/require/node_modules/uglify-js/node_modules/source-map/build/mini-require.js',
       'common/static/tj.js',
       'common/static/header.js'
    ]
  })
})
// hash
fis.media('prod').match('*.{js,less,css,png,jpg,gif}', {
    useHash: true,
    domain: 'https://example.com'
});

//发布目录
//本地
fis.media('prod').match('**', {
  deploy: fis.plugin('local-deliver', {
      to: './output'
  })
})
//远程
// fis.match('{*.{css,less,js}, ::text}', {
//     deploy: fis.plugin('http-push', {
//         receiver: 'http://10.1.200.21:9090/upload',
//         to: '/data/static/fis3-test'
//     })
// })
////////////////////////////生产模式（压缩、打包、md5戳、发布目录）////////////////////////////


fis.match('*.js', {
    //发布到/static/js/xxx目录下
    release: '/static/js$0'
});
fis.match('*.{css,less}', {
    //发布到/static/css/xxx目录下
    release: '/static/css$0'
});
fis.match('*.{png,gif,jpg}', {
    //发布到/static/pic/xxx目录下
    release: '/static/pic/$0'
});
fis.match('**{package.json,.md,fis-conf.js}', {
    release: false
});



