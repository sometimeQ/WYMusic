$(function () {
    // // 公共头部处理
    // // 点击搜索框获取焦点
    // $('.header-center-box>input').focus(function () {
    //     // 添加类名
    //     $('.header').addClass('active');
    //     // 显示该搜索控制器的整个界面
    //     $('.header-container').show();
    //     // 处理搜索的历史记录，展示信息
    //     let historyArray = getHistory();
    //     // 获取之前清理之前的记录
    //     $('.history-item>li').remove();
    //     if (historyArray.length === 0) {
    //         $('.search-history').hide();
    //     } else {
    //         $('.search-history').show();
    //         historyArray.forEach(function (item) {
    //             let oLi = $("<li>"+item+"</li>");
    //             $('.history-item').append(oLi);
    //         });
    //     }
    //     searchScroll.refresh();
    // });
    //
    // // 监听输入框失去的焦点
    // $('.header-center-box>input').blur(function () {
    //     if (this.value.length === 0) {
    //         return;
    //     }
    //     // 存入到历史记录
    //     let historyArray =  getHistory();
    //     // 插入到数组的头部
    //     historyArray.unshift(this.value);
    //     // 清空输入的文字信息
    //     this.value = "";
    //     // 存入输入框输入的文字, 数组
    //     localStorage.setItem('history', JSON.stringify(historyArray));
    // });
    //
    // function getHistory() {
    //     // 从本地取出
    //     let historyArray = localStorage.getItem('history');
    //     if (!historyArray) {
    //         historyArray = [];
    //     } else {
    //         // 将字符串转化json对象
    //         historyArray = JSON.parse(historyArray);
    //     }
    //     return historyArray;
    // }
    //
    // // 点击取消
    // $('.header-cancel>a').click(function () {
    //     // 移除
    //     $('.header').removeClass('active');
    //     // 隐藏该搜索界面
    //     $('.header-container').hide();
    //     // 主动触发原生的展示, 触发底部的 这个方法
    //     // $('.header-center-box>input')[0].oninput = throttle(function () {
    //     $(".header-center-box>input")[0].oninput();
    // });
    //
    // // 切换朋友顶部按钮去
    // $('.header-switch>span').click(function () {
    //     // 排他
    //     $(this).addClass('active').siblings().removeClass('active');
    //     // 改变背景动画
    //     console.log(this.offsetLeft);
    //     $(".header-switch>i").animate({left: this.offsetLeft}, 100);
    // });
    //
    // // 点击搜索界面关闭广告
    // $('.search-ad>span').click(function () {
    //     $('.search-ad').remove();
    // });
    //
    // // 删除按钮的点击事件
    // $('.history-top>img').click(function () {
    //     console.log('看看是否点击啦');
    //     // 清空历史记录
    //     localStorage.removeItem('history');
    //     // 隐藏该节点
    //     $('.search-history').hide();
    // });
    //
    // // 处理热搜列表数据
    // HomeApis.getHomeHotDetail().then(function (data) {
    //     // 创建需要的列表数据
    //     let html = template('hotDetail', data);
    //     $('.hot-item').append(html);
    //     // 刷新滚动
    //     searchScroll.refresh();
    // }).catch(function (err) {
    //
    // });
    //
    // // 搜索列表的滚动
    // let searchScroll = new IScroll('.header-container', {
    //     mouseWheel: false,
    //     scrollbars: false,
    // });
    //
    // // 处理搜索列表，处理函数节流
    // $('.header-center-box>input')[0].oninput = throttle(function () {
    //     // 拿到当前显示的内容进行判断
    //     if (this.value.length === 0) {
    //         // console.log('这里进行操作');
    //         $('.search-ad').show();
    //         $('.search-hot').show();
    //         $('.search-list').hide();
    //     }else{
    //         // console.log(this.value);
    //         // 隐藏
    //         $('.search-ad').hide();
    //         $('.search-history').hide();
    //         $('.search-hot').hide();
    //         $('.search-list').show();
    //
    //         // 处理搜索关键字列表
    //         HomeApis.getHomeSearchSuggest(this.value).then(function (data) {
    //             // 关键字
    //             // console.log(data);
    //             // 移除之前的，免得之前的数据还在
    //             $('.searchCurrent-bottom>ul>li').remove();
    //             // 遍历
    //             data.result.allMatch.forEach(function (obj) {
    //                 // 拼接模板
    //                 let oLi = $(`<li>
    //                          <img src="images/topbar-it666-search.png" alt="">
    //                         <p>${obj.keyword}</p>
    //                     </li>`);
    //                 $('.searchCurrent-bottom>ul').append(oLi);
    //             });
    //             searchScroll.refresh();
    //         }).catch(function (err) {
    //         });
    //     }
    //
    //     $('.searchCurrent-top').text(`搜索${this.value}`);
    //     searchScroll.refresh();
    // });

    // 加载公共头部抽取的内容
    $('.header').load('./common/header.html', function () {
        console.log('看看是否加载了公共头部的数据');
        // 创建script元素
        let script = document.createElement('script');
        script.src = './common/js/header.js';
        document.body.append(script);
    });

    // 底部tabbar 切换
    // 定义数组保存需要切换的tabbar类名
    // 利用jqury自带的函数加载js代码，创建好了后，直接加入到代码中
    $('.footer').load('./common/footer.html', function () {
        // 创建需要的js代码
        let scripts = document.createElement('script');
        scripts.src = './common/js/footer.js';
        document.body.append(scripts);
    });


    // let pageArray = ['home', 'video', 'me', 'friend', 'account'];
    // $('.footer>ul>li').click(function () {
    //     // 排他
    //     $(this).addClass('active').siblings().removeClass('active');
    //     // 找到底部的img, 找到属性，取出图片路径
    //     let url = $(this).find('img').attr('src');
    //     // 替换选中的图片
    //     url = url.replace('normal', 'selected');
    //     $(this).find('img').attr('src', url);
    //     // 排他图片
    //     $(this).siblings().find('img').forEach(function (oImage) {
    //         // 替换成normal情况下的图片
    //         oImage.src = oImage.src.replace('selected', 'normal');
    //     });
    //     // 关联头部,点击切换的索引类名
    //     let className = pageArray[$(this).index()];
    //     console.log(className);
    //     // 移除之前添加的所有的类名空格 + 需要添加的类名
    //     $('.header').removeClass().addClass('header ' + className);
    // });

    // 下拉刷新动画
    // 1.获取svg动画的长度,先拿到原生的
    let length = $('#refreshLogo')[0].getTotalLength();
    // 2.默认先隐藏路径
    $('#refreshLogo').css({
        'stroke-dasharray' : length
    });
    $('#refreshLogo').css({
        'stroke-dashoffset' : length
    });

    // 3.创建Scroll作用于滚动区域的外层,参考示例代码
    // 需要设置父元素，子元素的宽度，高度
    let myScroll = new IScroll('.main', {
        mouseWheel: false,
        scrollbars: false,
        probeType: 3,
    });

    // let myScroll = function () {
    //     intervalTime = setInterval(function () {
    //         let resultContentH = $(".main").height();
    //         if (resultContentH > 0) {  //判断数据加载完成的条件
    //             console.log("此时showResult的高度是:" + resultContentH);
    //             $("#showResult").height(resultContentH)
    //             setTimeout(function () {
    //                 clearInterval(intervalTime);
    //                 myScroll = new IScroll('main');
    //             }, 100)
    //         }
    //     }, 10);
    // }


    // 4.监听滚动
    // 拿到当前图标的高度
    let logoHeight = $('.pull-down').height();
    // 是否下拉绘制完成
    let isPullDown = false;
    // 解决重复刷新请求问题，是否刷新完成
    let isRefresh = false;
    // 获取底部的上拉加载的图标的高度
    let bottomHeight = $('.pull-up').height();
    // 获取底部的最大高度
    let maxOffsetY = myScroll.maxScrollY - bottomHeight;
    // 是否上拉加载完成
    let isPullUp = false;

    myScroll.on('scroll', function () {
        // 完全能看见才给绘制
        if (this.y >= logoHeight){
            // 如果小于SVG的长度才给绘制, 加快绘制速度 * 3
            if ((this.y - logoHeight) * 3 <= length) {
                // console.log("开始执行SVG动画");
                // 修改官方的一个代码，回弹效果
                // console.log(this.y);
                $('#refreshLogo').css({
                    'stroke-dashoffset': length - (this.y - logoHeight) * 3
                });
            } else {
                // console.log("已经画完了");
                console.log(this.y);
                // 设置画完后停止的地方
                this.minScrollY = 213;
                isPullDown = true;
            }

        } else if (this.y <= maxOffsetY) {
            // 显示上拉加载更多,改变文字
            $('.pull-up>p>span').html('松手加载更多');
            // 设置悬停
            this.maxScrollY = maxOffsetY;
            isPullUp = true;
        }
    });

    // 停止滚动
    myScroll.on('scrollEnd', function () {
        // 刷新加载数据
        // console.log('是否停止滚动');
        if (!isRefresh && isPullDown) {
            myScroll.refresh();
            isRefresh = true;
            refreshDown();
        } else if (!isRefresh && isPullUp) {
            myScroll.refresh();
            // 改变文字
            $('.pull-up>p>span').html('加载中...');
            isRefresh = true;
            // 加载上拉更多数据
            refreshUp();
        }
    });

    function refreshDown() {
        setInterval(function () {
            isRefresh = false;
            isPullDown = false;
            // 数据刷新完毕
            myScroll.minScrollY = 0;
            // 滚动到顶部
            myScroll.scrollTo(0,0);
            // 清零
            $('#refreshLogo').css({
                'stroke-dashoffset' : length
            });

            myScroll.refresh();
        }, 3000)
    }

    function refreshUp() {
        setInterval(function () {
            isRefresh = false;
            isPullUp = false;
            // 恢复
            myScroll.maxScrollY = maxOffsetY + bottomHeight;
            // 滚动到底部
            myScroll.scrollTo(0, myScroll.maxScrollY);
            myScroll.refresh();
        }, 3000);
    }


    // 创建首页的Swiper,根据文档来, 这里暂时还拿不到值
    /*
    var mySwiper = new Swiper ('.swiper-container', {
        // 循环模式选项
        loop: true,
        // 设置自动切换时间
        autoplay: {
            delay: 1000,
        },

        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
            // 自定义分页器
            bulletClass : 'my-bullet', // 需设置.my-bullet样式
            bulletActiveClass: 'my-bullet-active', // 激活样式
        },

        // 如果内容是从服务器获取的, 请加上这三个配置
        observer: true,
        observeParents: true,
        observeSlideChildren: true
    })
     */

    // 调用首页banner数据接口,优化banner数据
    HomeApis.getHomeBanner().then(function (data) {
        // console.log(data);
        // 传递给swiper模板
        let html = template('bannerSlide', data);
        // console.log(html);
        // 追加到swiper当中
        $('.swiper-wrapper').html(html);

        // banaer数据
        new Swiper ('.swiper-container', {
            // 循环模式选项
            loop: true,
            // 设置自动切换时间
            autoplay: {
                delay: 1000,
                // 用户操作swiper之后，是否禁止autoplay。默认为true：停止。
                // 如果设置为false，用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay。
                disableOnInteraction: false,
            },

            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
                // 自定义分页器
                bulletClass : 'my-bullet', // 需设置.my-bullet样式
                bulletActiveClass: 'my-bullet-active', // 激活样式
            },

            // 如果内容是从服务器获取的, 请加上这三个配置
            observer: true,
            observeParents: true,
            observeSlideChildren: true
        });

        // 刷新下iscrollview，不然滚动不了
        myScroll.refresh();
    }).catch(function (error) {

    });

    // 首页的日历获取设置i里面的内容
    $('.nav i').html(new Date().getDate());

    // 首页推荐歌单接口数据
    HomeApis.getHomeRecommend().then(function (data) {
        // console.log(data);
        // 改造整合数据
        data.title = '推荐歌单';
        data.subTitle = '歌单广场';
        data.result.forEach(function (obj) {
            obj.width = 216/100;
            obj.playCount = formartNum(obj.playCount);
        });
        // console.log(data);
        // console.log('报错了');
        // 使用模板
        let html = template('category', data);
        $('.recommend').html(html);
        // 设置推荐歌单字体2行显示
        $('.recommend .category-title').forEach(function (element) {
            $clamp(element, {clamp: 2});

        });
        // 刷新下iscrollview，不然滚动不了
        myScroll.refresh();

    }).catch(function (error) {

    });

    // 首页独家放送数据接口
    HomeApis.getHomeExclusive().then(function (data) {
        data.title = '独家放送';
        data.subTitle = '小微出品';
        // 处理最后一个数据
        data.result.forEach(function (obj, index) {
            obj.width = 334/100;
            if (index === 2) {
                obj.width = 690/100;
            }
        });
        // 使用模板
        let html = template('category', data);
        $('.exclusive').html(html);
        // 设置换行
        $('.exclusive .category-title').forEach(function (ele) {
            $clamp(ele, {clamp: 2});
        });
        // 刷新
        myScroll.refresh();

    }).catch(function (error) {

    });

    // 首页新碟上架数据接口
    HomeApis.getHomeAlbum().then(function (data) {
        // 整合数据,自定义数据
        let targetObj = {};
        let forArray = [];
        data['weekData'].forEach(function (obj) {
            forArray.push(obj.artist);
        });

        forArray.forEach(function (keyName) {
            keyName.width = 216/100;
            keyName.artistName = keyName.name;
        });
        let newsArray = forArray.slice(0, 9);
        targetObj.result = newsArray;
        targetObj.title = '新碟推荐';
        targetObj.subTitle = '更多新歌';

        let html = template('category', targetObj);
        $('.album').html(html);
        $('.album .category-title').forEach(function (ele) {
            $clamp(ele, {clamp: 1});
        });

        myScroll.refresh();
    }).catch(function (error) {
        console.log(error);
    });

    // 首页推荐MV接口数据
    HomeApis.getHomeMV().then(function (data) {
        data.title = '推荐MV';
        data.subTitle = '更多MV';
        data.result.forEach(function (obj) {
            obj.width = 334/100;
        });
        // 模板
        let html = template('category', data);
        $('.mv').html(html);

        // 限制字数
        $('.mv .category-title').forEach(function (ele) {
            $clamp(ele, {clamp: 1});
        });
        $('.mv.category-singer').forEach(function (eles) {
            $clamp(eles, {clamp: 1});
        });


        myScroll.refresh();
    }).catch(function (error) {

    });

    // 首页推荐电台
    HomeApis.getHomeDJ().then(function (data) {
        data.title = '知名主播';
        data.subTitle = '更多电台';
        // console.log('推荐电台');
        // console.log(data);
        data.result.forEach(function (obj) {
            obj.width = 216/100;
        });

        let html = template('category', data);
        $('.dj').html(html);
        $('.dj .category-title').forEach(function (element) {
            $clamp(element, {clamp: 2});
        });
    }).catch(function (error) {

    })

    // 抽取的方法
    function formartNum(num) {
        let res = 0;
        if(num / 100000000 > 1){
            let temp = num / 100000000 + "";
            if(temp.indexOf(".") === -1){
                res = num / 100000000 + "亿";
            }else{
                res = (num / 100000000).toFixed(1) + "亿";
            }
        }else if(num / 10000 > 1){
            let temp = num / 10000 + "";
            if(temp.indexOf(".") === -1){
                res = num / 10000 + "万";
            }else{
                res = (num / 10000).toFixed(1) + "万";
            }
        }else{
            res = num;
        }
        return res;
    }

});