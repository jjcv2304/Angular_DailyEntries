(function () {
  "use strict";

  angular.module("dailyEntryManagement")
    .controller("DailyEntryEditCtrl", ["dailyEntry", "$state", DailyEntryEditCtrl]);

  function DailyEntryEditCtrl(dailyEntry, $state) {
    var vm = this;

    vm.dailyEntry = dailyEntry;

    if (vm.dailyEntry && vm.dailyEntry.dailyEntryId) {
      vm.title = "Edit: " + vm.dailyEntry.date;
    }
    else {
      vm.title = "New Daily Entry"
    }

    vm.open = function ($event) {
      $event.preventDefault();
      $event.stopPropagation();

      vm.opened = !vm.opened;
    };

    //vm.submit = function () {
    //  vm.dailyEntry.$save(function (data) {
    //    toastr.success("Save Successful");
    //  });
    //}

    vm.submit = function () {
      if (this.dailyEntry.dailyFeelingId) {
        vm.dailyEntry.$update(function (data) {
          toastr.success("Save Successful");
        });
      } else {
        vm.dailyEntry.$save(function (data) {
          toastr.success("Save Successful");
        });
      }
    }

    vm.cancel = function () {
      $state.go('dailyEntryList');
    }

    vm.addWorkout = function (dailyEntry) {

      var newWorkout = {
        "workoutId": 0,
        "workoutType": {
          "workoutTypeId": 10,
          "name": "Other"
        },
        "distance": 0,
        "totalTime": "",
        "notes": "",
        "dailyEntryId": dailyEntry.dailyEntryId
      };

      vm.dailyEntry.workout = vm.dailyEntry.workout ? vm.dailyEntry.workout.concat(newWorkout) : [newWorkout];

    }

    vm.removeWorkout = function (idx) {
      vm.dailyEntry.workout.splice(idx, 1);
    }

  }

}());
