
(function () {
  "use strict";
  var app = angular.module("dailyEntryManagement",
    ["common.services",
      "ui.router",
      "ui.mask",
      "ui.bootstrap",
      "angularCharts",
      "dailyEntryResourceMock"]);


  app.config(function ($provide) {
    $provide.decorator("$exceptionHandler",
      ["$delegate",
        function ($delegate) {
          return function (exception, cause) {
            exception.message = "Please contact the Help Desk! \n Message: " +
              exception.message;
            $delegate(exception, cause);
            alert(exception.message);
          };
        }]);
  });

  app.config(["$stateProvider",
    "$urlRouterProvider",
    function ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise("/");

      $stateProvider
        .state("home", {
          url: "/",
          templateUrl: "app/welcomeView.html"
        })

        .state("dailyEntryList", {
          url: "/dailyEntry",
          templateUrl: "app/dailyEntry/List/dailyEntryListView.html",
          controller: "DailyEntryListCtrl as vm"
        })

        .state("dailyEntryEdit", {
          abstract: true,
          url: "/dailyEntry/edit/:dailyEntryId",
          templateUrl: "app/dailyEntry/Edit/dailyEntryEditView.html",
          controller: "DailyEntryEditCtrl as vm",
          resolve: {
            dailyEntryResource: "dailyEntryResource",

            dailyEntry: function(dailyEntryResource, $stateParams){
              var dailyEntryId = $stateParams.dailyEntryId;
              return dailyEntryResource.get({dailyEntryId: dailyEntryId}).$promise;
            }
          }
        })
        .state("dailyEntryEdit.main", {
          url:"/main",
          templateUrl: "app/dailyEntry/Edit/dailyEntryEditMain.html"
        })
        .state("dailyEntryEdit.workout", {
          url:"/workout",
          templateUrl: "app/dailyEntry/Edit/dailyEntryEditWorkout.html"
        })

        .state("dailyEntryDetail", {
          url: "/dailyEntry/:dailyEntryId",
          templateUrl: "app/dailyEntry/Detail/dailyEntryDetailView.html",
          controller: "DailyEntryDetailCtrl as vm",
          resolve: {
            dailyEntryResource: "dailyEntryResource",

            dailyEntry: function(dailyEntryResource, $stateParams){
              var dailyEntryId = $stateParams.dailyEntryId;
              return dailyEntryResource.get({dailyEntryId: dailyEntryId}).$promise;
            }
          }
        })

        .state("dailyEntryAnalytics", {
          url: "/dailyEntryAnalytics",
          templateUrl:"app/dailyEntry/Charts/dailyEntryAnalyticsView.html",
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

