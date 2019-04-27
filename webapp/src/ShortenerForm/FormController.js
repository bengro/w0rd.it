(function (angular) {
    'use strict';

    var app = angular.module('WordItApp');

    app.controller('WordItFormController', function ($scope, $http, UrlValidator) {

        function restoreDefault() {
            $scope.shortener = {
                hash: '...'
            };
            $scope.url = null;
            $scope.submitted = false;
        }

        restoreDefault();

        $scope.validify = function () {
            $scope.url = UrlValidator.validify($scope.url);
        };

        $scope.postURL = function () {
            $scope.disabled = true;
            $http.post('/api/shorten', {url: $scope.url})
                .success(function (data) {
                    $scope.submitted = true;

                    $scope.shortener = {};
                    $scope.shortener = data;
                    $scope.fetchURLCount();
                })
                .error(function (data) {
                    $scope.shortener = data;
                    $scope.submitted = false;
                });
        };

        $scope.fetchURLCount = function () {
            var dictionary = firebase.database().ref("dictionary");
            console.log(dictionary.once('value')
              .then(function(data) {
                console.log(data);
              })
            );

          dictionary.onWrite((change, context) => {
            const data = change.after.val();
            const count = Object.keys(data).length;
            console.log('count', count);
            return change.after.ref.child('_count').set(count);
          });

            $http.get('/api/stats').success(function (data) {
                $scope.stats = data;
            });
        };

        $scope.fetchURLCount();
    });

}(angular));
