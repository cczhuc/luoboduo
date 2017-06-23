
app.config(projectRouteConfig);//将路由配置为函数，而不是就写在config里面，这样改动方便，
function projectRouteConfig($stateProvider,$urlRouterProvider,$ocLazyLoadProvider,$locationProvider) {
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
    // $locationProvider.html5Mode(true);//去掉URL中的#号

    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('myApp', {
            url: '',
            templateUrl: 'view/main.html',
            controller: 'mainCtrl',
            controllerAs: 'vm',
            abstract: true,
            resolve: {
                loadMyFile: _lazyLoad([
                    'style/main.css',
                    'script/controller/mainCtrl.js'
                ])
            }
        })
        //首页
        .state("myApp.home",{
            url:"/home",
            templateUrl:"view/home.html",
            controller: 'homeCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'style/home.css',
                    'script/directors/homeFriendCarousel/homeFriendCar.css',
                    'script/controller/homeCtrl.js'
                ])
            }
        })

        //找职位
        .state("myApp.findJob",{
            url:"/findJob",
            templateUrl:"view/findJob/findJob.html",
            controller: 'findJobCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'style/my/findJob/findJob.css',
                    'script/controller/findJobCtrl.js'
                ])
            }
        })
        //关于我们和联系我们公共部分
        .state("myApp.about",{
            url:"/about?status",
            templateUrl:"view/about.html",
            controller: 'aboutCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'style/about.css',
                    'script/controller/aboutCtrl.js'
                ])
            }
        })
        //找精英
        .state("myApp.findElite",{
            url:"/findElite",
            templateUrl:"view/findElite/findElite.html",
            controller: 'findEliteCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'style/findElite.css',
                    'script/controller/findEliteCtrl.js'
                ])
            }
        })
        //找精英-公司列表
        .state("myApp.companyList",{
            url:"/companyList?page&size&data",
            params:{data:null},
            templateUrl:"view/findElite/companyList.html",
            controller:"companyListCtrl",
            controllerAs:"vm",
            resolve: {
                loadMyFile: _lazyLoad([
                    'style/companyList.css',
                    'style/my/findJob/searchCompany.css',
                    'script/controller/companyListCtrl.js',
                    'script/directors/tm.pagination/tm.pagination.css'
                ])
            }
        })
        //找职位-推荐职位,最新职位搜索
        .state('myApp.jobList', {
            url: '/jobList?judge&name&page&size&data',
            templateUrl: 'view/findJob/jobList.html',
            params:{data:null},
            controller: 'jobListCtrl',
            controllerAs: 'vm',
            cache: false,//配合reload使用，每次跳转页面刷新
            resolve: {
                loadMyFile: _lazyLoad([
                    'style/my/findJob/jobList.css',
                    'script/directors/tm.pagination/tm.pagination.css',
                    'script/controller/jobListCtrl.js'
                ])
            }
        })
        //找职位-搜索公司/搜索职业公共部分，顶边及侧边
        .state('myApp.search', {
            url: '/search',
            params:{judge:""},
            templateUrl: 'view/findJob/search.html',
            controller: 'searchCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'style/my/findJob/search.css',
                    'script/controller/searchCtrl.js'
                ])
            }
        })
        //找职位-搜索公司页
        .state('myApp.search.searchCompany', {
            url: '/searchCompany?page&size&name&data',
            params:{data:null},
            templateUrl: 'view/findJob/searchCompany.html',
            controller: 'searchCompanyCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'style/my/findJob/searchCompany.css',
                    'script/controller/searchCompanyCtrl.js',
                    'script/directors/tm.pagination/tm.pagination.css'
                ])
            }
        })
        //找职位-搜索职位页
        .state('myApp.search.searchJob', {
            url: '/searchJob?page&size&name&data',
            params:{data:null},
            templateUrl: 'view/findJob/searchJob.html',
            controller: 'searchJobCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'style/my/findJob/searchJob.css',
                    'script/controller/searchJobCtrl.js',
                    'script/directors/tm.pagination/tm.pagination.css'
                ])
            }
        })
        //找职位-公司详情和在招职位公共部分
        .state('myApp.companyInfo', {
            url: '/companyInfo?id&page&size',
            templateUrl: 'view/findJob/companyInfo.html',
            controller: 'companyInfoCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'style/my/findJob/companyInfo.css',
                    'script/controller/companyInfoCtrl.js'
                ])
            }
        })
        //找职位-公司详情
        .state('myApp.companyInfo.companyDetails', {
            url: '/companyDetails',
            templateUrl: 'view/findJob/companyDetails.html',
            controller: 'companyDetailsCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'style/my/findJob/companyDetails.css',
                    'script/controller/companyDetailsCtrl.js'
                ])
            }
        })
        //找职位-在招职位
        .state('myApp.companyInfo.hiringJob', {
            url: '/hiringJob',
            templateUrl: 'view/findJob/hiringJob.html',
            controller: 'hiringJobCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'style/my/findJob/hiringJob.css',
                    'script/directors/tm.pagination/tm.pagination.css',
                    'script/controller/hiringJobCtrl.js'
                ])
            }
        })
        //找职位-职位详情
        .state('myApp.jobDetails', {
            url: '/jobDetails?id',
            templateUrl: 'view/findJob/jobDetails.html',
            controller: 'jobDetailsCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'style/my/findJob/jobDetails.css',
                    'script/controller/jobDetailsCtrl.js'
                ])
            }
        });

}