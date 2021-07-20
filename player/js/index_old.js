$(function () {
    // 接收外界传入的歌曲信息
    let songArray = getSongs();
    // 定义变量记录swiper里面切换封面的索引
    let index = 0;
    let ids = [];
    // 遍历
    songArray.forEach(function (object) {
        // 把id添加到数组中
        ids.push(object.id);
    });
    // 返回上级界面
    $('.header-in>img').click(function () {
        window.history.back();
    });
    // 点击列表信息弹出的底部列表的菜单
    $('.footer-bottom .list').click(function () {
        // console.log("mmm");
        // 初始化歌曲里列表头部
        $('.modal-top>p>span').html(`列表循环(${songArray.length})`);
        // 删除所有歌曲的按钮
        $('.modal-top .clear-all').click(function () {
            // 删除存储的所有数据
            clearSongs();
            // 并且返回到上一级界面
            window.location.href = "./../home/index.html";
        });
        // 初始化本地历史记录列表歌曲
        // 如果本地的列表数量不等于存储的历史记录,进入条件
        if ($('.modal-middle>li').length !== songArray.length) {
            // 清空之前的列表歌曲
            $('.modal-middle').html('');
            // 遍历
            songArray.forEach(function (object) {
                // 取出本地历史记录里面的歌曲的id
                ids.push(object.id);
                // 加入列表
                let li = $(`<li>
                                <p>${object.name} - ${object.singer}</p>
                                <img src="images/player-it666-close.png" alt="" class="delete-song">
                           </li>`)
                $('.modal-middle').append(li);
            });
            // 监听歌曲列表删除按钮点击
            $('.delete-song').click(function () {
                // 1.删除sessionStorage中的数据,获取父控件上面的索引
                // console.log($(this).parent());
                let deleteIndex = $(this).parent().index();
                // console.log(deleteIndex);
                let len = deleteSongByIndex(deleteIndex);
                // 如果没有歌曲跳转到首页
                if (len === 0) {
                    $('.modal .clear-all').click();
                }
                // 删除UI上面的数据
                $(this).parent().remove();
                // 从swiper里面删除数据，就是滑动的那个转盘里面
                mySwiper.removeSlide(deleteIndex);
                // 更新歌曲的头部信息总和数据
                $('.modal-top>p>span').html(`列表循环(${len})`);
            });
        }
        // 显示modal列表
        $('.modal').css({display: "block"});
    });
    // 切换歌曲上一首
    $('.footer-bottom .prev').click(function () {
        index--;
        // 绑定自定义属性
        mySwiper.swipeDirection = "prev";
        // 在Loop模式下Swiper切换到指定slide
        mySwiper.slideToLoop(index);
    });
    // 切换歌曲下一首
    $('.footer-bottom .next').click(function () {
        // 索引 ++
        index++;
        mySwiper.swipeDirection = "next";
        mySwiper.slideToLoop(index);
    });

    // 关闭历史记录的歌曲列表
    $('.modal-bottom').click(function () {
        $('.modal').css({display: "none"});
    });

    // 获取原生的audio标签
    let oAudio =  document.querySelector('audio');
    // 实现默认界面和歌词界面切换
    $(".main-in").click(function () {
        $(this).toggleClass("active");
        // 要刷新一下，不然滑不动,默认情况下是隐藏的
        // lyricScroll.refresh();
        // 这类就直接去加载请求歌词界面，
        if ($(this).hasClass('active')) {
            getLyric(songArray[index].id);
        }
    });

    // 创建歌词滚动
    let lyricScroll = new IScroll(".lyric-bottom", {
        mouseWheel: false,
        scrollbars: false,
        probeType: 3,
    });
    // 滚动的时候
    lyricScroll.on('scroll', function () {
        // 显示中间的横线
        $('.lyric-time-line').css({display: 'block'});
        // 给原生的ul 绑定一个属性isDrag, 表示是否在拖拽
        $('.lyric-list')[0].isDrag = true;
        // 计算歌词滚动的高度 偏移量 / 每个Li的高度
        // console.log(this.y);
        // $('.lyric-list>li').eq(0).height() 每一个li的高度
        let index = Math.abs(parseInt(this.y / $('.lyric-list>li').eq(0).height()));
        // console.log(index);
        let curt$li = $('.lyric-list>li').eq(index);
        // console.log(curt$li[0]); 原生的标签
        if (!curt$li[0]) return;
        // 设置中间线条的歌词的时间
        $('.lyric-time-line>span').text(curt$li[0].lrc.timeStr);
        // 改变被滑动到的文字颜色
        curt$li.addClass('hover').siblings().removeClass('hover');
    });
    // 滚动停止时候
    lyricScroll.on('scrollEnd', function () {
        // 隐藏中间的横线
        $('.lyric-time-line').css({display: 'none'});
        // 给原生的ul 绑定一个属性isDrag, 表示是否在拖拽
        $('.lyric-list')[0].isDrag = false;
        // 移除hover
        $('.lyric-list>li').removeClass('hover');
    });

    // 点击播放按钮切换相应的状态,滑动歌曲进度条后 canplay会调用多次, 是否加载完毕能播放
    let flag = false;
    $('audio').on('canplay', function () {
        // 是否开始播放的时候，同步歌词时间的信息，底部的
        let timeObj = formartTime(oAudio.duration * 1000);
        $('.total-time').text(timeObj.minute + ":" + timeObj.second);
        // 为防止歌曲多次点击更新引起的bug，这里需要添加条件判断
        if (!flag) {
            flag = true;
        } else {
            return;
        }
        $('.play').click(function () {
            // 判断当前的属性是否包含
            if ($(this).attr("class").includes('active')) {
                // 指针归位
                $(".default-top>img").css({transform: "rotate(-30deg);"});
                // 转盘停止转动
                $('.disc-pic').css({"animation-play-state": "paused"});
                // 拿到原生的audio
                $('audio')[0].pause();
            } else {
                console.log('active');
                // 开始做动画
                $(".main-default>.default-top>img").css({transform: "rotate(0deg);"});
                $('.disc-pic').css({"animation-play-state": "running"});
                $('audio')[0].play();
            }
            // 添加类名，有就添加，没有就删除,切换暂停播放图标
            $(this).toggleClass('active');
        });
    });

    // 获取歌曲界面详细的信息
    let mySwiper = null;
    // 这个数组中用 ,分割拼接 '1', '2' ....
    MusicApis.getgetSongDetail(ids.join(',')).then(function (data) {
        console.log(data);
        console.log('获取歌曲信息');
        for (let i = 0; i < data.songs.length; i ++) {
            let song = data.songs[i];
            //  自定义属性picUrl
            songArray[i].picUrl = song.al.picUrl;
            // 初始化中间转盘区域,
            let slide = $(`<div class="swiper-slide">
                                <div class="disc-pic">
                                     <img src="${song.al.picUrl}" alt="">
                                 </div>
                           </div>`);
            // 拼接到标签上
            $('.swiper-wrapper').append(slide);

            // console.log(song);
            /*
            // 修改封面以及顶部标题的信息
            if (i === 0 ) {
                $('.header-title').text(song.name);
                // 唱歌的人
                let singer = "";
                // console.log(song.ar);
                for (let j = 0; j < song.ar.length; j ++) {
                    if (j == 0) {
                        singer = song.ar[0].name;
                    } else {
                        singer += "/" + song.ar[0].name;
                    }
                }
                // 顶部歌曲的名称与作者
                $('.header-info').text(singer);
                // 转盘封面
                $('.disc-pic>img').attr("src", song.al.picUrl);
                // 模糊的背景图
                $('.main>.bg').css({background: `url("${song.al.picUrl}") no-repeat center top`});
            }
             */

            // 创建Swiper
            mySwiper = new Swiper('.swiper-container', {
                loop: true,
                // 如果内容是从服务器获取的, 请加上这三个配置
                observer: true,
                observeParents: true,
                observeSlideChildren: true,
                on:  {
                    // 当发生改变结束的时候
                    slideChangeTransitionEnd: function(){
                        console.log("滑动啦swiper");
                        /*
                            Swiper.swipeDirection属性用于获取Swiper当前滚动的方向
                            如果是第一次执行, 那么拿到的是: undefined
                            如果是切换到下一屏: 返回的是next
                            如果是切换到上一屏: 返回的是prev
                            console.log("执行了", this.swipeDirection);
                        */
                        index = this.realIndex;
                        initDefaultInfo(this.realIndex, this.swipeDirection);
                    },
                }
            });
        }
    }).catch(function (error) {

    });
    // 根据索引初始化当前歌曲默认信息
    function initDefaultInfo(index, swipeDirection) {
        // 1.拿到当前slide对应的歌曲
        let song = songArray[index];
        // console.log(index, song.name, song.singer);
        // 2.初始化头部信息,设置歌曲的作者以及歌名
        $(".header-title").text(song.name);
        $(".header-info").text(song.singer);
        // 3.初始化对应需要播放的歌曲
        // 调取播放网络歌曲接口信息
        MusicApis.getSongURL(song.id).then(function (data) {
            // console.log(song.id);
            // console.log('getSongURL');
            // 清空之前audio标签上面的数据，免得有缓存
            $('audio').html('');
            // 遍历循环取出url,设置标签audio播放
            for (let i = 0; i < data.data.length; i++) {
                // 设置audio的值, 什么类型
                let $src = $(`<source src="${data.data[i].url}" type="audio/${data.data[i].type}"/>`);
                $('audio').append($src);
            }
            // 注意点: 如果更换了需要播放歌曲的地址, 那么必须让audio重新加载才会播放更新之后的歌曲,否则还是上次的歌曲
            $('audio')[0].load();
        }).catch(function (error) {

        });
        // 4.同步修改播放界面的背景
        $(".main>.bg").css({background: `url("${song.picUrl}") no-repeat center top`});
        // 切换后自动播放
        if (swipeDirection && !$('.play').hasClass('active')) {
            console.log("自动播放的嘛");
            $('audio')[0].load();
            $(".main-default>.detault-top>img").css({transform: "rotate(0deg);"});
            $('.disc-pic').css({"animation-play-state": "running"});
            // $(".play").click();
            $(".play").toggleClass("active");
        }
    }

    // 通过进度条控制歌曲进度
    let musicProgress = new NJProgress($('.progress-bar'), $('.progress-line'), $('.progress-dot'));
    musicProgress.progressClick(function (value) {
        // console.log(value);
        // 歌曲当前的播放时间，点击的比例值 x 歌曲的总时间长
        oAudio.currentTime = value *oAudio.duration;
    });
    musicProgress.progressMove(false, function (value) {
        oAudio.currentTime = value *oAudio.duration;
    });
    // 播放的回调函数
    $('audio').on('timeupdate', function () {
        // 这里同步歌词的时间, 处理当前播放时间
        let timeObj = formartTime(oAudio.currentTime *1000);
        $('.cur-time').text(timeObj.minute + ":" + timeObj.second);
        // 处理进度条同步
        let value = oAudio.currentTime / oAudio.duration *100;
        musicProgress.setProgress(value);
        // 处理歌词同步
        let curTime = parseInt(oAudio.currentTime);
        // 取出绑定的id类名
        let curt$li = $("#lw_" + curTime);
        // console.log(curt$li[0]);
        if (!curt$li[0]) return;
        curt$li.addClass("active").siblings().removeClass("active");
        let curOffset = curt$li[0].lrc.offset;
        // console.log(curt$li[0].lrc);
        // 滚动之前判断下是否正在拖拽
        if ($('.lyric-list')[0].isDrag) return;
        // 自动滚动对应的地方
        lyricScroll.scrollTo(0, curOffset);
    });

    // 通过变量记录当前的音量
    let volumeValue = 0.5;
    // 通过进度条控制歌曲音量
    let voiceProgress = new NJProgress($('.voice-progress-bar'), $('.voice-progress-line'), $('.voice-progress-dot'));
    // 点击设置进度
    voiceProgress.progressClick(function (value) {
        // console.log(value);
        // 设置audio标签的音量
        oAudio.volume = value;
        volumeValue = value;
    });
    // 移动,拖拽
    voiceProgress.progressMove(false, function (value) {
        oAudio.volume = value;
        volumeValue = value;
    });
    // 点击音量图片设置音量
    $('.lyric-top>img').click(function (event) {
        if (oAudio.volume === 0) {
            // console.log("volumeValue");
            // 设置音量
            oAudio.volume = volumeValue;
            voiceProgress.setProgress(volumeValue * 100);
        } else {
            oAudio.volume = 0;
            // 设置
            voiceProgress.setProgress(0);
        }
        // 停止
        // 终止事件在传播过程的捕获、目标处理或起泡阶段进一步传播。调用该方法后，该节点上处理该事件的处理程序将被调用，事件不再被分派到其他节点
        return event.stopPropagation();
    });

    // 加载歌曲信息,展示歌词列表
    function getLyric(songId) {
        MusicApis.getSongLyric(songId).then(function (data) {
            // 打印歌曲信息
            // console.log(data);
            // 整合成自己需要的数据
            let lyricObj = parseLyric(data.lrc.lyric);
            let index = 0;
            // 清空上一首歌曲的歌词
            $(".lyric-list").html("");
            // 遍历key
            for (let key in lyricObj) {
                /*
                Z [li#lw_0, selector: ""]
                Z [li#lw_1, selector: ""]
                Z [li#lw_3, selector: ""]
                Z [li#lw_20, selector: ""]
                */
                // 设置jq对象，绑定类名，方便后期取出赋值
                let $li = $(`<li id="lw_${key}">${lyricObj[key]}</li>`); // jq对象
                // console.log($li);
                // 当歌词是第一行的时候白色
                if (index === 0) {
                    $li.addClass('active');
                }
                // 添加到标签当中
                $('.lyric-list').append($li);
                // console.log($li.height()); // 每个li都是120，需要加入到标签里面才有值
                // 取出原生的li 标签，绑定一个属性
                let li = $li[0];
                let timeObj = formartTime(key * 1000);
                li.lrc = {offset: -index * $li.height(), timeStr: timeObj.minute + ":" + timeObj.second};
                // console.log(li.lrc);
                index ++;
            }
            // 刷新
            lyricScroll.refresh();
            // 最大的滚动距离
            lyricScroll.maxScrollY -= $(".lyric-bottom").height();
        })
            .catch(function (error) {
            });
    }

    // 格式化歌词
    function parseLyric(lrc) {
        let lyrics = lrc.split("\n");
        // [00:00.000] 作曲 : 林俊杰
        // 1.定义正则表达式提取[00:00.000]
        let reg1 = /\[\d*:\d*\.\d*\]/g;
        // 2.定义正则表达式提取 [00
        let reg2 = /\[\d*/i;
        // 3.定义正则表达式提取 :00
        let reg3 = /\:\d*/i;
        // 4.定义对象保存处理好的歌词
        let lyricObj = {};
        lyrics.forEach(function (lyric) {
            // 1.提取时间
            let timeStr = lyric.match(reg1);
            if(!timeStr){return}
            timeStr = timeStr[0];
            // 2.提取分钟
            let minStr = timeStr.match(reg2)[0].substr(1);
            // 3.提取秒钟
            let secondStr = timeStr.match(reg3)[0].substr(1);
            // 4.合并时间, 将分钟和秒钟都合并为秒钟
            let time = parseInt(minStr) * 60 + parseInt(secondStr);
            // 5.处理歌词
            let text = lyric.replace(reg1, "").trim();
            // console.log(text);
            if (text.length === 0) return;
            // 6.保存数据
            lyricObj[time] = text;
        });
        // 返回整合的对象信息
        return lyricObj;
    }
});