/**
 * Created by cc on 2017/6/8.
 */
app.controller("searchJobCtrl",["portService","$scope","$state",'searchOptions','searchUtil',"commonUtil",
function (portService,$scope,$state,searchOptions,searchUtil,commonUtil) {
    var vm=this;
    commonUtil.scrollTo(0, 0);
    vm.params = $state.params;//
    //将从其余页面传来的name展示出来。
    vm.keyWord = vm.params.name;
    //将常量在搜索栏渲染出来
    var searchOptionsCopy = angular.copy(searchOptions);
    // 获取搜索模块的基础数据
    // 使用state.params来实现
    if(vm.params.data===null) {
        vm.options=searchOptionsCopy;
        vm.data = searchUtil.dataDelete(vm.options);
    }
    else {
        vm.options=JSON.parse(vm.params.data);
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
            $state.go('myApp.search.searchJob', {
                page: vm.paginationConf.currentPage,
                size: vm.paginationConf.itemsPerPage
            }, {reload: true});
        }};

    //获取职位信息
    portService.getSearchJob(0,vm.data).then(function successCallback(response) {
        if (response.data.code === 0) {
            vm.jobList = response.data.data;
            vm.paginationConf.totalItems = response.data.total;
            //判断暂无数据是否出现的条件，当totalItems为0或者未定义时出现
            vm.paginationConf.showFlag = !vm.paginationConf.totalItems;
        }
        else {
            bootbox.alert({
                buttons: {
                    ok: {
                        label: '关闭',
                        className: 'btn-danger'
                    }
                },
                message: '搜索职位：' + response.data.message,
                title: "提示"
            });
        }
    });
    //获取展示四个最新发布的推荐职位
        portService.getSearchJob(1,"").then(function successCallback(response) {
            if (response.data.code === 0) {
                vm.noJobRecommendJob = response.data.data.slice(0,4);
            }
            else {
                bootbox.alert({
                    buttons: {
                        ok: {
                            label: '关闭',
                            className: 'btn-danger'
                        }
                    },
                    message: '推荐职位：' + response.data.message,
                    title: "提示"
                });
            }
        });
}]);