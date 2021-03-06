app.factory("address",function ($state,$http){
    return {
        // 获取banner图,type  0-首页 1-找职位 2-找精英
        banner_url: function (type) {
            return "/carrots-ajax/a/article/search?type="+type
        },

        //搜索职位, 职位状态 recommend  0-最新职位 1-推荐职位
        searchJob_url: function (type) {
            return "/carrots-ajax/a/profession/search?recommend="+type
        },
        //搜索公司, 认证状态  approvedStatus 0-未认证 1-已认证
        searchCompany_url: function (type) {
            return "/carrots-ajax/a/company/search?returnPage="+type
        },
        //职位详情
        jobDetails_url: function (id) {
            return "/carrots-ajax/a/profession/"+id
        },
        //公司详情
        companyDetails_url: function (id) {
            return "/carrots-ajax/a/company/"+id
        }

    }
});
