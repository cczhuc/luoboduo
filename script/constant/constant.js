//找职位-搜索职位导航-二级分类
app.constant("secondJobType",{
    PM:[
        {type:0,name:"产品经理"},
        {type:0,name:"移动产品经理"},
        {type:0,name:"产品总监"},
        {type:0,name:"网页产品经理"},
        {type:0,name:"电商产品经理"}
    ],
    research:[
        {type:2,name:"PHP"},
        {type:2,name:"JAVA"},
        {type:2,name:"IOS"},
        {type:2,name:"HTML5"},
        {type:2,name:"WEB前端"},
        {type:2,name:"Andriod"}
    ],
    UI:[
        {type:3,name:"UI设计"},
        {type:3,name:"APP设计"},
        {type:3,name:"设计总监"},
        {type:3,name:"交互设计师"}
    ]
});
//找职位-搜索职位导航-三级分类（hover出现的关键字）
app.constant("thirdJobType",{
    PM:{
        PM1:[
            {type:0,name:"移动产品经理"},
            {type:0,name:"网页产品经理"},
            {type:0,name:"电商产品经理"},
            {type:0,name:"游戏策划"}
        ],
        PM2:[
            {type:0,name:"产品总监"},
            {type:0,name:"游戏策划"}
        ]
    },
    research:{
        research1:[
            {type:2,name:"WEB前端"},
            {type:2,name:"Flash"},
            {type:2,name:"Javascript"},
            {type:2,name:"HTML5"},
            {type:2,name:"其他"}
        ],
        research2:[
            {type:2,name:"Java"},
            {type:2,name:"Php"},
            {type:2,name:"C++"},
            {type:2,name:"Ruby"},
            {type:2,name:"Node.js"},
            {type:2,name:"Python"},
            {type:2,name:"其他"}
        ],
        research3:[
            {type:2,name:"HTML5"},
            {type:2,name:"Andriod"},
            {type:2,name:"ios"},
            {type:2,name:"wp"},
            {type:2,name:"其他"}
        ],
        research4:[
            {type:2,name:"测试工程师"},
            {type:2,name:"性能测试"},
            {type:2,name:"功能测试"},
            {type:2,name:"系统工程师"},
            {type:2,name:"其他"}
        ],
        research5:[
            {type:2,name:"运维工程师"},
            {type:2,name:"网络工程师"},
            {type:2,name:"系统工程师"},
            {type:2,name:"其他"}
        ],
        research6:[
            {type:2,name:"Java"},
            {type:2,name:"Php"},
            {type:2,name:"C++"},
            {type:2,name:"Ruby"},
            {type:2,name:"Node.js"},
            {type:2,name:"Python"},
            {type:2,name:"其他"}
        ]
    },
    UI:{
        UI1:[
            {type:3,name:"UI设计师"},
            {type:3,name:"平面设计师"},
            {type:3,name:"网页设计师"},
            {type:3,name:"APP设计师"}
        ],
        UI2:[
            {type:3,name:"网络交互设计师"},
            {type:3,name:"交互设计师"}
        ],
        UI3:[
            {type:3,name:"设计总监"},
            {type:3,name:"视觉设计主管"},
            {type:3,name:"交互设计主管"}
        ]
    }
});
//搜索面板部分所需过滤器
app.constant('searchOptions', {
    province: [
        {name: '不限', choose: true},
        {type: 1, name: '北京', choose: false}
    ],
    industry: [
        {name: '不限', choose: true},
        {type: 0, name: '移动互联网', choose: false},
        {type: 1, name: '电子商务', choose: false},
        {type: 2, name: '企业服务', choose: false},
        {type: 3, name: 'O2O', choose: false},
        {type: 4, name: '教育', choose: false},
        {type: 5, name: '金融', choose: false},
        {type: 6, name: '游戏', choose: false}
    ],
    compensation: [
        {name: '不限', choose: true},
        {type: 0, name: '8K以下', choose: false},
        {type: 1, name: '8K-15K', choose: false},
        {type: 2, name: '16K-25K', choose: false},
        {type: 3, name: '25K以上', choose: false}
    ],
    education: [
        {name: '不限', choose: true},
        {type: 0, name: '大专', choose: false},
        {type: 1, name: '本科', choose: false},
        {type: 2, name: '硕士', choose: false},
        {type: 3, name: '博士及以上', choose: false}
    ],
    experience: [
        {name: '不限', choose: true},
        {type: 0, name: '应届', choose: false},
        {type: 1, name: '1~2', choose: false},
        {type: 2, name: '3~5', choose: false},
        {type: 3, name: '6~9', choose: false},
        {type: 4, name: '10年及以上', choose: false}

    ],
    updateAt: [
        {name: '不限', choose: true},
        {type: 0, name: '24h内', choose: false},
        {type: 1, name: '三天内', choose: false},
        {type: 2, name: '七天内', choose: false}
    ],
    financing: [
        {name: '不限', choose: true},
        {type: 0, name: '无需融资', choose: false},
        {type: 1, name: '天使轮', choose: false},
        {type: 2, name: 'A轮', choose: false},
        {type: 3, name: 'B轮', choose: false},
        {type: 4, name: 'C轮', choose: false},
        {type: 5, name: 'D轮及以上', choose: false},
        {type: 6, name: '上市公司', choose: false}
    ]
    ,
    category: [
        {name: "全部", choose: true},
        {type: 0, name: "产品", choose: false},
        {type: 1, name: "运营", choose: false},
        {type: 2, name: "技术", choose: false},
        {type: 3, name: "设计", choose: false},
        {type: 4, name: "测试", choose: false}
    ]
})
;

//  begin 独立过滤器所需
//薪资水平
app.constant('compensationtype', [
    {type: 0, name: '8K以下', choose: false},
    {type: 1, name: '8K-15K', choose: false},
    {type: 2, name: '16K-25K', choose: false},
    {type: 3, name: '25K以上', choose: false}
]);
//公司行业
app.constant('industrytype', [
    {type: 0, name: '移动互联网'},
    {type: 1, name: '电子商务'},
    {type: 2, name: '企业服务'},
    {type: 3, name: 'O2O'},
    {type: 4, name: '教育'},
    {type: 5, name: '金融'},
    {type: 6, name: '游戏'}
]);
//    融资规模 financing
app.constant('financingtype', [
    {type: 0, name: '无需融资'},
    {type: 1, name: '天使轮'},
    {type: 2, name: 'A轮'},
    {type: 3, name: 'B轮'},
    {type: 4, name: 'C轮'},
    {type: 5, name: 'D轮及以上'},
    {type: 6, name: '上市公司'}
]);
//  工作经验 experience
app.constant('experiencetype', [
    {type: 0, name: '应届'},
    {type: 1, name: '1~2年经验'},
    {type: 2, name: '3~5年经验'},
    {type: 3, name: '6～9年经验'},
    {type: 4, name: '10年及以上'}
]);
//     学历要求 education
app.constant('educationtype', [
    {type: 0, name: '大专'},
    {type: 1, name: '本科'},
    {type: 2, name: '硕士'},
    {type: 3, name: '博士及以上'}

]);
//发布时间 updateAt
app.constant('updateAttype', [
    {type: 0, name: '今天'},
    {type: 1, name: '昨天'}
]);