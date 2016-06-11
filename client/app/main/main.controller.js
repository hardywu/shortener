'use strict';

(function() {

  class MainController {

    constructor($http, $scope, $location) {
      this.$http = $http;
      this.$scope = $scope;
      this.host = $location.host();
      if ($location.port() != 80) {
        this.host + ':' + $location.port();
      }
      this.shorters = [];
      this.newUrl = '';
    }

    $onInit() {
      this.$http.get('/api/shorters')
        .then(response => {
          this.shorters = response.data;
        });
    }

    addThing() {
      const that = this;
      if (that.newUrl) {
        that.$http.post('/api/shorters', {
          'origin': that.newUrl
        }).then((res) => {
          if (!_.find(that.shorters, { _id: res.data._id })) {
            that.shorters.unshift(res.data);
          }
          that.newUrl = '';
        });
      }
    }

    deleteThing(shorter) {
      this.$http.delete('/api/shorters/' + shorter._id);
    }
  }

  angular.module('shortenerApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
