'use strict';
app.factory('commonUtil', function ($rootScope, $state, searchOptions, $location) {
    return {
        pageDefault: {page: 1, size: 10, next: true},

        //跳转界面位置
        scrollTo: function (x, y) {
            window.scrollTo(x, y);
        },
        //最新/推荐跳转
        judegeJobList: function (judegeData) {
            if (judegeData.params.n === "false") {
                $rootScope.recommendAndNewJob = "推荐职位";
                judegeData.params.n = null;
                judegeData.positionType = 1;
            }
            else if (judegeData.params.n === "true") {
                $rootScope.recommendAndNewJob = "最新职位";
                judegeData.params.n = null;
                judegeData.positionType = 0;
            }
            return judegeData;
        },
        //最新职位切分
        newJobRule: function (bannerListArray) {
            var number = bannerListArray.length;
            var i = 0;
            if (number < 20) {
                var coloneNum = Math.ceil(20 / number);
                var arr = [];
                for (i = 0; i < coloneNum; i++) {
                    arr = arr.concat(bannerListArray);
                }
                arr.length = 20;
                bannerListArray = arr
            } else {

            }
            var bannerArr = [];
            for (i = 0; i < 5; i++) {
                bannerArr[i] = bannerListArray.slice(0, 4);
                bannerListArray.splice(0, 4)
            }
            return bannerArr;
        },
        judegesessionStorage: function (judge, data) {
            var dataCopy = angular.copy(data);
            if (judge === undefined) {
                var options = dataCopy;
            } else {
                options = JSON.parse(judge);
            }
            return options;
        },

        // 判断找不到页面或找不到内容
        judgeNotFind: function (data) {
            if (data.code < 0 || data.data.length === 0) {
                return true;
            }
        },

        // 判断选中的数量
        selectedNum: function (data) {
            var i = 0;
            data.forEach(function (item) {
                if (item.choose === true) {
                    i++;
                }
            });
            return i;
        },

        // 判断需要展开详情的类目
        judgeShowCategoryDetail: function (data) {
            for (var x = 0; x < 12; x++) {
                if (data[x].choose === true) {
                    return x;
                }
            }
        },
        shareFn: function (type, url, companyName, title, picurl) {
            console.log(url);
            console.log(type);
            switch (type) {
                case "sqq":
                    window.open('http://connect.qq.com/widget/shareqq/index.html?url=' + url + '&title=' + companyName + '&showcount=0&desc=&summary=' + title + '&pics=' + picurl, 'newwindow');
                    break;
                case "tsina":
                    window.open('http://v.t.sina.com.cn/share/share.php?title=萝卜多-知根知底的社群招聘  ' + companyName + ' 在招职位：' + title + '&url=' + url + '&content=utf-8&sourceUrl=' + url + '&pic=' + picurl, 'newwindow');
                    break;
            }
        },
        //人才报告下的share
        shareFn2: function (type, url, title, picurl) {
            switch (type) {
                case "weixin":
                    break;
                case "sqq":
                    window.open('http://connect.qq.com/widget/shareqq/index.html?url=' + url + '&title=萝卜多-知根知底的社群招聘  人才报告：' + title + '&showcount=0&desc=&summary=' + title + '&pics=' + picurl, 'newwindow');
                    break;
                case "tsina":
                    window.open('http://v.t.sina.com.cn/share/share.php?title=萝卜多-知根知底的社群招聘  人才报告：' + title + '&url=' + url + '&content=utf-8&sourceUrl=' + url + '&pic=' + picurl, 'newwindow');
                    break;

            }
        },
        //技能树操作
        changeSkillTree: function (obj, arr) {
            angular.forEach(obj, function (data, key) {
                if (arr.indexOf(data.priority) === -1 && data.parentId != 0) {
                    delete obj[key]
                }
            });
            return obj
        },
        //单个的数据，转为数字
        changeTONumber2: function (data) {
            return angular.forEach(data, function (item, name) {
                return data[name] = !isNaN(item) && item != "" ? +item : item;
            })
        },
        //人才报告，显示转换
        changeReportPro2: function (num) {
            switch (num) {
                case 3:
                case 4:
                case 5:
                case 6:
                    return [{text: '开发效率', max: 100}, {text: '流程规范', max: 100}, {text: '业务知识', max: 100}, {text: '团队协作', max: 100}];
                case 1:
                    return [{text: '搭建效率', max: 100},  {text: '流程规范', max: 100},{text: '业务知识', max: 100}, {text: '团队协作', max: 100}];
                case 2:
                    return [{text: '市场调研', max: 100}, {text: '流程规范', max: 100}, {text: '产品设计', max: 100},{text: '团队协作', max: 100}];
                case 0:
                   return [{text: 'android', max: 100}, {text: 'h5', max: 100},{text: 'ios', max: 100}, {text: 'web', max: 100}];
            }
        },
        //1.转换为百度脑图需要的格式
        skillToJson: function (arr, template, theme) {
            var json = {
                "root": {},
                "template": template || "default",
                "theme": theme || "fresh-blue"
            };
            var color = {
                1: '#a6a6a6',
                2: '#ffffff',
                3: '#9bbb59',
                4: '#4bacc6',
                5: '#8064a2',
                6: '#f79646'
            };
            var rootItem = arr.filter(function (item) {
                return item.parentId == '' || item.parentId === "0";
            })[0];

            json.root = {
                data: {id: rootItem.id, text: rootItem.name, note: rootItem.content},
                children: []
            };
            mapJson(json.root);

            function mapJson(json) {
                var pid = '';

                if (json.data) {
                    pid = json.data.id;
                }

                angular.forEach(arr, function (item) {
                    if (item.parentId == pid) {
                        json.children.push({
                            data: {
                                id: item.id,
                                text: item.name,
                                note: item.content,
                                background: color[item.priority],
                                sort: item.sort,
                            }, children: []
                        });
                    }
                });
                json.children = json.children.sort(function (a, b) {
                    return a.data.sort - b.data.sort;
                });

                if (json.children && json.children.length > 0) {
                    angular.forEach(json.children, function (item) {
                        mapJson(item);
                    })
                }
            }

            return json;
        }
    }


})

    .factory("datePickerUtils", ["$filter", function ($filter) {
        return {
            isDate: function (obj) {
                return Object.prototype.toString.call(obj) === "[object Date]";
            },

            buildDates: function (date, options) {
                var dates = [],
                    lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0, 3);

                options = options || {};
                date = new Date(date);

                while (date.getDay() !== options.weekStartsOn) {
                    date.setDate(date.getDate() - 1);
                }

                for (var i = 0; i < 42; i++) { // 42 == 6 rows of dates
                    if (options.noExtraRows && date.getDay() === options.weekStartsOn && date > lastDate) break;

                    dates.push(new Date(date));
                    date.setDate(date.getDate() + 1);
                }

                return dates;
            },

            buildDayNames: function (weekStartsOn) {
                var dayNames = ['日', '一', '二', '三', '四', '五', '六'];

                if (weekStartsOn) {
                    dayNames = dayNames.slice(0);
                    for (var i = 0; i < weekStartsOn; i++) {
                        dayNames.push(dayNames.shift());
                    }
                }
                return dayNames;
            },

            monthCourse: function (start, end) {
                var months = [];
                start = new Date(start);
                end = new Date(end);
                var differ = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
                for (var i = 0; i < differ; i++) {
                    var newMonth = new Date(start.getFullYear(), start.getMonth() + i, 1);
                    months.push($filter('date')(newMonth, 'yyyy-MM'));
                }
                return months;
            },

            getMonthDate: function (year, month) {
                return new Date(year, month + 1, 0).getDate();
            },

            getDateByTime: function (date, time) {
                var year = new Date(date).getFullYear();
                var month = new Date(date).getMonth();
                var day = new Date(date).getDate();
                var hours = new Date(time).getHours();
                var minutes = new Date(time).getMinutes();

                if (!date || !time) {
                    return "";
                } else {
                    return new Date(year, month, day, hours, minutes).getTime();
                }

            }
        };
    }])
    .factory('searchUtil', function () {
        return {
            //搜索多选
            checkboxMulti: function (ind, arr) {
                if (ind === 0) {
                    // 如果点击的为不限这个选项的话，此时让其余的都为false，不限为true
                    // forEach()：对数组中的每一项运行给定函数，这个方法没有返回值。
                    arr.forEach(function (item) {
                        item.choose = false
                    });
                    arr[0].choose = true
                } else {
                    // 否则让不限为true。其余的每点击一次会相应改变
                    arr[ind].choose = !arr[ind].choose;
                    arr[0].choose = false;
                    // every检测数组中的每一项是否符合条件,全部为true是返回true
                    // 如果没有任何在一个值为true，让不限为true
                    if (arr.every(function (item) {
                            return item.choose === false
                        })) {
                        arr[0].choose = !arr[0].choose;
                    }
                }
            },
            //搜索单选
            radioType: function (ind, arr) {
                arr[ind].choose = !arr[ind].choose;
                arr.forEach(function (item, index) {
                    if (index !== ind) {
                        item.choose = false
                    }
                    else if (arr.every(function (item) {
                            return item.choose == false
                        })) {
                        arr[0].choose = true;
                    }
                })
            },
            //数据转数组
            dataConvert: function (data) {
                //转换为字符串
                var asdas = {};
                var dataname;
                for (dataname in data) {
                    // 通过方括号来访问属性，这个优点主要是可以通过变量来访问属性
                    // filter():对数组中的每一项运行给定函数，返回该函数会返回true的项组成的数组。
                    //这样就将不限这一元素全部选出
                    asdas[dataname] = data[dataname].filter(function (item, index) {
                        return item.choose === true
                    });
                    // map():对数组中每一项运行给定函数，返回每次函数调用的结果组成的函数。
                    // 给asdas对象中的数组（对象组成）赋予type，此时数组中的对象的名字就是type，有choose和name这个属性
                    asdas[dataname] = asdas[dataname].map(function (item) {
                        return item.type
                    });
                   // 将数组的每个元素转换为字符串，并将它们依次连接起来，两个元素之间用英文逗号作为分隔符进行拼接。
                    asdas[dataname] = asdas[dataname].toString();
                }
                return asdas;
            },
            //清空搜索数据
            dataDelete: function (option) {
                angular.forEach(option, function (data) {
                    angular.forEach(data, function (data1) {
                        if (data1.choose) {
                            data1.choose = false
                        }
                        if (data1.name == '不限') {
                            data1.choose = true
                        }
                    })
                })
            },
            //hiringJobs页 搜索数据转换
            jobclassifyactivesChange: function (obj) {
                // 过滤出选中的搜tag
                var data = obj.filter(function (item) {
                    return (item.choose === true);
                });
                // 搜索tag的格式转换
                data = data.map(function (item) {
                    return item.type
                });
                return data.toString();
            },
            //findElite数据转换
            //转换服务器上接收到的string为数字
            changeToNumber: function (data) {
                return angular.forEach(data, function (item, name) {
                    return data[name] = !isNaN(item) && item != "" ? +item : item;
                })
            },
            //转换字符串数组为数组
            changeToArry: function (data, pname) {
                angular.forEach(data, function (item) {
                    item[pname] = JSON.parse(item[pname])
                })
                return data
            }

        }
    });

