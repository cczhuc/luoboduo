/**
 * Created by Administrator on 2017/6/7 0007.
 */
app.controller('aboutCtrl', function ($scope,$rootScope,$state) {
    var vm = this;
    vm.toggle = $state.params.status !== "false";

});

