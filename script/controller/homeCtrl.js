/**
 * Created by Administrator on 2017/6/6 0006.
 */
app.controller("homeCtrl",["portService",'$state',
    function (portService,$state) {
        var vm = this;
        //轮播图设置
        vm.myInterval = 3000;//轮播图自动播放时间
        vm.active1 = 0;

        //轮播图设置结束
        //请求轮播数据
        //首页banner轮播
        portService.getBanner(0).then(function successCallback(response) {
            if (response.data.code === 0) {
                vm.homeBannerList = response.data.data.articleList;
                console.log('homebanner',vm.homeBannerList);
            }
        });


    }]);
// 最新职位轮播
//需要请求数据，分组再轮播
app.controller('newJobCtrl', function ($scope,$http,$state,portService) {
    $scope.myInterval = 3000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    $state.params.size = 20;
    var slides = $scope.slides = [];
    var currIndex = 0;
    //请求数据再切分数组
    portService.getSearchJob(0,$state.params).then(function (res) {
        $scope.a = res.data.data;
        console.log('职位详情轮播',$scope.a);
        $scope.arr = [];
        $scope.x = [];
        $scope.a4=function(){
            for(q=0;q<$scope.a.length;q=q+4){
                console.log($scope.x);
                $scope.x=[$scope.a[q],$scope.a[q+1],$scope.a[q+2],$scope.a[q+3]];
                for(z=0;z<4;z++){
                    if($scope.x[z]==undefined){
                        $scope.x.splice(z,4-z);
                    }
                }
                $scope.arr.push($scope.x);
            }
        };

        $scope.a4();
        $scope.addSlide = function() {
            slides.push({
                id: currIndex,//页数
                div:$scope.arr[currIndex]//被切换的视图
            });
            currIndex++;
            console.log(slides)
        };

        for (var i = 0; i < $scope.a.length; i+=4) {
            $scope.addSlide();
        }
    });
});
