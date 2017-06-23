app.controller("companyDetailsCtrl",["portService","$scope","$state","commonUtil",
    function (portService,$scope,$state,commonUtil) {
        var vm = this;

        vm.params = $state.params;
        portService.getCompanyDetails(vm.params.id).then(function successCallBack(response) {
            if(response.data.code === 0) {
                vm.companyInfo = response.data.data;
            }
            else {
                bootbox.alert({
                    buttons: {
                        ok: {
                            label: '关闭',
                            className: 'btn-danger'
                        }
                    },
                    message: '职位详情：' + response.data.message,
                    title: "提示"
                });
            }
        });
    }
]);
