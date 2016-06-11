'use strict';

describe('Component: mainComponent', function() {

  // load the controller's module
  beforeEach(module('shortenerApp'));
  beforeEach(module('stateMock'));

  var scope;
  var mainComponent;
  var state;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $http, $componentController, $rootScope, $state, $location) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/shorters')
      .respond([{ origin: 'http://mock.link/url', token: 'nf3cS' }]);
    scope = $rootScope.$new();
    state = $state;
    mainComponent = $componentController('main', {
      $http: $http,
      $scope: scope,
      $location: $location
    });
  }));

  it('should attach a list of things to the controller', function() {
    mainComponent.$onInit();
    $httpBackend.flush();
    expect(mainComponent.shorters).to.be.a('array');
  });
});
