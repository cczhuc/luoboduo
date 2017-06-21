app.factory("portService",function ($http,address) {
    return {
        // 获取banner图,type  0-首页 1-找职位 2-找精英
        getBanner: function (type) {
            return $http.get(address.banner_url(type))
        },

        //默认搜索最新职位
        getSearchJob: function (type,data) {
            return $http.get(address.searchJob_url(type||0),{params:data})
        },
        //默认不区分认证公司与非认证公司
        getSearchCompany: function (type,data) {
            return $http.get(address.searchCompany_url(type||""),{params:data})
        },
        //职位详情
        getJobDetails: function (id) {
            return $http.get(address.jobDetails_url(id))
        },
        //公司详情
        getCompanyDetails: function (id) {
            return $http.get(address.companyDetails_url(id))
        }
    }
});