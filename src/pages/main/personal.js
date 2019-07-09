/**
 * 个人中心模板
 * 默认模块名: pages/main/personal
 * @return {[object]}  [ 返回一个对象 ]
 */
loader.define(function (require, exports, module) {

    var bs = bui.store({
        scope: "page",
        data: {},
        methods: {
            logout: function () {
                console.log("点击了退出")
                bui.confirm({
                    content: "确定会删除信息,不可还原",
                    title: "修改了标题",
                    buttons: ["取消", "确定"],
                    callback: function (e) {
                        var text = $(e.target).text();
                        if (text == "确定") {
                            // do something
                        }
                        this.close();
                    }
                })
            }
        },
        watch: {},
        computed: {},
        templates: {},
        beforeMount: function () {
            // 数据解析前执行
        },
        mounted: function () {
            // 数据解析后执行
        }
    })



    var pageview = {};

    // 初始化定义
    pageview.init = function () {

    }

    // 初始化
    pageview.init();

    // 输出模块
    return pageview;
})
