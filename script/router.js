
app.config(projectRouteConfig);//将路由配置为函数，而不是就写在config里面，这样改动方便，
function projectRouteConfig($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {
    //增加复用性,在路由中按需加载，只需调用函数而不用写一大段代码
    var _lazyLoad = function (loaded) {
        return function ($ocLazyLoad) {
            return $ocLazyLoad.load(loaded, {serie: true});
        }
    };
    $ocLazyLoadProvider.config({
        debug: false,//用来开启debug模式。布尔值，默认是false。当开启debug模式时，$ocLazyLoad会打印出所有的错误到console控制台上。
        events: true//当你动态加载了module的时候，$ocLazyLoad会广播相应的事件。布尔值，默认为false。
    });

    $urlRouterProvider.otherwise('/home');
    $stateProvider
    // //index页面，主要有导航栏和页脚,如果要把这个写上，需要把导航栏和页脚提出来一个html
        // .state("app",{
        //     url: '',
        //     templateUrl: '',
        //     controller: '',
        //     controllerAs: 'vm',//在控制器中，令vm=this，可用vm代替$scope。如果this出现问题，只需vm=$scope.
        //     abstract: true,
        //     //abstract: true 表明此状态不能被显性激活，只能被子状态隐性激活。
        //     //不能显性激活即不能直接通过"/app"访问此状态路由，这样使得我们必须
        //     //只有在其余几个页面才能激活这个状态，不然可能显示出只有导航栏和页脚的页面
        //     //写给自己看的，请见谅
        //
        //     // resolve: {
        //     //     loadMyFile: _lazyLoad([
        //     //         ''
        //     //     ])
        //     // }
        // })
        //首页
        .state("home",{
            url:"/home",
            templateUrl:"../view/home.html",
            controller: '',
            controllerAs: 'vm',
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         ''
            //     ])
            // }
        })
        //关于我们和联系我们公共部分
        .state("about",{
            url:"/about",
            templateUrl:"../view/about.html",
            controller: '',
            controllerAs: 'vm',
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         ''
            //     ])
            // }
        })
        //找职位
        .state("findJob",{
            url:"/findJob",
            templateUrl:"../view/findJob/findJob.html",
            controller: '',
            controllerAs: 'vm',
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         ''
            //     ])
            // }
        })
        //找精英
        .state("findElite",{
            url:"/findElite",
            templateUrl:"../view/findElite/findElite.html",
            controller: '',
            controllerAs: 'vm',
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         ''
            //     ])
            // }
        })
        //找精英-公司列表
        .state("companyList",{
            url:"/companyList",
            templateUrl:"../view/findElite/companyList.html",
            controller:"",
            controllerAs:"vm",
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         ''
            //     ])
            // }
        })
        //找职位-推荐职位,最新职位搜索
        .state('jobList', {
            url: '/jobList',
            templateUrl: '../view/findJob/jobList.html',
            controller: '',
            controllerAs: 'vm',
            cache: false,//配合reload使用，每次跳转页面刷新
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         ''
            //     ])
            // }
        })
        //找职位-搜索公司/搜索职业公共部分，顶边及侧边
        .state('search', {
            url: '/search',
            templateUrl: '../view/findJob/search.html',
            controller: '',
            controllerAs: 'vm',
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         ''
            //     ])
            // }
        })
        //找职位-搜索公司页
        .state('search.searchCompany', {
            url: '/searchCompany',
            templateUrl: '../view/findJob/searchCompany.html',
            controller: '',
            controllerAs: 'vm',
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         ''
            //     ])
            // }
        })
        //找职位-搜索职位页
        .state('search.searchJob', {
            url: '/searchJob',
            templateUrl: '../view/findJob/searchJob.html',
            controller: '',
            controllerAs: 'vm',
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         ''
            //     ])
            // }
        })
        //找职位-公司详情和在招职位公共部分
        .state('companyInfo', {
            url: '/companyInfo',
            templateUrl: '../view/findJob/companyInfo.html',
            controller: '',
            controllerAs: 'vm',
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         ''
            //     ])
            // }
        })
        //找职位-公司详情
        .state('companyInfo.companyDetails', {
            url: '/companyDetails',
            templateUrl: '../view/findJob/companyDetails.html',
            controller: '',
            controllerAs: 'vm',
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         ''
            //     ])
            // }
        })
        //找职位-在招职位
        .state('companyInfo.hiringJob', {
            url: '/hiringJob',
            templateUrl: '../view/findJob/hiringJob.html',
            controller: '',
            controllerAs: 'vm',
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         ''
            //     ])
            // }
        })
        //找职位-职位详情
        .state('jobDetails', {
            url: '/jobDetails',
            templateUrl: '../view/findJob/jobDetails.html',
            controller: '',
            controllerAs: 'vm',
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         ''
            //     ])
            // }
        })


}