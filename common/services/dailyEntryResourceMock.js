
(function () {
  "use strict";

  var app = angular
    .module("dailyEntryResourceMock",
      ["ngMockE2E"]);

  app.run(function ($httpBackend) {
    var dailyEntries = [
      {
        "dailyEntryId": 1,
        "sleep": 5,
        "fatigue": 5,
        "stress": 5,
        "soreness": 5,
        "notes": "",
        "date": "Jan 15, 2015",
        "restingHeartRate": 65,
        "weight": 78.5,
        "workout":[{
          "workoutId" :2,
          "workoutType": {
            "workoutTypeId": 2,
            "name": "Run"
          },
          "distance": 13,
          "totalTime": "90",
          "notes": "",
          "dailyEntryId": 1
        }]
      },
      {
        "dailyEntryId": 2,
        "sleep": 5,
        "fatigue": 5,
        "stress": 5,
        "soreness": 4,
        "notes": "",
        "date": "Jan 16, 2015",
        "restingHeartRate": 64,
        "weight": 75.0,
        "workout": [{
          "workoutId" :2,
          "workoutType": {
            "workoutTypeId": 2,
            "name": "Run"
          },
          "distance": 13,
          "totalTime": "90",
          "notes": "Good feeling",
          "dailyEntryId": 2
        }]
      },
      {
        "dailyEntryId": 3,
        "sleep": 4,
        "fatigue": 5,
        "stress": 5,
        "soreness": 5,
        "notes": "",
        "date": "Jan 17, 2015",
        "restingHeartRate": 65,
        "weight": 68.5,
        "workout": [{
          "workoutId" :3,
          "workoutType": {
            "workoutTypeId": 1,
            "name": "Swimming"
          },
          "distance": 1200,
          "totalTime": "",
          "notes": "",
          "dailyEntryId": 3
        }]
      },
      {
        "dailyEntryId": 4,
        "sleep": 4,
        "fatigue": 5,
        "stress": 4,
        "soreness": 4,
        "notes": "",
        "date": "Jan 18, 2015",
        "restingHeartRate": 65,
        "weight": 68.2,
        "workout": [{
          "workoutId" :4,
          "workoutType": {
            "workoutTypeId": 2,
            "name": "Run"
          },
          "distance": 13,
          "totalTime": "90",
          "notes": "",
          "dailyEntryId": 4
        }]
      },
      {
        "dailyEntryId": 5,
        "sleep": 5,
        "fatigue": 5,
        "stress": 5,
        "soreness": 5,
        "notes": "",
        "date": "Jan 21, 2015",
        "restingHeartRate": 55,
        "weight": 67.5,
        "workout":[{
          "workoutId" :5,
          "workoutType": {
            "workoutTypeId": 1,
            "name": "Swimming"
          },
          "distance": 1300,
          "totalTime": "",
          "notes": "Fresh",
          "dailyEntryId": 5
        },
          {
            "workoutId" :6,
            "workoutType": {
              "workoutTypeId": 2,
              "name": "Run"
            },
            "distance": 13,
            "totalTime": "1:30",
            "notes": "Tired",
            "dailyEntryId": 5
          }
        ]
      }
    ];

    var dailyEntryUrl = "/api/dailyEntry"

    $httpBackend.whenGET(dailyEntryUrl).respond(dailyEntries);

    var editingRegex = new RegExp(dailyEntryUrl + "/[0-9][0-9]*", '');
    $httpBackend.whenGET(editingRegex).respond(function (method, url, data) {
      var dailyEntry = {"dailyEntryId": 0};
      var parameters = url.split('/');
      var length = parameters.length;
      var id = parameters[length - 1];

      if (id > 0) {
        for (var i = 0; i < dailyEntries.length; i++) {
          if (dailyEntries[i].dailyEntryId == id) {
            dailyEntry = dailyEntries[i];
            break;
          }
        }
      }
      return [200, dailyEntry, {}];
    });

    $httpBackend.whenPOST(dailyEntryUrl).respond(function (method, url, data) {
      var dailyEntry = angular.fromJson(data);

      if (!dailyEntry.dailyEntryId) {
        // new entry Id
        dailyEntry.dailyEntryId = dailyEntries[dailyEntries.length - 1].dailyEntryId + 1;
        dailyEntries.push(dailyEntry);
      }
      else {
        // Updated dailyEntry
        for (var i = 0; i < dailyEntries.length; i++) {
          if (dailyEntries[i].dailyEntryId == dailyEntry.dailyEntryId) {
            dailyEntries[i] = dailyEntry;
            break;
          }
        }
      }
      return [200, dailyEntry, {}];
    });

    // Pass through any requests for application files
    $httpBackend.whenGET(/app/).passThrough();


  })
}());
