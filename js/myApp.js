var app = angular.module("myApp", []);
app.controller("subjectCtrl", function ($scope, $http) {
  $scope.list_subject = [];
  $http.get("../db/Subjects.js").then(function (reponse) {
    $scope.list_subject = reponse.data;

    // pagination _____________________
    $scope.begin = 0;
    $scope.pageCount = Math.ceil($scope.list_subject.length / 4);
  
    // quay lai trang dau
    $scope.first = function () {
      $scope.begin = 0;
    };
  
    // quay lai trang truoc
    $scope.prev = function () {
      if ($scope.begin > 0) {
        $scope.begin -= 4;
      }
    };
  
    // toi trang sau
    $scope.next = function () {
      if ($scope.begin < ($scope.pageCount - 1) * 4) {
        $scope.begin += 4;
      }
    };
  
    // toi trang cuoi
    $scope.last = function () {
      $scope.begin = ($scope.pageCount - 1) * 4;
    };
    // console.log($scope.begin);
  });

});
