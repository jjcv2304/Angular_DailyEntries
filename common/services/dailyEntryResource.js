
(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("dailyEntryResource",
                ["$resource",
                 dailyEntryResource]);

    function dailyEntryResource($resource) {
        return $resource("/api/dailyEntry/:dailyEntryId")
    }

}());
