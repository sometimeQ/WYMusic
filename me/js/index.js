$(function () {
    // 加载公共头部抽取的内容
    // ../表示源文件所在目录的上一级目录，../../表示源文件所在目录的上上级目录，以此类推
    $('.header').load('./../common/header.html', function () {
        // 创建script元素
        let script = document.createElement('script');
        script.src = './../common/js/header.js';
        document.body.append(script);
    });

    // 底部tabbar 切换
    // 定义数组保存需要切换的tabbar类名
    // 利用jqury自带的函数加载js代码，创建好了后，直接加入到代码中
    $('.footer').load('./../common/footer.html', function () {
        console.log('看看是否加载了公共底部的数据');
        // 创建需要的js代码
        let scripts = document.createElement('script');
        scripts.src = './../common/js/footer.js';
        document.body.append(scripts);
    });
});