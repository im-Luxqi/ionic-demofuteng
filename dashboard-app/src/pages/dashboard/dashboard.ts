import { DashboardService } from './service/dashboard.service';
import Highcharts from 'highcharts';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.html',
    providers: [DashboardService]
})
export class Dashboard {
    today_day:number;
    today:string;
    dailyRate_amount: any;
    dailyRate_quantity: any;

    totalRate_week: any;
    totalRate_month: any;
    totalRate_year: any;

    twoWeekList: any;
    twoMonthList: any;
    twoYearList: any;


    chartY: any;
    chartX: any;
    chart_maxValue:number;
    tickInterval:number;
    selected = 'week';
    subscription:Subscription;
    constructor(
        private dashboardService: DashboardService
    ) {
        this.subscription = this.dashboardService.getData().subscribe((dataJson: any) => {
            console.log(dataJson);
            if (dataJson) {
                this.twoWeekList = dataJson.week;
                this.twoMonthList = dataJson.month;
                this.twoYearList = dataJson.year;

                this.today = new Date().toLocaleDateString();
                this.today_day = new Date().getDate();

                this.dailyRate_amount = this.getDailySale(true);
                this.dailyRate_quantity = this.getDailySale(false);
                this.totalRate_week = this.getRate(this.twoWeekList, true);
                this.totalRate_month = this.getRate(this.twoMonthList, true);
                this.totalRate_year = this.getRate(this.twoYearList, true);

                const twoWeekListData = this.twoWeekList;
                this.chartX = this.prepareChartData(twoWeekListData).chart_x;
                this.chartY = this.prepareChartData(twoWeekListData).chart_y;
                this.chart_maxValue = this.prepareChartData(twoWeekListData).max_amount;
                this.tickInterval = 1;

                console.log(this.twoWeekList);
                console.log(this.twoMonthList);
                console.log(this.twoMonthList);
                console.log(this.dailyRate_amount);
                console.log(this.twoMonthList);
                this.initHighChart();
                
            }

        });
    }
    ionViewDidLoad() {
        // var twoWeekListData = this.twoWeekList;
        // this.chartX = this.prepareChartData(twoWeekListData).chart_x;
        // this.chartY = this.prepareChartData(twoWeekListData).chart_y;
        // this.chart_maxValue = this.prepareChartData(twoWeekListData).max_amount;
        // this.tickInterval = 1;
        // this.initHighChart();   
    }
    ionViewWillUnload() {
        this.subscription.unsubscribe();
    }
    initHighChart() {
        Highcharts.chart('highchatA', {
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                tickInterval: this.tickInterval,
                categories: this.chartX,
                labels: {
                    formatter: function () {
                        if (this.value == '') {
                            return this.value;
                        } else {
                            return this.value.DisPlayDate + '<br>' + this.value.DisplayWeek;
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
                max: this.chart_maxValue,
                min: 0,
                tickInterval: Math.round(this.chart_maxValue/4),
            },
            plotOptions: {
                column: {
                    dataLabels: {
                        enabled: false
                    },
                    enableMouseTracking: false,
                    pointWidth: null,
                }
            },
            series: [{
                data: this.chartY
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


    getRate(dataList: any, isAmount: boolean) {
        let current = 0, before = 0;
        for (var i = 0; i < dataList.length; i++) {
            if (i < dataList.length / 2) {
                if (isAmount) before += dataList[i].NetAmount;
                else before += dataList[i].NetQuantity;
            } else {
                if (isAmount) current += dataList[i].NetAmount;
                else current += dataList[i].NetQuantity;
            }
        }
        var rate = (current - before) / before;
        var rateHasUp: boolean = false;
        var tempRate = (rate * 100).toFixed(2);
        if (rate > 0) {
            rateHasUp = true;
            tempRate = '+' + tempRate;
        }

        return { 'rate': tempRate + '%', 'up': rateHasUp, 'current': current };
    }

    getDailySale(isAmount: boolean) {
        console.log('this.twoWeekList');
        console.log(this.twoWeekList);
        if(this.twoWeekList=='undefined' || this.twoWeekList==null) {
            return { 'rate': '' + '%', 'up': false, 'current': '' };
        }


        let today = 0, yesterday = 0;
        if (isAmount) {
            today = this.twoWeekList[this.twoWeekList.length - 1].NetAmount;
            yesterday = this.twoWeekList[this.twoWeekList.length - 2].NetAmount;
        } else {
            today = this.twoWeekList[this.twoWeekList.length - 1].NetQuantity;
            yesterday = this.twoWeekList[this.twoWeekList.length - 2].NetQuantity;
        }

        var rate = (today - yesterday) / yesterday;
        var rateHasUp: boolean = false;

        var tempRate = (rate * 100).toFixed(2);
        if (rate > 0) {
            rateHasUp = true;
            tempRate = '+' + tempRate;
        }
        return { 'rate': tempRate + '%', 'up': rateHasUp, 'current': today };
    }


    checkItem(wmy) {
        this.selected = wmy;
        if (wmy == 'week') {
            var twoWeekListData = this.twoWeekList;
            this.chartX = this.prepareChartData(twoWeekListData).chart_x;
            this.chartY = this.prepareChartData(twoWeekListData).chart_y;
            this.chart_maxValue = this.prepareChartData(twoWeekListData).max_amount;
            this.tickInterval = 1; 
        } else if (wmy == 'month') {
            var twoMonthListData = this.twoMonthList;
            this.chartX = this.prepareChartData(twoMonthListData).chart_x;
            this.chartY = this.prepareChartData(twoMonthListData).chart_y;
            this.chart_maxValue = this.prepareChartData(twoMonthListData).max_amount;
            this.tickInterval = 4; 
        } else if (wmy == 'year') {
            var twoYearListData = this.twoYearList;
            this.chartX = this.prepareChartData(twoYearListData).chart_x;
            this.chartY = this.prepareChartData(twoYearListData).chart_y;
            this.chart_maxValue = this.prepareChartData(twoYearListData).max_amount;
            this.tickInterval = 52;
        }
        this.initHighChart();
    }

    prepareChartData(dataList:any) {
        if(this.twoWeekList=='undefined' || this.twoWeekList==null) {
            return { 'chart_x': [], 'chart_y': [], 'max_amount':0 };
        }
        var chart_x = [];
        var chart_y = [];
        var max_amount = dataList[dataList.length / 2].NetAmount;
        for (var i = dataList.length / 2; i < dataList.length; i++) {
            
            chart_x.push(dataList[i]);
            chart_y.push(dataList[i].NetAmount);
            max_amount = max_amount > dataList[i].NetAmount? max_amount : dataList[i].NetAmount;
        }
        return { 'chart_x': chart_x, 'chart_y': chart_y, 'max_amount':max_amount };
    }
}
