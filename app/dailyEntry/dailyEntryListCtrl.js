(function () {
    "use strict";

    angular.module("dailyEntryApp")
        .controller("DailyEntryListCtrl", ["dailyEntryResource", DailyEntryListCtrl]);

    function DailyEntryListCtrl(dailyEntryResource) {
        var vm = this;

        dailyEntryResource.get(function(data) {
            vm.dailyEntries = data.dailyFeelingsVM;
        });

        vm.delete = function (dailyEntry){
            dailyEntry.$remove();
        }
    }

}());
