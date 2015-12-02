
(function () {
    "use strict";
    angular
        .module("dailyEntryManagement")
        .controller("DailyEntryListCtrl",
                    ["dailyEntryResource",
                        DailyEntryListCtrl]);

    function DailyEntryListCtrl(dailyEntryResource) {
        var vm = this;

        dailyEntryResource.query(function(data) {
            vm.dailyEntries = data;
        });
    }

}());
