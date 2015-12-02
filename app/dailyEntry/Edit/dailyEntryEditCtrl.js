(function () {
  "use strict";

  angular
    .module("dailyEntryManagement")
    .controller("DailyEntryEditCtrl",
      ["dailyEntry",
        "$state",
        DailyEntryEditCtrl]);


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

    vm.submit = function () {
      vm.dailyEntry.$save(function (data) {
          toastr.success("Save Successful");
        }
      );
    }

    vm.cancel = function () {
      $state.go('dailyEntryList');
    }

    vm.addWorkout = function (dailyEntry) {

      var newWorkout = {
        "workoutId": 0,
        "date": dailyEntry.date,
        "time": "",
        "workoutType": {
          "workoutTypeId":10,
          "name": "Other"
        },
        "routeId": 0,
        "distance": 0,
        "timeSpend": "",
        "totalTime": "",
        "notes": "",
        "dailyEntryId": dailyEntry.dailyEntryId
      };

      vm.dailyEntry.workout = vm.dailyEntry.workout ? vm.dailyEntry.workout.concat(newWorkout) : newWorkout;
      //vm.newTags = "";

    }

    vm.removeWorkout = function (idx) {
      vm.dailyEntry.workout.splice(idx, 1);
    }

  }

}());
