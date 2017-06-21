/**
 * name: tm.pagination
 * Version: 1.0.0 beta
 */

angular.module('tm.pagination', []).directive('tmPagination',[function(){
    return {
        restrict: 'EA',
        templateUrl:'script/directors/tm.pagination/tm.pagination.html',
        replace: true,
        scope: {
            conf: '='
        },
        link: function(scope, element, attrs) {

            var conf = scope.conf;

            // 默认分页长度
            var defaultPagesLength = 5;

            // 默认每页的个数
            var defaultPerPage = 10;//没用，已在list.js中定义

            // 获取分页长度
            if(conf.pagesLength) {//为空、数值0、null、NaN、undefined的话是flase，为非零数值或者字符串的话ture
                // 判断一下分页长度
                conf.pagesLength = parseInt(conf.pagesLength, 10);


                if(!conf.pagesLength) {//为空、数值0、null、NaN、undefined的话就执行下列语句
                    conf.pagesLength = defaultPagesLength;
                }

                // 分页长度必须为奇数，如果传偶数时，自动处理
                if(conf.pagesLength % 2 === 0) {
                    conf.pagesLength += 1;
                }

            } else {
                conf.pagesLength = defaultPagesLength
            }

            // pageList数组
            function getPagination(newValue, oldValue) {
                // conf.currentPage
                if(conf.currentPage) {//为非零数值或者字符串的话ture
                    conf.currentPage = parseInt(scope.conf.currentPage, 10);
                }

                if(!conf.currentPage) {//为空、数值0、null、NaN、undefined的话就执行下列语句
                    conf.currentPage = 1;
                    console.log(conf.currentPage)
                }

                // conf.totalItems
                if(conf.totalItems) {//为非零数值或者字符串的话ture
                    conf.totalItems = parseInt(conf.totalItems, 10);
                }

                // conf.totalItems

                if(!conf.totalItems) {//为空、数值0、null、NaN、undefined的话就执行下列语句
                    conf.totalItems = 0;
                    return;
                }

                // conf.itemsPerPage ，//没用，已在list.js中定义
                if(conf.itemsPerPage) {//为非零数值或者字符串的话ture
                    conf.itemsPerPage = parseInt(conf.itemsPerPage, 10);
                }
                if(!conf.itemsPerPage) {//为空、数值0、null、NaN、undefined的话就执行下列语句
                    conf.itemsPerPage = defaultPerPage;
                }

                // numberOfPages，得出要分几页，并将结果向上取整
                conf.numberOfPages = Math.ceil(conf.totalItems/conf.itemsPerPage);

                // 如果分页总数>0，并且当前页大于分页总数
                if(scope.conf.numberOfPages > 0 && scope.conf.currentPage > scope.conf.numberOfPages){
                    scope.conf.currentPage = scope.conf.numberOfPages;
                }


                // 页码相关，
                scope.pageList = [];
                if(conf.numberOfPages <= conf.pagesLength){
                    // 判断总页数如果小于等于分页的长度，若小于则直接显示
                    for(var i =1; i <= conf.numberOfPages; i++){
                        scope.pageList.push(i);
                    }
                }else{
                    // 总页数大于分页长度（此时分为三种情况：1.左边没有...2.右边没有...3.左右都有...）
                    // 计算中心偏移量
                    var offset = (conf.pagesLength - 1) / 2;
                    if(conf.currentPage <= offset){
                        // 左边没有...
                        for(i = 1; i <= offset + 1; i++){
                            scope.pageList.push(i);
                        }
                        scope.pageList.push('...');
                        // scope.pageList.push(conf.numberOfPages);
                    }else if(conf.currentPage > conf.numberOfPages - offset){
                        // scope.pageList.push(1);
                        scope.pageList.push('...');
                        for(i = offset + 1; i >= 1; i--){
                            scope.pageList.push(conf.numberOfPages - i);
                        }
                        scope.pageList.push(conf.numberOfPages);
                    }else{
                        // 最后一种情况，两边都有...
                        // scope.pageList.push(1);
                        scope.pageList.push('...');

                        for(i = Math.ceil(offset / 2) ; i >= 1; i--){
                            scope.pageList.push(conf.currentPage - i);
                        }
                        scope.pageList.push(conf.currentPage);
                        for(i = 1; i <= offset / 2; i++){
                            scope.pageList.push(conf.currentPage + i);
                        }

                        scope.pageList.push('...');
                        // scope.pageList.push(conf.numberOfPages);
                    }
                }
                scope.$parent.conf = conf;
            }

            // prevPage
            scope.prevPage = function() {
                if(conf.currentPage > 1){
                    conf.currentPage -= 1;
                }
                getPagination();
                conf.onChange();

            };
            //firstPage
            scope.firstPage = function() {
                if (conf.currentPage == 1) {
                    return
                }
                else {
                    conf.currentPage = 1;
                    getPagination();
                    conf.onChange();
                }
            };
            //lastPage
            scope.lastPage = function() {
                if (conf.currentPage == conf.numberOfPages) {
                    return
                }
                else {
                    conf.numberOfPages = Math.ceil(conf.totalItems/conf.itemsPerPage);
                    conf.currentPage = conf.numberOfPages;
                    getPagination();
                    conf.onChange();

                }
            };
            // nextPage
            scope.nextPage = function() {
                if(conf.currentPage < conf.numberOfPages){
                    conf.currentPage += 1;
                }
                getPagination();
                conf.onChange();

            };

            // 变更当前页
            scope.changeCurrentPage = function(item) {
                if(item === '...'||conf.currentPage == item){
                    return;
                }else{
                    conf.currentPage = item;
                    getPagination();
                    conf.onChange();
                }
            };
            //对输入框文本进行限制，只能输入数字，且不能大于
            scope.changePerPage = function () {
                scope.conf.itemsPerPage = scope.conf.itemsPerPage.replace(/[^0-9]/g, '');
            };
            scope.changeInput = function () {
                scope.jumpPageNum = scope.jumpPageNum.replace(/[^0-9]/g, '');
                // if (scope.jumpPageNum > conf.numberOfPages) {
                //     scope.jumpPageNum = conf.numberOfPages;
                // }
            };

            // 跳转页
            scope.jumpPage = function() {
                var num = scope.jumpPageNum;
                if(num) {
                        console.log(num);
                        num = parseInt(num, 10);
                        if(num && num != conf.currentPage) {
                            if(num > conf.numberOfPages) {
                                conf.numberOfPages = Math.ceil(conf.totalItems/conf.itemsPerPage);
                                // num = conf.numberOfPages;
                            }
                        }
                }
                // 跳转
                conf.currentPage = num;
                conf.itemsPerPage= scope.conf.itemsPerPage;
                getPagination();
                conf.onChange();
                scope.jumpPageNum = '';
            };
            scope.$watch('conf.totalItems', function(value, oldValue) {
                // 在无值或值相等的时候，去执行onChange事件
                // if(!value || value === oldValue) {
                //     // if(conf.onChange) {
                //     //     conf.onChange();
                //     // }
                // }
                getPagination();
                // conf.onChange()
            })
        }
    };
}]);
