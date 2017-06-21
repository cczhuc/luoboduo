app.controller("jobDetailsCtrl",["portService","$scope","$state",
    function (portService,$scope,$state) {
        var vm = this;
        vm.params = $state.params;
        console.log(vm.params);
        portService.getJobDetails(vm.params.id).then(function successCallBack(response) {
            if (response.data.code===0) {
                vm.jobDetail = response.data.data;
                console.log("职位详情",vm.jobDetail);
            }
            var $config = {
                url: 'http://luoboduo.com/findJob', // 网址，默认使用 window.location.href
                source: '', // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
                title: vm.jobDetail.companyName, // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
                weiboTitle:"萝卜多-知根知底的社群招聘  "+ vm.jobDetail.companyName+"  在招职位：  "+vm.jobDetail.name,
                description: vm.jobDetail.name, // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
                image: vm.jobDetail.logo, // 图片, 默认取网页中第一个img标签
                sites: ['wechat', 'qq', 'weibo'], // 启用的站点
                wechatQrcodeTitle: "微信扫一扫：分享", // 微信二维码提示文字
                wechatQrcodeHelper: '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>'
            };
            $('.social-share').share($config)
        });
}]);
