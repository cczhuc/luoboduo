app.controller("companyInfoCtrl",["portService","$scope","$state",
    function (portService,$scope,$state) {
        var vm = this;
        vm.params = $state.params;
        portService.getCompanyDetails(vm.params.id).then(function successCallBack(response) {
            if(response.data.code===0) {
                vm.companyInfo = response.data.data;
                console.log("公司相关信息",vm.companyInfo)
            }
        });
        //不同的布尔值,显示默认的选项
        if (window.location.href.indexOf("hiringJob") >= 0) {
            vm.jduge = true;
        }
        else {
            vm.jduge = false;
        }

        //点击添加class
        vm.exchange0 = function () {
            vm.jduge=false;
        };
        vm.exchange1 =function () {
            vm.jduge=true;
        };
    }
]);
