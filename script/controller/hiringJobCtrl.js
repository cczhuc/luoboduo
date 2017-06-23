app.controller("hiringJobCtrl",["portService","$scope","$state","commonUtil",
    function (portService,$scope,$state,commonUtil) {
        var vm = this;

        vm.params = $state.params;
        vm.params.companyId = $state.params.id;
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
            if(response.data.code===0) {
                vm.hiringJob = response.data.data;
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
                    message: '在招职位：' + response.data.message,
                    title: "提示"
                });
            }
        });
    }
]);
