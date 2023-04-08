var app = angular.module("myApp", []);

//  controller ______________________________

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








//  directive______________________________

app.directive("article", function (quizFactory) {
  return {
    restrict: "AE",
    scope: {},
    templateUrl: "./template/qizz-xayDungTrangWeb.html",
    link: function (scope, elem, attrs) {
			// Start
      scope.start = function () {
				scope.index = 0;
        scope.inProgess = true;
				scope.quizOver = false
        scope.getQuestion();
      };
			// Reset
      scope.reset = function () {
        scope.inProgess = false;
				scope.score = 0;
      };
			// getQuestion
      scope.getQuestion = function () {
				let quiz = quizFactory.getQuestion(scope.index);
				if (quiz) {
					scope.question = quiz.Text;
					scope.options = quiz.Answers;
					scope.answer = quiz.AnswerId;
					scope.answerMode = true;
				} else {
					scope.quizOver = true;
				}
      };
			// checkAnswer
      scope.checkAnswer = function () {
        // alert("answer");
        if (!$("input[name = answer]:checked").length) return;
        var answ = $("input[name = answer]:checked").val();
        if (answ == scope.answer) {
          // alert("Chinh xac !");
					scope.score++;
					console.log(scope.score);
					scope.correctAns = alert("Chinh xac !");
        } else {
          scope.correctAns = alert("Sai roi :(( !");
        }
				scope.answerMode = false;
      };
			// prevQuestion
			scope.prevQuestion = function() {
				if(scope.index > 0) {
					scope.index--;
				}
				scope.getQuestion();
			};
			// nextQuestion
			scope.nextQuestion = function() {
				if(scope.index < questions.length-1){
					scope.index++;
				}
				scope.getQuestion();
			};

      scope.reset();
    },
  };
});

// factory ______________________________
app.factory('quizFactory', function($http) {
	$http.get('../db/Quizs/ADAV.js').then(function(response) {
		questions = response.data;
	});
	return {
		getQuestion:function(index) {
			var countQ = questions.length;
			if (countQ > 10) countQ = 10;
			if (index < 10) {
				return questions[index];
			} else {
				return false;
			}
		}
	};
});

