describe('Daily entry edit controller',function () {
    var vm;
    var $controller;
    var scope;
    var dailyEntryResource;
    var $controllerProvider;

    beforeEach(module('dailyEntryApp'));

    beforeEach(inject(function(_$controller_, $rootScope, _dailyEntryResource_){
        scope = $rootScope.$new();
        $controller = _$controller_;
        dailyEntryResource = _dailyEntryResource_;
    }));

    it('should set title to New',function () {
        //vm = $controller('DailyEntryListCtrl as vm', {$scope: scope, dailyEntryResource : dailyEntryResource});
        //vm = $controller('DailyEntryListCtrl as vm', {$scope: scope});
        //console.log(angular.mock.dump(vm));
    });

});