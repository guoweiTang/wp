var fis = module.exports = require('fis3');
fis.require.prefixes.unshift('fis3-wp');
fis.cli.name = 'fis3-wp';
fis.cli.info = require('./package.json');

fis.cli.version = function() {
  var content = ['',
    '  fis3-wp v' + fis.cli.info.version,
    '  base fis3 v' + fis.cli.info.dependencies.fis3,
    ''
  ].join('\n');

  console.log(content);
};

fis.set('project.files', ['!{node_modules,bower_components}/**']);
//amd规范开发
fis.hook('amd');

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
fis.match('**/{widgets,modules,components}/**.js', {
    isMod: true
})
//html解析器
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


//发布路径
fis.match('**', {
    release: '/static/$0'
});

fis.match('*.html', {
    useCache: false,
    release: '/template/$0'
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
fis.media('prod').match('*.{html,tpl}:js', {
  optimizer: fis.plugin('uglify-js')
});
fis.media('prod').match('*.{html,tpl}:css', {
  optimizer: fis.plugin('clean-css')
});

//文件打包
fis.media('prod').match('::package', {
    postpackager: fis.plugin('loader', {
        useInlineMap: true,
        allInOne: true
    })
});
// hash
fis.media('prod').match('*.{js,less,css,png,jpg,gif}', {
    useHash: true
});


////////////////////////////生产模式（压缩、打包、md5戳、发布目录）////////////////////////////


fis.match('**{package.json,.md,fis-conf.js}', {
    release: false
});



