/**
 * Created by Administrator on 2017/6/9 0009.
 */
app.controller("findEliteCtrl",["portService",
    function (portService) {
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
            else {
                bootbox.alert({
                    buttons: {
                        ok: {
                            label: '关闭',
                            className: 'btn-danger'
                        }
                    },
                    message: '轮播图：' + res.data.message,
                    title: "提示"
                });
            }
        });

        portService.getSearchCompany(0).then(function successCallback(response) {
            if (response.data.code === 0){
                vm.findEliteSuccessCase = response.data.data.slice(0,8);

            }
            else {
                bootbox.alert({
                    buttons: {
                        ok: {
                            label: '关闭',
                            className: 'btn-danger'
                        }
                    },
                    message: '搜索公司：' + res.data.message,
                    title: "提示"
                });
            }
        })
    }]);