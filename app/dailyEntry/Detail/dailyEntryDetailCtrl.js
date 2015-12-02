(function () {
    "use strict";

    angular
        .module("dailyEntryManagement")
        .controller("DailyEntryDetailCtrl",
                    ["dailyEntry",
                        DailyEntryDetailCtrl]);

    function DailyEntryDetailCtrl(dailyEntry) {
        var vm = this;

        vm.dailyEntry = dailyEntry;

        vm.title = "Entry Detail: " + vm.dailyEntry.date;

        vm.getWorkoutNameById = function (id){
            var selectedName = "Other";

            if(id===10){
                selectedName="Other";
            } else if(id===1){
                selectedName="Swimming";
            }
            else if(id===2){
                selectedName="Running";
            }else if(id===11){
                selectedName="Climbing";
            }else if(id===3){
                selectedName="Weight Lifting";
            }else if(id===4){
                selectedName="Walk";
            }else if(id===6){
                selectedName="Cycling";
            }else if(id===7){
                selectedName="Trekking";
            }else if(id===8){
                selectedName="Frisbee";
            }else if(id===9){
                selectedName="Tag Rugby";
            }
            vm.dailyEntry.workout.workoutType.name=  selectedName;
        };
    }
}());
