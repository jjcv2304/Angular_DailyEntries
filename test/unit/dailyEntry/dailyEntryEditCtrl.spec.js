describe('Daily entry edit controller',function () {
    var vm;
    var $controller;
    var scope;
    var $location;
    var dailyEntry;
    var $state;
    var dailyEntryService;
    var $controllerProvider;
    var stateSpy;

    beforeEach(module('dailyEntryApp'));

    beforeEach(inject(function(_$controller_, _$location_, $rootScope, _$state_){
        scope = $rootScope.$new();
        $controller = _$controller_;
        $state = _$state_;
         $location = _$location_;
        stateSpy = sinon.stub($state, 'go');
    }));


    it('should set title to New',function () {
        dailyEntry = {};
        vm = $controller('DailyEntryEditCtrl as vm', { $location: $location, $scope: scope, dailyEntry : dailyEntry, $state : $state, dailyEntryService : dailyEntryService});
        expect(vm.title).toContain('New');
    });

    it('should set title to Edit',function () {
        dailyEntry = {dailyEntryId : 1};
        vm = $controller('DailyEntryEditCtrl as vm', { $location: $location, $scope: scope, dailyEntry : dailyEntry, $state : $state, dailyEntryService : dailyEntryService});
        expect(vm.title).toContain('Edit');
    });

    it('should redirect to the list',function () {
        vm = $controller('DailyEntryEditCtrl as vm', { $location: $location, $scope: scope, dailyEntry : dailyEntry, $state : $state, dailyEntryService : dailyEntryService});
        //vm = $controller('DailyEntryEditCtrl as vm', { $location: $location, $scope: scope, dailyEntry : dailyEntry, dailyEntryService : dailyEntryService});
        vm.cancel();
        expect(vm.title).toContain('cancel executed');

        expect(stateSpy.calledOnce).toBeTruthy();
        //expect(stateSpy.withArgs('dailyEntryList2').calledOnce).toBeTruthy();

        //expect($state.go).to.have.been.calledOnce.and.calledWith('dailyEntryList');

        //assert(stateSpy.withArgs('college.main', '{currentCollege: 2}'));
    });

    //console.log(angular.mock.dump($state.get('dailyEntryList')));
    //expect($state.url).toEqual('app/dailyEntry/dailyEntryListView.html');
    //console.log(angular.mock.dump(vm));
});