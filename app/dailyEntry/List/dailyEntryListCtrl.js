
(function () {
    "use strict";
    angular
        .module("dailyEntryManagement")
        .controller("DailyEntryListCtrl",
                    ["dailyEntryResource",
                        DailyEntryListCtrl]);

    function DailyEntryListCtrl(dailyEntryResource) {
        var vm = this;

        dailyEntryResource.get(function(data) {
            vm.dailyEntries = data.dailyFeelingsVM;
        });
    }

}());
