/*#############  获取数据源  ###############*/
var billing; //6个月的账单数据
var amt; //amt的账单数据
var sexual; //性别比例
var qualification; //不同学历的违约情况
var overview; //概览数据
$(function () {
  //查询6个月的账单数据
  $.ajax({
    url: "http://127.0.0.1:8082/billing", //请求的url地址
    dataType: "json", // 接收json格式数据
    async: false, //请求是否异步，默认为异步，这也是ajax重要特性
    //data: { result: result }, //参数值
    type: "GET", //请求方式
    success: function (req) {
      console.log(req.data[0]);
      billing = req.data[0];

      /*#################    6个月的账单统计  #####################*/
      var dom = document.getElementById("gztj");
      var myChart = echarts.init(dom);
      var app = {};
      option = null;
      app.title = "环形图";

      option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: ["1月", "2月", "3月", "4月", "5月", "6月"],
          textStyle: {
            color: "#fff",
          },
        },
        series: [
          {
            name: "各月账单情况",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                textStyle: {
                  align: "center",
                  baseline: "middle",
                  fontFamily: "微软雅黑",
                  fontSize: 12,
                  fontWeight: "normal",
                },
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "12",
                  fontWeight: "bold",
                },
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              { value: billing.january, name: "1月" },
              { value: billing.february, name: "2月" },
              { value: billing.march, name: "3月" },
              { value: billing.april, name: "4月" },
              { value: billing.may, name: "5月" },
              { value: billing.june, name: "6月" },
            ],
          },
        ],
      };
      if (option && typeof option === "object") {
        myChart.setOption(option, true);
      }
    },
    error: function () {
      alert("查找6个月的账单数据失败");
    },
  });

  //查询amt的账单数据
  $.ajax({
    url: "http://127.0.0.1:8082/amt", //请求的url地址
    dataType: "json", // 接收json格式数据
    async: false, //请求是否异步，默认为异步，这也是ajax重要特性
    //data: { result: result }, //参数值
    type: "GET", //请求方式
    success: function (req) {
      console.log(req.data[0]);
      amt = req.data[0];
      /*#################    AMT的统计  #####################*/
      var dom = document.getElementById("xcrytj");
      var myChart = echarts.init(dom);
      var app = {};
      option = null;
      app.title = "环形图";

      option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: ["AMT1", "AMT2", "AMT3", "AMT4", "AMT5", "AMT6"],
          textStyle: {
            color: "#fff",
          },
        },
        series: [
          {
            name: "AMT的状态",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                textStyle: {
                  align: "center",
                  baseline: "middle",
                  fontFamily: "微软雅黑",
                  fontSize: 12,
                  fontWeight: "normal",
                },
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "12",
                  fontWeight: "bold",
                },
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              { value: amt.amt1, name: "AMT1" },
              { value: amt.amt2, name: "AMT2" },
              { value: amt.amt3, name: "AMT3" },
              { value: amt.amt4, name: "AMT4" },
              { value: amt.amt5, name: "AMT5" },
              { value: amt.amt6, name: "AMT6" },
            ],
          },
        ],
      };
      if (option && typeof option === "object") {
        myChart.setOption(option, true);
      }
    },
    error: function () {
      alert("查询amt的账单数据失败");
    },
  });

  //查询性别比例
  $.ajax({
    url: "http://127.0.0.1:8082/sexual", //请求的url地址
    dataType: "json", // 接收json格式数据
    async: false, //请求是否异步，默认为异步，这也是ajax重要特性
    //data: { result: result }, //参数值
    type: "GET", //请求方式
    success: function (req) {
      console.log(req.data[0]);
      sexual = req.data[0];
      /*#################    项目人员信息状态  #####################*/
      var dom = document.getElementById("lytj");
      var myChart = echarts.init(dom);
      var app = {};
      option = null;
      app.title = "环形图";

      option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: [],
        },
        series: [
          {
            name: "男女比例",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: "{d}%", //模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。{d}数据会根据value值计算百分比

                textStyle: {
                  align: "center",
                  baseline: "middle",
                  fontFamily: "微软雅黑",
                  fontSize: 12,
                  fontWeight: "bolder",
                },
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "12",
                  fontWeight: "bold",
                },
              },
            },
            labelLine: {
              normal: {
                show: true,
                position: "inside",
                formatter: "{d}%", //模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。{d}数据会根据value值计算百分比

                textStyle: {
                  align: "center",
                  baseline: "middle",
                  fontFamily: "微软雅黑",
                  fontSize: 15,
                  fontWeight: "bolder",
                },
              },
            },
            data: [
              { value: sexual.sex1, name: "男" },
              { value: sexual.sex2, name: "女" },
            ],
          },
        ],
      };
      if (option && typeof option === "object") {
        myChart.setOption(option, true);
      }
    },
    error: function () {
      alert("查找查询性别比例数据失败");
    },
  });

  //查询不同学历的违约情况
  $.ajax({
    url: "http://127.0.0.1:8082/qualification", //请求的url地址
    dataType: "json", // 接收json格式数据
    async: false, //请求是否异步，默认为异步，这也是ajax重要特性
    //data: { result: result }, //参数值
    type: "GET", //请求方式
    success: function (req) {
      console.log(req.data[0]);
      qualification = req.data[0];
      /*##################  巡检风险状态     ##################*/
      var option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["学历", "违约数量"],
          textStyle: {
            color: "#fff",
          },
        },
        xAxis: [
          {
            type: "category",
            data: ["高中", "大学", "研究生"],
            axisLabel: {
              show: true,
              textStyle: {
                color: "#657c97",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "违约数量",
            nameTextStyle: {
              color: "#657c97",
            },
            min: 0,
            max: 3500,
            interval: 1000,
            axisLabel: {
              textStyle: {
                color: "#657c97",
              },
            },
          },
        ],
        series: [
          {
            name: "学历",
            type: "bar",

            /*设置柱状图颜色*/
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#83bff6" },
                  { offset: 0.5, color: "#0ff" },
                  { offset: 1, color: "#188df0" },
                ]),
                /*信息显示方式*/
                label: {
                  show: false,
                  position: "top",
                  formatter: "{b}\n{c}",
                },
              },
            },
            data: [
              qualification.qual1sum,
              qualification.qual2sum,
              qualification.qual3sum,
            ],
          },
          {
            name: "违约数量",
            type: "line",
            itemStyle: {
              /*设置折线颜色*/
              normal: {
                //color:'#0ff'
              },
            },
            data: [
              qualification.qual1sum,
              qualification.qual2sum,
              qualification.qual3sum,
            ],
          },
        ],
      };
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("xjfxzt"));
      // 使用刚指定的配置项和数据显示图表。
      if (option && typeof option === "object") {
        myChart.setOption(option, true);
      }

      var dom = document.getElementById("wentidj");
      var myChart = echarts.init(dom);
      var app = {};
      option = null;
      option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: [],
        },
        series: [
          {
            name: "违约的数量",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: "{d}%", //模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。{d}数据会根据value值计算百分比
              },
              emphasis: {
                show: true,
              },
            },
            labelLine: {
              normal: {
                show: true,
                position: "inside", //让文字显示在柱子上
                formatter: "{d}%", //模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。{d}数据会根据value值计算百分比
              },
            },
            data: [
              { value: qualification.qual1sum, name: "高中" },
              { value: qualification.qual2sum, name: "大学" },
              { value: qualification.qual3sum, name: "研究生" },
            ],
          },
        ],
      };
      if (option && typeof option === "object") {
        myChart.setOption(option, true);
      }
      $("#gaozhong").text(qualification.qual1sum);
      $("#daxue").text(qualification.qual2sum);
      $("#yanjiusheng").text(qualification.qual3sum);
    },
    error: function () {
      alert("查找不同学历的违约情况失败");
    },
  });

  //查询概览数据
  $.ajax({
    url: "http://127.0.0.1:8082/overview", //请求的url地址
    dataType: "json", // 接收json格式数据
    async: false, //请求是否异步，默认为异步，这也是ajax重要特性
    //data: { result: result }, //参数值
    type: "GET", //请求方式
    success: function (req) {
      console.log(req.data[0]);
      overview = req.data[0];
      $("#sumcount").text(overview.sumcount);
      $("#sumCred").text(overview.sumCred);
      $("#diyi").text(overview.diyi);
      $("#dier").text(overview.dier);
      $("#disan").text(overview.disan);
      $("#disi").text(overview.disi);
      $("#diwu").text(overview.diwu);
    },
    error: function () {
      alert("查找概览数据失败");
    },
  });
});
