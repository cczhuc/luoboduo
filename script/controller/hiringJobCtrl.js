app.controller("hiringJobCtrl",["portService","$scope","$state",
    function (portService,$scope,$state) {
        var vm = this;
        vm.params = $state.params;
        vm.params.companyId = $state.params.id;
        console.log(vm.params);

        vm.params.page = $state.params.page;
        vm.params.size = $state.params.size;
        //分页插件设置
        vm.paginationConf = {
            currentPage: vm.params.page||1,
            itemsPerPage: vm.params.size||10,
            showFlag:0,
            onChange:function () {
                $state.go('myApp.companyInfo.hiringJob', {
                    page: vm.paginationConf.currentPage,
                    size: vm.paginationConf.itemsPerPage
                }, {reload: true});
            }};

        portService.getSearchJob("",vm.params).then(function successCallBack(response) {
            console.log(response);
            if(response.data.code===0) {
                vm.hiringJob = response.data.data;
                console.log("公司热招职位",vm.hiringJob);
                vm.paginationConf.totalItems = response.data.total;
                //判断暂无数据是否出现的条件，当totalItems为0或者未定义时出现
                vm.paginationConf.showFlag = !vm.paginationConf.totalItems;
            }
        });
    }
]);
