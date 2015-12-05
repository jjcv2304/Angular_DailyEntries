(function () {
  "use strict";

  angular.module("common.services")
    .factory("dailyEntryResource", ["$resource", "appSettings", dailyEntryResource]);

  function dailyEntryResource($resource, appSettings) {
    return $resource(appSettings.serverPath + "/api/dailyEntry/:dailyFeelingId", null,{
      'update': { method:'PUT' }
    });
  }

}());
