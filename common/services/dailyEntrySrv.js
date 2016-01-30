/**
 * Created by Juan on 28/01/2016.
 */
(function () {
    "use strict";

    angular.module("common.services").factory('dailyEntryService', dailyEntryService);

    function dailyEntryService() {

        function getWorkoutName(idStr){

            var id = Number(idStr);
            var selectedName = "Other";

            if(id===10){
                selectedName="Other";
            }else if(id===1){
                selectedName="Swimming";
            }else if(id===2){
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
            return selectedName;
        };

        return {
            getWorkoutNameById:getWorkoutName
        }
    };



}());