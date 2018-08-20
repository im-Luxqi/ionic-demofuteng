import { HttpClient } from '@angular/common/http';
import { DashboardService } from './service/dashboard.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';


declare var require: any;
export function highchartsFactory() {
    const hc = require('highcharts');
    const dd = require('highcharts/modules/drilldown');
    dd(hc);
    return hc;
}

// import Highcharts from 'highcharts';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [DashboardService,
        { provide: HighchartsStatic, useFactory: highchartsFactory }],
})
export class DashboardComponent implements OnInit, OnDestroy {
    device: any;
    dateType: any;
    smallScreen: boolean;
    dailyRate_amountUp = false;
    public subscription: Subscription;
    windowsWidth: number = window.innerWidth;
    options: Object;
    today_day: number;
    today: string;
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
    chart_maxValue: number;
    tickInterval: number;
    selected = 'week';
    constructor(
        private dashboardService: DashboardService
    ) {

        console.log(this.windowsWidth - 10);
        this.dateType = [
            { label: 'EX870017A00502', value: { id: 1, name: 'New York', code: 'NY' } },
            ];
        this.device = [
            { label: 'week', value: { id: 1, name: 'New York', code: 'NY' } },
            ];

        this.subscription = this.dashboardService.getData().subscribe((dataJson: any) => {
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
                this.dailyRate_amountUp = this.dailyRate_amount.up;

                const twoWeekListData = this.twoWeekList;
                this.chartX = this.prepareChartData(twoWeekListData).chart_x;
                this.chartY = this.prepareChartData(twoWeekListData).chart_y;
                this.chart_maxValue = this.prepareChartData(twoWeekListData).max_amount;
                this.tickInterval = 1;

                this.initHighChart();

            }

        });

        if (this.windowsWidth <= 400) {
            this.smallScreen = true;
        }
    }
    ngOnInit() {

        Observable.fromEvent(window, 'resize')
            .subscribe((event: any) => {

                this.windowsWidth = event.target.innerWidth;
                if (this.windowsWidth <= 500) {
                    this.smallScreen = true;
                } else {
                    this.smallScreen = false;
                }
                this.initHighChart();
            });
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    initHighChart() {

        this.options = {
            chart: {
                width: this.windowsWidth - 50,
                height: 300,
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
                        if (this.value === '') {
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
                tickInterval: Math.round(this.chart_maxValue / 4),
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
        };
    }


    getRate(dataList: any, isAmount: boolean) {
        let current = 0, before = 0;
        for (let i = 0; i < dataList.length; i++) {
            if (i < dataList.length / 2) {
                if (isAmount) {
                    before += dataList[i].NetAmount;
                } else {
                    before += dataList[i].NetQuantity;
                }
            } else {
                if (isAmount) {
                    current += dataList[i].NetAmount;
                } else {
                    current += dataList[i].NetQuantity;
                }
            }
        }
        const rate = (current - before) / before;
        let rateHasUp = false;
        let tempRate = (rate * 100).toFixed(2);
        if (rate > 0) {
            rateHasUp = true;
            tempRate = '+' + tempRate;
        }

        return { 'rate': tempRate + '%', 'up': rateHasUp, 'current': current };
    }

    getDailySale(isAmount: boolean) {
        let today = 0, yesterday = 0;
        if (isAmount) {
            today = this.twoWeekList[this.twoWeekList.length - 1].NetAmount;
            yesterday = this.twoWeekList[this.twoWeekList.length - 2].NetAmount;
        } else {
            today = this.twoWeekList[this.twoWeekList.length - 1].NetQuantity;
            yesterday = this.twoWeekList[this.twoWeekList.length - 2].NetQuantity;
        }

        const rate = (today - yesterday) / yesterday;
        let rateHasUp = false;

        let tempRate = (rate * 100).toFixed(2);
        if (rate > 0) {
            rateHasUp = true;
            tempRate = '+' + tempRate;
        }
        return { 'rate': tempRate + '%', 'up': rateHasUp, 'current': today };
    }


    checkItem(wmy) {
        this.selected = wmy;
        if (wmy === 'week') {
            const twoWeekListData = this.twoWeekList;
            this.chartX = this.prepareChartData(twoWeekListData).chart_x;
            this.chartY = this.prepareChartData(twoWeekListData).chart_y;
            this.chart_maxValue = this.prepareChartData(twoWeekListData).max_amount;
            this.tickInterval = 1;
        } else if (wmy === 'month') {
            const twoMonthListData = this.twoMonthList;
            this.chartX = this.prepareChartData(twoMonthListData).chart_x;
            this.chartY = this.prepareChartData(twoMonthListData).chart_y;
            this.chart_maxValue = this.prepareChartData(twoMonthListData).max_amount;
            this.tickInterval = 4;
        } else if (wmy === 'year') {
            const twoYearListData = this.twoYearList;
            this.chartX = this.prepareChartData(twoYearListData).chart_x;
            this.chartY = this.prepareChartData(twoYearListData).chart_y;
            this.chart_maxValue = this.prepareChartData(twoYearListData).max_amount;
            this.tickInterval = 52;
        }
        this.initHighChart();
    }

    prepareChartData(dataList: any) {
        const chart_x = [];
        const chart_y = [];
        let max_amount = dataList[dataList.length / 2].NetAmount;
        for (let i = dataList.length / 2; i < dataList.length; i++) {

            chart_x.push(dataList[i]);
            chart_y.push(dataList[i].NetAmount);
            max_amount = max_amount > dataList[i].NetAmount ? max_amount : dataList[i].NetAmount;
        }
        return { 'chart_x': chart_x, 'chart_y': chart_y, 'max_amount': max_amount };
    }

}
