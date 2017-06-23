/**
 * Created by Administrator on 2017/6/7 0007.
 */
app.controller('aboutCtrl', function ($scope,$rootScope,$state,commonUtil) {
    var vm = this;
    commonUtil.scrollTo(0, 0);
    vm.toggle = $state.params.status !== "false";
});

