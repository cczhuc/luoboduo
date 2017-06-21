app.controller("companyDetailsCtrl",["portService","$scope","$state",
    function (portService,$scope,$state) {
        var vm = this;
        vm.params = $state.params;
        portService.getCompanyDetails(vm.params.id).then(function successCallBack(response) {
            if(response.data.code===0) {
                vm.companyInfo = response.data.data;
                console.log("公司相关信息",vm.companyInfo)
            }
        });
    }
]);
