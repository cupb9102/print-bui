/**
 * 通用登录模板,包含输入交互,提交需要自己绑定验证
 * 默认模块名: pages/login/login
 * @return {[object]}  [ 返回一个对象 ]
 */


loader.define(function (require, exports, module) {

    console.log('login start')
    // var password = 'default';

    /*
        // 绑定按钮跳转
        $("#btnGo").on("click", function (e) {
            console.log('登录跳转')
            router.load({ url: "pages/main/main.html", param: { id: "page1" } });
            //应该是返回，而不是load。并且如果是登录成功，就需要返回到主页。load只能初次加载使用，并不是最为无限跳转使用的。也就是说load只会加载一次。
            //    bui.back();
        })
    */

    // 绑定当前页面下样式为 btn 的事件
    /*
    router.$(".bui-page").on("click", "#btnGo", function (e) {
        // console.log('登录跳转' + JSON.stringify(password))
        console.log(password)
        // console.log('jQuery语法获取值'.concat($("#password").val()))
        console.log("密码是"+$("#password").val())
        router.load({ url: "pages/main/main.html", param: { id: "page1" } });
    })
*/

    //登录的数据模型
    var bs = bui.store({
        scope: "page",
        data: {
            username: "",
            password: ""
        },
        methods: {
            login: function () {
                console.log('用户输入的用户名:' + this.username + '\t密码:' + this.password)
                console.log("登录是否可点击" + this.disabled)

                if (this.disabled) {
                    bui.hint("请输入用户名和密码");
                }
                else {
                    // post
                    var uiAjax2 = bui.ajax({
                        url: "https://cupb.top:8443/PrintDownloadServlet",
                        data: {
                            shopid: this.username
                        },
                        // 可选参数
                        method: "POST"
                    });
                    //ajax访问网络
                    uiAjax2.then(function (res) {
                        bui.hint("登录成功");
                        // bui.hint({ appendTo:"#main", content:"<i class='icon-infofill'></i>欢迎使用简印", position:"top" , skin:'success', showClose:true, autoClose: true});

                        console.log('success,back value below')
                        console.log(res)
                        var userInfo = window.userInfo
                        console.log(userInfo)
                        // console.log(userInfo.login)
                        userInfo.login=true;//登录成功修改登录标记

                        // bui.load({ url: "pages/main/main.html", param: { id: "loginPage" } });
                        //back to  main
                        bui.back();
                    }, function (res) {
                        bui.hint("网络不通");
                        console.log('failure')
                        console.log(res)
                    })

                }
            }
        },
        watch: {},
        computed: {
            disabled: function () {
                // 注意: 这里需要先缓存下来值再进行判断.
                var firstName = this.username,
                    lastName = this.password;
                // console.log(firstName + lastName)
                if (firstName && lastName) {
                    // console.log("登录输入框不为空")
                    return false;
                } else {
                    // console.log("登录输入框为空")
                    return true;
                }
            }
        },
        templates: {},
        beforeMount: function () {
            // 数据解析前执行
        },
        mounted: function () {
            // 数据解析后执行
        }
    })



    // 原生事件初始化
    var getParams = bui.getPageParams();
    getParams.done(function (result) {
        console.log("接收的参数" + result);
        // {id:"page2"}
    })




    var pageview = {};

    pageview.bind = function () {

        // 手机号,帐号是同个样式名, 获取值的时候,取的是最后一个focus的值
        var userInput = bui.input({
            id: ".user-input",
            callback: function (e) {
                // 清空数据
                this.empty();
            }
        })

        // 密码显示或者隐藏
        var password = bui.input({
            id: ".password-input",
            iconClass: ".icon-eye",
            onBlur: function (e) {
                if (e.target.value == '') { return false; }
                // 注册的时候校验只能4-18位密码
                var rule = /^[a-zA-Z0-9_,.!@#$%^&*()-]{4,18}$/;
                if (!rule.test(e.target.value)) {
                    bui.hint("密码只能由4-18位字母或者数字上下横杠组成");
                    return false;
                }

                return true;
            },
            callback: function (e) {
                //切换类型
                this.toggleType();
                //
                $(e.target).toggleClass("active")
            }
        })

    }



    pageview.init = function () {





        // 绑定事件
        this.bind();
    }


    // 初始化
    pageview.init();

    // 输出模块
    return pageview;
})