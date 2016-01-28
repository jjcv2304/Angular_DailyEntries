
(function () {
  "use strict";
  var app = angular.module("dailyEntryApp",
    ["common.services",
      "dailyEntryResourceMock",
      "ui.router",
      "ui.mask",
      "ui.bootstrap",
      "angularCharts"]);


  app.config(function ($provide) {
    $provide.decorator("$exceptionHandler",
      ["$delegate",
        function ($delegate) {
          return function (exception, cause) {
            exception.message = exception.message + " Stack:" + exception.stack;
            $delegate(exception, cause);
            alert(exception.message);
          };
        }]);
  });

  app.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise("/");

      var relativeStartPath= "app/";

      $stateProvider
        .state("home", {
          url: "/",
          templateUrl: relativeStartPath + "welcomeView.html"
        })

        .state("dailyEntryList", {
          url: "/dailyEntry",
          templateUrl: relativeStartPath + "dailyEntry/dailyEntryListView.html",
          controller: "DailyEntryListCtrl as vm"
        })

        //.state("dailyEntryCreate", {
        //  url:"",
        //  templateUrl: relativeStartPath +  "",
        //  controller: ""
        //})

        .state("dailyEntryEdit", {
          abstract: true,
          url: "/dailyEntry/edit/:dailyFeelingId",
          templateUrl: relativeStartPath +  "dailyEntry/dailyEntryEditView.html",
          controller: "DailyEntryEditCtrl as vm",
          resolve: {
            dailyEntryResource: "dailyEntryResource",
            dailyEntry: function(dailyEntryResource, $stateParams){
              var dailyFeelingId = $stateParams.dailyFeelingId;
              return dailyEntryResource.get({dailyFeelingId: dailyFeelingId}).$promise;
            }
          }
        })
        .state("dailyEntryEdit.main", {
          url:"/main",
          templateUrl: relativeStartPath +  "dailyEntry/dailyEntryEditMain.html"
        })
        .state("dailyEntryEdit.workout", {
          url:"/workout",
          templateUrl: relativeStartPath +  "dailyEntry/dailyEntryEditWorkout.html"
        })

        .state("dailyEntryDetail", {
          url: "/dailyEntry/:dailyFeelingId",
          templateUrl: relativeStartPath +  "dailyEntry/dailyEntryDetailView.html",
          controller: "DailyEntryDetailCtrl as vm",
          resolve: {
            dailyEntryResource: "dailyEntryResource",
            dailyEntry: function(dailyEntryResource, $stateParams){
              var dailyFeelingId = $stateParams.dailyFeelingId;
              return dailyEntryResource.get({dailyFeelingId: dailyFeelingId}).$promise;
            }
          }
        })

        .state("dailyEntryDelete", {
          url: "/dailyEntry/delete/:dailyFeelingId",
          templateUrl: relativeStartPath +  "dailyEntry/dailyEntryDeleteView.html",
          controller: "DailyEntryDeleteCtrl as vm",
          resolve: {
            dailyEntryResource: "dailyEntryResource",
            dailyEntry: function(dailyEntryResource, $stateParams){
              var dailyFeelingId = $stateParams.dailyFeelingId;
              return dailyEntryResource.get({dailyFeelingId: dailyFeelingId}).$promise;
            }
          }
        })

        .state("dailyEntryAnalytics", {
          url: "/dailyEntryAnalytics",
          templateUrl: relativeStartPath + "dailyEntry/dailyEntryAnalyticsView.html",
          controller: "DailyEntryAnalyticsCtrl",
          resolve: {
            dailyEntryResource: "dailyEntryResource",

            dailyEntries: function (dailyEntryResource) {
              return dailyEntryResource.query(function(response) {
                  // no code needed for success
                },
                function(response) {
                  if (response.status == 404) {
                    alert("Error accessing resource: " +
                      response.config.method + " " +response.config.url);
                  } else {
                    alert(response.statusText);
                  }
                }).$promise;

            }
          }
        })
    }]
  );

}());

