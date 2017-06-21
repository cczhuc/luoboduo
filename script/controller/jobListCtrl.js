app.controller("jobListCtrl",["portService","$scope","$state",'searchOptions','searchUtil','commonUtil',
function (portService,$scope,$state,searchOptions,searchUtil,commonUtil) {
    var vm = this;
    vm.params = $state.params;
    console.log(vm.params);
    vm.keyWord = vm.params.name;

    // 获取搜索模块的基础数据
    // 使用state.params来实现
    if(vm.params.data===null) {
        vm.options=searchOptions;
        vm.data = searchUtil.dataDelete(vm.options);
        console.log("常量")
    }
    else {
        vm.options=JSON.parse(vm.params.data);
        console.log("params")
    }

    vm.data = searchUtil.dataConvert(vm.options);//在factory中的js文件已详细说明这一步骤的原理

    // 分页部分加拼凑部分
    vm.data.page = vm.params.page;
    vm.data.size = vm.params.size;
    vm.data.name = vm.params.name;
    vm.data.returnTags = 1;//必须要加这一字段，不然无法返回公司福利tags，接口文档没说清楚
    //标签多选
    vm.checkboxMulti = searchUtil.checkboxMulti;
    //时间标签单选
    vm.radioType = searchUtil.radioType;

    //搜索功能
    vm.search = function () {
        $state.go($state.current,{
            name:vm.keyWord,
            data:JSON.stringify(vm.options)
        },{reload: true});
    };
    //清空功能
    vm.empty = function () {
        vm.data = searchUtil.dataDelete(vm.options);
        $state.go($state.current, {
            page: 1,
            size:10,
            name:"",
            data:null
        }, {reload: true});
    };
    //分页功能
    vm.paginationConf = {
        currentPage: vm.data.page||1,
        itemsPerPage: vm.data.size||10,
        showFlag:0,
        onChange:function () {
            $state.go('myApp.jobList', {
                page: vm.paginationConf.currentPage,
                size: vm.paginationConf.itemsPerPage
            }, {reload: true});
        }};


    // 判断是最新职位列表还是推荐职位列表，请求不同的数据
    if (vm.params.judge==='true') {
        vm.title="最新职位";
        vm.type=0;
    }
    else if (vm.params.judge==='false') {
        vm.title="推荐职位";
        vm.type=1;
    }
    //请求数据
    portService.getSearchJob(vm.type,vm.data).then(function successCallback(response) {
        if (response.data.code === 0) {
            vm.jobList = response.data.data;
            console.log("推荐职位列表",vm.jobList);
            vm.paginationConf.totalItems = response.data.total;
            //判断暂无数据是否出现的条件，当totalItems为0或者未定义时出现
            vm.paginationConf.showFlag = !vm.paginationConf.totalItems;
        }
    });

    //获取展示四个最新发布的推荐职位
    portService.getSearchJob(1,"").then(function successCallback(response) {
        if (response.data.code === 0) {
            vm.noJobRecommendJob = response.data.data.slice(0,4);
            console.log("获取展示四个最新发布的推荐职位",vm.noJobRecommendJob)
        }
    });
}]);
