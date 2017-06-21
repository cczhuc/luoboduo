app.controller("searchCtrl",["$scope","$state",function ($scope,$state) {
    var vm=this;
    vm.params = $state.params;
    //判断从哪里跳转来，赋予给其不同的布尔值
    if (vm.params.judge===false){
        vm.jduge = false;
    }
    else {
        vm.jduge = true;
    }


    //点击添加class
    vm.exchange0 = function () {
        vm.jduge=false;
    };
    vm.exchange1 =function () {
        vm.jduge=true;
    };


}]);
