app.controller("findJobCtrl",["portService","$scope","$state",
    function (portService,$scope,$state) {
        var vm = this;
        //轮播图设置
        vm.myInterval = 3000;//轮播图自动播放时间
        vm.active = 0;
        // var currIndex = 0;
        // vm.slides = [];//初始化
        //轮播图设置结束
        //请求轮播数据
        portService.getBanner(1).then(function successCallback(response) {
            if (response.data.code===0) {
                vm.findJobBannerList= response.data.data.articleList;
                console.log(vm.findJobBannerList);
                // //轮播图函数
                // vm.addSlide = function() {
                //     for(var i=0;i<vm.findJobBannerList.length;i++){
                //         vm.slides.push({
                //             imgurl: vm.findJobBannerList[i].img,
                //             url:vm.findJobBannerList[i].url,
                //             id: currIndex++
                //         });
                //         console.log("vm.slides",vm.slides);
                //     }
                // };
                // vm.addSlide();
                // console.log("vm.slides",vm.slides);
            }
        });

}]);
