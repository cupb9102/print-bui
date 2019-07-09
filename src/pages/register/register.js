/**
 * 注册模板,包含验证码倒计时及手机号简单验证
 * 默认模块名: pages/register/register
 * @return {[object]}  [ 返回一个对象 ]
 */
loader.define(function (require, exports, module) {

    /*
    
        // get
        var uiAjax = bui.ajax({
            // url: siteDir + "userlist.json",
            // url:'http://localhost:2594',
            url: 'https://cupb.top:8443/PrintDownloadServlet',
            // 可选参数
            method: "GET"
        })
    
    
        // GET请求
        $("#register-btn").click(function () {
            console.log('注册！')
            uiAjax.then(function (res) {
                console.log(res, "success")
                var status = res.status
                console.log(res.status)
                console.log(status)
    
                if (status == 'success') {
                    console.log(status == 'success')
                    console.log('登录成功')
                }
    
                // if(res.status=='success'){
                //     console.log('登录成功')
                // }
    
                // bui.load({ url: "pages/login/login.html", param: { id: "page1" } });
                //应该是返回，而不是load
                bui.back();
    
    
    
            }, function (res) {
                console.log(res, "fail")
            })
        });
    
    */

    //登录的数据模型
    var bs = bui.store({
        scope: "page",
        data: {
            username: "",
            password: "",
            password2: "",
            address: "",
            tel: ""
        },
        methods: {
            //响应点击按钮
            register: function () {
                console.log('用户输入的用户名:' + this.username + '\t密码:' + this.password)
                //console.log(pageview.password.onBlur())

                if (this.disabled) {
                    bui.hint('请完整输入')
                } else {
                    if (this.tel.length != 11) {
                        bui.hint('手机号长度可能不正确')
                    } else {

                        if (this.password.length < 8 || this.password.length > 18) {
                            bui.hint('密码长度需要8-18位')
                        } else {

                            if (this.password != this.password2) {
                                bui.hint('两次密码不一样')
                            } else {



                                // post
                                var uiAjax2 = bui.ajax({
                                    url: "https://cupb.top:8443/PrintDownloadServlet",
                                    data: {
                                        userName: this.username,
                                        passWord: this.password,
                                        tel: this.tel,
                                        address: this.address
                                    },
                                    // 可选参数
                                    method: "POST"
                                });
                                //ajax访问网络
                                uiAjax2.then(function (res) {
                                    bui.hint("注册成功");
                                    console.log('success,back value below')
                                    console.log(res)
                                    // bui.load({ url: "pages/main/main.html", param: { id: "loginPage" } });
                                    //back to  main
                                    bui.back();
                                }, function (res) {
                                    bui.hint("注册失败");
                                    console.log('failure')
                                    console.log(res)
                                })
                            }
                        }
                    }
                }

            }
        },
        watch: {},
        computed: {
            disabled: function () {
                // 注意: 这里需要先缓存下来值再进行判断.
                var userName = this.username,
                    passWord = this.password, passWord2 = this.password2, address = this.address, phone = this.tel;
                if (userName && passWord && passWord2 && address && phone) {
                    return false;
                } else {
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






    var pageview = {};

    pageview.init = function () {

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
            id: "#passwordInput",
            iconClass: ".icon-eye",
            onBlur: function (e) {

                if (e.target.value == '') { return false; }
                // 注册的时候校验只能4-18位密码
                var rule = /^[a-zA-Z0-9_,.@!#$%^&*()_+-]{8,18}$/;
                if (!rule.test(e.target.value)) {
                    bui.hint("密码建议由8-18位字母，数字或者英文字符组成");
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

        // 密码显示或者隐藏
        var password2 = bui.input({
            id: "#passwordInput2",
            iconClass: ".icon-eye",
            onBlur: function (e) {

                if (e.target.value == '') { return false; }
                // 注册的时候校验只能4-18位密码
                var rule = /^[a-zA-Z0-9_,.@!#$%^&*()_+-]{8,18}$/;
                if (!rule.test(e.target.value)) {
                    bui.hint("密码建议由8-18位字母，数字或者英文字符组成");
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

        // 验证码示例
        var $btnSend = $("#btnSend");
        var timer = bui.timer({
            onEnd: function () {
                $btnSend.removeClass("disabled").text("重新获取验证码");
            },
            onProcess: function (e) {
                var valWithZero = e.count < 10 ? "0" + e.count : e.count;
                $btnSend.text(valWithZero + "后重新获取");
            },
            times: 10
        });

        $btnSend.on("click", function (argument) {
            var hasDisabled = $(this).hasClass("disabled");
            if (!hasDisabled) {
                $(this).addClass("disabled")
                bui.hint("验证码发送成功")
                timer.restart();
            }
        })
    }

    // 初始化
    pageview.init();

    // 输出模块
    return pageview;
})
