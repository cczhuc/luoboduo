app.controller("findJobCtrl",["portService","$scope","$state","secondJobType","thirdJobType",
    function (portService,$scope,$state,secondJobType,thirdJobType) {
        var vm = this;
        vm.params = $state.params;//
        vm.params.size = 8;
        // 搜索导航常量
        vm.secondType = secondJobType;
        vm.thirdType = thirdJobType;

        vm.myInterval = 3000;//轮播图自动播放时间
        vm.active = 0;//找职位banner
        vm.active1 = 0;//推荐公司竖向轮播

        //请求轮播数据
        portService.getBanner(1).then(function successCallback(response) {
            if (response.data.code === 0) {
                vm.findJobBannerList = response.data.data.articleList;
            }
            //bootbox的模态框
            else {
                bootbox.alert({
                    buttons: {
                        ok: {
                            label: '关闭',
                            className: 'btn-danger'
                        }
                    },
                    message: '轮播banner：' + response.data.message,
                    title: "提示"
                });
            }
        });
        //最新职位/推荐职位
        //请求推荐职位数据
        portService.getSearchJob(1,vm.params).then(function successCallback(response) {
            if (response.data.code === 0) {
                vm.findJobRecommendJob = response.data.data;
            }
            else {
                bootbox.alert({
                    buttons: {
                        ok: {
                            label: '关闭',
                            className: 'btn-danger'
                        }
                    },
                    message: '推荐职位：' + response.data.message,
                    title: "提示"
                });
            }
        });
        //请求最新职位数据
        portService.getSearchJob(0,vm.params).then(function successCallback(response) {
            if (response.data.code === 0) {
                vm.findJobNewJob = response.data.data;
            }
            else {
                bootbox.alert({
                    buttons: {
                        ok: {
                            label: '关闭',
                            className: 'btn-danger'
                        }
                    },
                    message: '最新职位：' + response.data.message,
                    title: "提示"
                });
            }
        });
        // 通过ng-if来判定该显示推荐职位还是最新职位
        vm.changeJob = false;
        vm.exchangeRecommend = function () {
            vm.changeJob=false;
        };
        vm.exchangeNew = function () {
            vm.changeJob=true;
        };

        //请求最新认证公司信息
        portService.getSearchCompany("","").then(function successCallback(response) {
            if (response.data.code === 0) {
                vm.findJobRecommendCompany = response.data.data[0];
            }
            else {
                bootbox.alert({
                    buttons: {
                        ok: {
                            label: '关闭',
                            className: 'btn-danger'
                        }
                    },
                    message: '最新认证公司：' + response.data.message,
                    title: "提示"
                });
            }
        });
        //请求最新发布过职位公司信息，先请求最新职位
        // 先定义数组
        var companyId =[];
        var norepeat = [];//去重之后的数组
        var normolCompany = [];
        var approvedCompany = [];
        var hirringJob = [];
        var approvedCompanyId=[];//存认证公司id用来获取热招职位

        // 先请求最新职位
        portService.getSearchJob(0,{size:100}).then(function successCallback(response) {
            if (response.data.code === 0) {
                //将职位的companyID取出来，放在一个数组。
                for (var i=0;i<response.data.data.length;i++) {
                    companyId.push(response.data.data[i].companyId);
                }
                // 将数组去重
                for (var n=0;n<companyId.length;n++) {
                    if(norepeat.indexOf(companyId[n])===-1) {
                        norepeat.push(companyId[n])
                    }
                }
            }
            else {
                bootbox.alert({
                    buttons: {
                        ok: {
                            label: '关闭',
                            className: 'btn-danger'
                        }
                    },
                    message: '最新职位：' + response.data.message,
                    title: "提示"
                });
            }
        })
            .then(function () {
                // 请求每个公司信息，区分认证与非认证
                // 中间变量，主要为了使得异步请求之后的数据能相对应上
                var m=0;
                var k=0;
                var l=0;
                function getcompany() {
                    if (m>=norepeat.length) {
                        return
                    }
                    portService.getCompanyDetails(norepeat[m]).then(function successCallBack(response) {
                        if (response.data.code===0) {
                            if (response.data.data.company.approved === 0) {
                                // 普通公司
                                normolCompany.push(response.data.data);
                                vm.findJobNormalCompany = normolCompany.slice(0,8);
                                m++;
                                getcompany();
                            }
                            else if (response.data.data.company.approved === 1) {
                                // 认证公司
                                approvedCompany.push(response.data.data);
                                approvedCompanyId.push(response.data.data.company.id);
                                m++;
                                vm.findJobApprovedCompany = approvedCompany.slice(0,4);
                                k++;
                                // 请求热招职位
                                portService.getSearchJob("",{companyId:approvedCompanyId[k-1]}).then(function successCallBack(response) {
                                    if (response.data.code===0&&l < 4) {
                                        hirringJob.push(response.data.data);
                                        vm.findJobApprovedCompany[l].hirring = response.data.data;
                                        l++;
                                    }
                                });
                                getcompany();
                            }
                        }
                        else {
                            bootbox.alert({
                                buttons: {
                                    ok: {
                                        label: '关闭',
                                        className: 'btn-danger'
                                    }
                                },
                                message: '推荐公司：' + response.data.message,
                                title: "提示"
                            });
                        }
                    })
                }
                getcompany();
            });
}]);


