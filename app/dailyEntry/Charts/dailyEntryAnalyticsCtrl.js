
(function () {
    "use strict";

    angular
        .module("dailyEntryManagement")
        .controller("DailyEntryAnalyticsCtrl",
                    ["$scope",
                     "$filter",
                     "dailyEntries",
                     DailyEntryAnalyticsCtrl]);

    function DailyEntryAnalyticsCtrl($scope,$filter, dailyEntries){
        $scope.title="Daily Entries Analytics";

        var orderedDailyEntries = $filter("orderBy")(dailyEntries, "date");

        var chartDataAmount = [];
        for (var i = 0; i < orderedDailyEntries.length; i++) {
            chartDataAmount.push({
                x: orderedDailyEntries[i].date,
                y: [orderedDailyEntries[i].weight]
            });
        }

        $scope.dataAmount = {
            series: ["Date"],
            data: chartDataAmount
        };

        $scope.configAmount = {
            title: "Weight evolution",
            tooltips: true,
            labels: false,
            mouseover: function () { },
            mouseout: function () { },
            click: function () { },
            legend: {
                display: true,
                position: "right"
            }
        };


    }
}());
