app.controller("findJobCtrl",["portService","$scope","$state","secondJobType","thirdJobType",
    function (portService,$scope,$state,secondJobType,thirdJobType) {
        var vm = this;
        vm.params = $state.params;//
        vm.params.size = 8;
        // 搜索导航常量
        vm.secondType = secondJobType;
        vm.thirdType = thirdJobType;
        //轮播图设置
        vm.myInterval = 3000;//轮播图自动播放时间
        vm.active = 0;//找职位banner
        vm.active1 = 0;//推荐公司竖向轮播
        //轮播图设置结束
        //请求轮播数据
        portService.getBanner(1).then(function successCallback(response) {
            if (response.data.code === 0) {
                vm.findJobBannerList = response.data.data.articleList;
                console.log("banner图",vm.findJobBannerList);
            }
        });
        //最新职位/推荐职位
        //请求推荐职位数据
        portService.getSearchJob(1,vm.params).then(function successCallback(response) {
            if (response.data.code === 0) {
                vm.findJobRecommendJob = response.data.data;
                console.log("推荐职位",vm.findJobRecommendJob);
            }
        });
        //请求最新职位数据
        portService.getSearchJob(0,vm.params).then(function successCallback(response) {
            if (response.data.code === 0) {
                vm.findJobNewJob = response.data.data;
                console.log("最新职位",vm.findJobNewJob);
            }
        });
        // 通过ng-if来判定该显示推荐职位还是最新职位
        vm.changeJob = false;
        vm.exchange0 = function () {
            vm.changeJob=false;
        };
        vm.exchange1 = function () {
            vm.changeJob=true;
        };

        //请求最新认证公司信息
        portService.getSearchCompany("","").then(function successCallback(response) {
            console.log("最新认证公司信息",response);
            if (response.data.code === 0) {
                //最新认证公司
                vm.findJobRecommendCompany = response.data.data[0];
                console.log("最新认证公司",vm.findJobRecommendCompany);
            }
        });
        //请求最新发布过职位公司信息
        // 先请求最新职位
        // 先定义数组
        var array =[];
        var newArray = [];//去重之后的数组
        var normolCompany = [];
        var approvedCompany = [];
        var hirringJob = [];
        var array1=[];//存认证公司id用来获取热招职位

        // 先请求最新职位
        portService.getSearchJob(0,{size:100}).then(function successCallback(response) {
            if (response.data.code === 0) {
                //将职位的companyID取出来，放在一个数组。
                for (var i=0;i<response.data.data.length;i++) {
                    array.push(response.data.data[i].companyId);
                }
                // 将数组去重
                for (var n=0;n<array.length;n++) {
                    if(newArray.indexOf(array[n])===-1) {
                        newArray.push(array[n])
                    }
                }
                console.log("去重后公司ID数组",newArray);
            }
        })
            .then(function () {
                // 请求每个公司信息，区分认证与非认证
                // 因为ajax请求时异步的，所以这里用了递归，会稍微影响速度，但是没想到更好的办法，能让其
                // 输出数据的顺序和请求顺序相同
                var m=0;
                var k=0;
                var l=0;
                function getcompany() {
                    if (m>=newArray.length) {
                        return
                    }
                    portService.getCompanyDetails(newArray[m]).then(function successCallBack(response) {
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
                                array1.push(response.data.data.company.id);
                                m++;
                                vm.findJobApprovedCompany = approvedCompany.slice(0,4);
                                k++;
                                // 请求热招职位
                                portService.getSearchJob("",{companyId:array1[k-1]}).then(function successCallBack(response) {
                                    if (response.data.code===0) {
                                        console.log("k",k);
                                        console.log("l",l);
                                        hirringJob.push(response.data.data);
                                        console.log("在招职位",hirringJob);
                                        vm.findJobApprovedCompany[l].hirring = response.data.data;
                                        l++;
                                    }
                                });
                                getcompany();
                            }
                        }
                    })
                }
                getcompany();
            });
}]);


