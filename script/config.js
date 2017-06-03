
//定义模块，注入相关依赖,
var app = angular.module("carrots",[
    'ui.router',
    'oc.lazyLoad',
    'ngMessages',
    'tm.pagination',//个人用分页插件
    'ui.bootstrap',
    'ngAnimate'
    // 'ngStorage',
    // 'ngCookies',
]);
//将各个config写成函数，然后在此处调用。
app.config(lazyLoadConfig)
    .config(provider)
    .config(httpConfig);

// 将Angular的组件，指令等等的注册接口挂到app对象上，可以在应用程序启动之后任意可以添加功能
function provider($provide, $compileProvider, $controllerProvider, $filterProvider) {
    app.controller = $controllerProvider.register;
    app.directive = $compileProvider.directive;
    app.filter = $filterProvider.register;
    app.factory = $provide.factory;
    app.service = $provide.service;
    app.constant = $provide.constant;
    app.value = $provide.value
}

//$HTTP服务将会给所有请求自动创建HTTP头。
function httpConfig($httpProvider) {
    // 这个默认设置能通过访问$httpProvider.defaults.headers配置对象配置。统一配置，可以不用之后的每一个请求都写一个
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.patch['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

    // 转换函数获取http请求体和请求头，并且返回他们的转换版（通常是序列化）。
    $httpProvider.defaults.transformRequest = function (data) {
        if (data === undefined) {
            return data;
        }
        return $.param(data);
    };
}
//懒加载相应模块，modules：用于定义你需要动态加载的模块。定义每个模块的名字需要唯一。
// modules必须要用数组的形式，其中files也必须以数组的形式存在，哪怕只需要加载一个文件
//也可以在路由中加载模块
function lazyLoadConfig($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        modules: [
            {
                name: '',
                files: [
                    '',
                    ''
                ]
            },
            {
                name: '',
                files: [
                    '',
                    ''
                ]
            }

        ]
    });
}
