// 暴露给外界调用
;(function () {
    // 根据axios官方文档配置信息
    axios.defaults.baseURL = 'http://localhost:3000';
    // 'https://api.example.com';
    // 设置超时时间
    axios.defaults.timeout = 2500;

    class LWHttp {
        // 静态方法GET
        static get(url="", data={}){
            return new Promise(function (resolve, reject) {
                axios.get(url, {
                    params: data,
                })
                    .then(function (response) {
                        resolve(response.data);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        }

        // 静态方法POST
        static post(url="", data={}){
            return new Promise(function (resolve, reject) {
                axios.post(url, {
                    params: data,
                })
                    .then(function (response) {
                        resolve(response.data);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        }
    }

    // 首页调用接口方法
    class HomeApis {
        // 静态方法, 首页banner数据接口
        static getHomeBanner() {
            return LWHttp.get('/banner', {type: 2});
        }
        // 推荐歌单数据接口
        static getHomeRecommend() {
            return LWHttp.get('/personalized');
        }
        // 独家放送数据接口
        static getHomeExclusive() {
            return LWHttp.get('/personalized/privatecontent');
        }
        // 新碟上架数据接口
        static getHomeAlbum() {
            return LWHttp.get('/top/album', {offset: 0, limit:6});
        }
        // 推荐MV
        static getHomeMV() {
            return LWHttp.get('/personalized/mv');
        }
        // 推荐电台
        static getHomeDJ() {
            return LWHttp.get('/personalized/djprogram');
        }
        // 获取热搜列表
        static getHomeHotDetail() {
            return LWHttp.get('/search/hot/detail');
        }
        // 获取搜索关键字列表
        static getHomeSearchSuggest(keywords) {
            return LWHttp.get("/search/suggest?keywords="+keywords+"&type=mobile");
        }
    }

    // 提供给外界的属性
    window.LWHttp = LWHttp;
    window.HomeApis = HomeApis;

})();