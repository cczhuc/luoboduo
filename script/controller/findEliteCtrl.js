/**
 * Created by Administrator on 2017/6/9 0009.
 */
app.controller("findEliteCtrl",["portService",'$state',
    function (portService,$state) {
        var vm = this;
        //轮播图设置
        vm.myInterval = 3000;//轮播图自动播放时间
        vm.active = 0;
        //轮播图设置结束
        //请求轮播数据
        portService.getBanner(2).then(function successCallback(response) {
            if (response.data.code === 0) {
                vm.findEliteBannerList = response.data.data.articleList;
                console.log(vm.findEliteBannerList);
            }
        });

        // portService.getSearchCompany(0).then(function successCallback(response) {
        //     if (response.data.code === 0){
        //         vm.findEliteSuccessCaseApp = response.data.approvedCompanyList;
        //         console.log('已认证',vm.findEliteSuccessCaseApp);
        //         vm.findEliteSuccessCaseNor = response.data.normalCompanyList;
        //         console.log('未认证', vm.findEliteSuccessCaseNor);
        //         vm.findEliteSuccessCase = vm.findEliteSuccessCaseApp.concat(vm.findEliteSuccessCaseNor).slice(0,8);
        //         console.log('已认证不足未认证补充',vm.findEliteSuccessCase);
        //     }
        // })


        //接口有问题，只能获取普通公司，暂时用着
        portService.getSearchCompany(0).then(function successCallback(response) {
            if (response.data.code === 0){
                vm.findEliteSuccessCase = response.data.data.slice(0,8);

            }
        })
    }]);