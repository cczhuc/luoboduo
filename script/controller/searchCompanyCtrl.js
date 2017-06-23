app.controller("searchCompanyCtrl",["portService","$scope","$state",'searchOptions','searchUtil','commonUtil',
    function (portService,$scope,$state,searchOptions,searchUtil,commonUtil) {
        var vm=this;
        commonUtil.scrollTo(0, 0);
        vm.params = $state.params;//
        //将从其余页面传来的name展示出来。
        vm.companyKeyWords = vm.params.name;
        // 获取搜索模块的基础数据
        // 使用state.params来实现
        if(vm.params.data===null) {
            vm.options=searchOptions;
            vm.data = searchUtil.dataDelete(vm.options);
        }
        else {
            vm.options=JSON.parse(vm.params.data);
        }

        vm.data = searchUtil.dataConvert(vm.options);//在factory中的js文件已详细说明这一步骤的原理

        // 分页部分加拼凑部分
        vm.data.page = vm.params.page||1;
        vm.data.size = vm.params.size||9;
        vm.data.name = vm.params.name;

        //标签多选
        vm.checkboxMulti = searchUtil.checkboxMulti;

        //搜索功能
        vm.search = function () {
            $state.go($state.current,{
                name:vm.companyKeyWords,
                data:JSON.stringify(vm.options)
            },{reload: true});
        };
        //清空功能
        vm.empty = function () {
            vm.data = searchUtil.dataDelete(vm.options);
            $state.go($state.current, {
                page: 1,
                size:9,
                name:"",
                data:null
            }, {reload: true});
        };
        //分页功能
        vm.paginationConf = {
            currentPage: vm.data.page||1,
            itemsPerPage: vm.data.size||9,
            showFlag:0,
            onChange:function () {
                $state.go('myApp.search.searchCompany', {
                    page: vm.paginationConf.currentPage,
                    size: vm.paginationConf.itemsPerPage
                }, {reload: true});
            }
        };
        // 获取数据
        portService.getSearchCompany("",vm.data).then(function successCallBack(response){
            if(response.data.code===0) {
                vm.companyList = response.data.data;
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
                    message: '搜索公司：' + response.data.message,
                    title: "提示"
                });
            }
        });
        // 无数据时推荐公司
        portService.getSearchCompany("","").then(function successCallBack(response){
            if(response.data.code===0) {
                vm.recommendedCompany = response.data.data.slice(0,3);
            }
            else {
                bootbox.alert({
                    buttons: {
                        ok: {
                            label: '关闭',
                            className: 'btn-danger'
                        }
                    },
                    message: '推荐公司：' + response.data.message,
                    title: "提示"
                });
            }
        })
    }]);
