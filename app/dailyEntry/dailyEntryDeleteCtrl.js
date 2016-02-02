(function () {
  "use strict";

  angular
    .module("dailyEntryApp")
    .controller("DailyEntryDeleteCtrl", ["dailyEntry", "$filter", "$state", DailyEntryDeleteCtrl]);

  function DailyEntryDeleteCtrl(dailyEntry, $filter) {
    var vm = this;

    vm.dailyEntry = dailyEntry;

    var _date = $filter('date')(new Date(vm.dailyEntry.date), 'MMM dd yyyy');
    vm.title = "Confirm Delete entry: " + _date;

    vm.remove = function () {
      vm.dailyEntry.$remove(vm.dailyEntry.dailyEntryId,function (data) {
        toastr.success("Deleted Successful");
        $state.go('dailyEntryList');
      });
    }

    vm.cancel = function () {
      $state.go('dailyEntryList');
    }
  }
}());
