;(function (window) {
    class NJProgress{
        /*
        <div class="progress-bg" style="position: relative;">
            <div class="progress-fg" style="position: absolute; left:0; top:0;">
                <div class="progress-dot" style="position: absolute; left:100%; top:0;"></div>
            </div>
        </div>
        * */
        /**
         * 构造函数
         * @param $progressBg : 进度条容器(背景)
         * @param $progressFg : 进度条进度(前景)
         * @param $progressDot
         */
        constructor($progressBg, $progressFg, $progressDot){
            this.$progressBg = $progressBg;
            this.$progressFg = $progressFg;
            this.$progressDot = $progressDot;
            this.$isMove = false;
        }

        /**
         * 点击设置进度
         * @param callBack(value): 当前进度
         */
        progressClick(callBack){
            let $that = this;
            this.$progressBg.click(function (event) {
                // 获取背景距离窗口默认的位置
                let normalLeft = $(this).offset().left;
                // 获取点击的位置距离窗口的位置
                let eventLeft = event.pageX;
                // 设置前景的宽度
                $that.$progressFg.css("width", eventLeft - normalLeft);
                // 计算进度条的比例
                let curProgress = (eventLeft - normalLeft) / $(this).width();
                // 返回当前进度
                if(isNaN(curProgress)) return;
                if(curProgress < 0 ) curProgress = 0;
                if(curProgress > 1) curProgress = 1;
                callBack(curProgress);
                return event.stopPropagation();
            });
        }

        /**
         * 拖拽设置进度
         * @param isPC 是否是PC端使用
         * @param callBack(value): 当前进度
         */
        progressMove(isPC = true, callBack){
            let downEventName = "mousedown";
            let moveEventName = "mousemove";
            let upEventName = "mouseup";
            if(!isPC){
                downEventName = "touchstart";
                moveEventName = "touchmove";
                upEventName = "touchend";
            }
            let $that = this;
            // 获取背景距离窗口默认的位置
            let normalLeft = this.$progressBg.offset().left;
            let barWidth = this.$progressBg.width();
            let eventLeft;
            // 1.监听鼠标的按下事件
            this.$progressBg.on(downEventName ,function (event) {
                $that.$isMove = true;
                // 2.监听鼠标的移动事件
                $(document).on(moveEventName ,function (event) {
                    // 获取点击的位置距离窗口的位置
                    if(isPC){
                        eventLeft = event.pageX;
                    }else{
                        eventLeft = event.targetTouches[0].pageX;
                    }
                    let offset = eventLeft - normalLeft;
                    if(offset >=0 && offset <= barWidth){
                        // 设置前景的宽度
                        $that.$progressFg.css("width", offset);
                    }
                    return event.stopPropagation();
                });
                // 3.监听鼠标的抬起事件
                $(document).on(upEventName ,function (event) {
                    $that.$isMove = false;
                    $(document).off(moveEventName);
                    $(document).off(upEventName);
                    // 计算进度条的比例
                    let curProgress = (eventLeft - normalLeft) / barWidth;
                    if(isNaN(curProgress)) return;
                    if(curProgress < 0 ) curProgress = 0;
                    if(curProgress > 1) curProgress = 1;
                    callBack(curProgress);
                    return event.stopPropagation();
                });
                return event.stopPropagation();
            });
        }

        /**
         * 直接设置进度
         * @param value 需要设置的进度值
         */
        setProgress(value){
            if(this.$isMove) return;
            if(value < 0 || value > 100) return;
            this.$progressFg.css({
                width: value+"%"
            });
        }
    }
    window.NJProgress = NJProgress;
})(window);