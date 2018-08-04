import Highcharts from 'highcharts';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as $ from 'jquery';
@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.html'
})
export class Dashboard {

    allCategories = {
        'a': ['一月', '二月', '三月', '四月', '五月', '六月', '七月'],

    };
    categories: any = ['1/23', '2/1', '三月', '四月', '五月', '六月', '七月', '一月', '二月', '三月', '四月', '五月', '六月', '七月', '一月', '二月', '三月', '四月', '五月', '六月', '七月', '一月', '二月', '三月', '四月', '五月', '六月', '七月'];
    selected = 1;
    constructor(
        public navCtrl: NavController,
    ) { }
    // ionViewDidEnter,ionViewDidLoad
    ionViewDidLoad() {
        Highcharts.chart('highchatA', {
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                tickInterval: 5,
                categories: this.categories,
                labels: {
                    //对横坐标刻度值进行格式化
                    formatter: function () {
                        if (this.value == '') {
                            return this.value;
                        } else {
                            return this.value + '<br>' + '金';
                        }

                    }
                }
            },
            yAxis: {
                title: {
                    text: ''
                }, 
                labels: {
                    formatter: function () {

                        return '￥' + this.value;
                    }
                },
                max:100,
                min:0,
                tickInterval: 25,
                // minorGridLineColor: '#E0E0E0',
                // minorGridLineWidth: 2,
                // minorTickLength: 10,
                // minorTickInterval: 'auto'
                // tickPositions: [0,25,50,75,100]
            },
            plotOptions: {
                column: {
                    dataLabels: {
                        enabled: false
                    },// 开启数据标签
                    enableMouseTracking: false,// 关闭鼠标跟踪，对应的提示框、点击事件会失效
                    pointWidth: null//设置柱状图宽度
                }
            },
            series: [{

                data: [25, 100, 25, 25, 25, 25, 25]
            }],
            legend: {
                enabled: false
            },
            credits: {
                text: '',
            },
            colors: ['#FF0000'],

        });
    }


    checkItem(id) {
        console.log(id);
        $(id).attr("class", "check-chosen");
        console.log($(id));

    }
    doInfinite(infiniteScroll) {
        setTimeout(() => { infiniteScroll.complete(); }, 1000);
    }

}
