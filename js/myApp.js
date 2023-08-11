var app = angular.module("myApp", ["ngRoute"]);

// Route _________________________________

app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "./home.html",
    })
    .when("/thitracnghiem/:id/:name", {
      templateUrl: "./thitracnghiem.html",
      controller: "quizCtrl",
    })
    .when("/gioithieu", {
      templateUrl: "./gioithieu.html",
    })
    .when("/gopy", {
      templateUrl: "./gopy.html",
    })
    .when("/lienhe", {
      templateUrl: "./lienhe.html",
    })
    .when("/capnhattk", {
      templateUrl: "./capnhattk.html",
    })
    .when("/quenmk", {
      templateUrl: "./quenmk.html",
    })
    .when("/dangki", {
      templateUrl: "./dangki.html",
    })
    .when("/dangnhap", {
      templateUrl: "./dangnhap.html",
    })
    .when("/thongtintk", {
      templateUrl: "./thongtintaikhoan.html",
    })
    .otherwise({
      redirectTo: "/",
    });
});

//  controller register ______________________________

app.controller("register", function ($scope, $http) {
  $scope.postdata = function (even) {
    var data = {
      id: Math.random(),
      username: $scope.username,
      password: $scope.password,
      fullname: $scope.fullname,
      email: $scope.email,
      gender: $scope.gender,
      birthday: $scope.birthday,
      schoolfee: "0",
      marks: "0",
    };
    $http.post("http://localhost:3000/students", data).then(
      function (res) {
        alert("Đăng kí thành công");
      },
      function (error) {
        alert("Đăng kí thất bại");
      }
    );
  };
});

//  controller quizCtrl ______________________________

app.controller("quizCtrl", function ($scope, $http, $routeParams, quizFactory) {
  // $http.get("../db/Quizs/" + $routeParams.Id + ".js").then(function (reponse) {
  //   quizFactory.questions = reponse.data;
  // });
});

//  controller tableQuestion ______________________________

app.controller("tableQuestion", function ($scope) {});

//  controller subjectCtrl ______________________________

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

app.directive("rowArticle", function (quizFactory) {
  return {
    restrict: "AE",
    scope: {},
    templateUrl: "./template/qizz-xayDungTrangWeb.html",
    link: function (scope, elem, attrs) {
      var sts = [];
      // var answers = {
      //   id: answ
      // };
      
      var sttQ = 1;
      sts.id = 1;

      // Start
      scope.start = function () {
        scope.index = 0;
        scope.inProgess = true;
        scope.quizOver = false;
        scope.time = 60 * 10;
        scope.timeOut();
        scope.getQuestion();
        // scope.paginations();
      };
      // Reset
      scope.reset = function () {
        scope.inProgess = false;
        scope.score = 0;
        scope.NameQ = questions.name;
        scope.LogoQ = questions.logo;
      };
      // getQuestion
      scope.getQuestion = function () {
        var quiz = quizFactory.getQuestion(scope.index);
        if (quiz) {
          scope.id_Q = quiz.Id;
          scope.question = quiz.Text;
          scope.options = quiz.Answers;
          scope.answer = quiz.AnswerId;
          scope.answerMode = true;
        } else {
          scope.quizOver = true;
        }
        
        if (scope.a == 0) {
          quiz = 0;
          scope.quizOver = true;
        }
        console.log(scope.answer);
      };
      // scope.domain = new scope.getQuestion();
      
      // checkAnswer
      scope.checkAnswer = function () {
        // alert("answer");
        if (!$("input[name = answer]:checked").length) return;
        var answ = $("input[name = answer]:checked").val();

        sts.push(angular.copy(answ));
        console.log("array(sts) la :",sts);
        scope.sts = sts;
        
        scope.sts.id ++;
        if (answ == scope.answer) {
          // alert("Chinh xac !");
          scope.score++;
          scope.correctAns = alert("Chinh xac !");
        } else {
          scope.correctAns = alert("Sai roi :(( !");
        }
        scope.answerMode = false;
      };
      // prevQuestion
      scope.prevQuestion = function () {
        if (scope.index > 0) {
          scope.index--;
        }
        scope.getQuestion();
      };
      // nextQuestion
      scope.nextQuestion = function () {
        if (scope.index < questions.length - 1) {
          scope.index++;
        }
        scope.getQuestion();
      };
      // thoi gian
      scope.timeOut = function timefun() {
        scope.time--;
        scope.minute = Math.floor(scope.time / 60);
        scope.second = scope.time % 60;

        document.getElementById("minute").innerHTML = scope.minute;
        document.getElementById("second").innerHTML = scope.second;
        if (scope.time > 0) {
          setTimeout(timefun, 1000);
        } else {
          scope.a = scope.time;
          scope.getQuestion();
        }
      };

      // scope.paginations = function () {
      //   // document.write("<p>hello</p>");
      //   // console.log(questions.length);
      // };

      // scope.reset
      scope.reset();
    },
  };
});

// factory ______________________________
app.factory("quizFactory", function ($http, $routeParams) {
  $http.get("../db/Quizs/" + $routeParams.id + ".js").then(function (reponse) {
    questions = reponse.data;
    questions.name = $routeParams.name;
    questions.logo = $routeParams.logo;
  });
  return {
    getQuestion: function (index) {
      // var randomItem = questions[Math.floor(Math.random() * questions.length)];
      var countQ = questions.length;
      if (countQ > 2) countQ = 2;
      if (index < 2) {
        return questions[index];
      } else {
        return false;
      }
    },
  };
});
