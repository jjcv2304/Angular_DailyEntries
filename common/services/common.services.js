(function () {
    "use strict";

    angular
      .module("common.services", ["ngResource"])
    //.constant("appSettings", {serverPath :""});
      .constant("appSettings", {serverPath :"http://localhost:8901/"}); //todo webapi
}());

