/**
 * Created by Administrator on 2017/6/19 0019.
 */
app.controller('mainCtrl', ['$scope', '$rootScope', '$state',
    function ($scope, $rootScope, $state) {
        var vm = this;
        // html界面检测url中的值
        $rootScope.$state = $state;
        console.log($state);
        // console.log(vm.$state.current);

    }]);