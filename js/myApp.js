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
    .when("/capnhattk", {
      templateUrl: "./capnhattk.html",
    })
    .when("/doimk", {
      templateUrl: "./doimk.html",
    })
    .otherwise({
      redirectTo: "/",
    });
});

//  controller ______________________________
// register
app.controller("register", function ($scope, $http) {
  $scope.student = [];

  // $http.get("./Students.json").then(function (reponse) {
    $http.get("../db/Students.json").then(function (reponse) {
    $scope.student = reponse.data;
    // console.log($scope.student.datalogin.length);
    if ($scope.student.datalogin.length == 0) {
      $scope.formHidden = true;
      console.log("true");
    } else {
      $scope.formHidden = false;
      console.log("false");
    }

    // register
    $scope.postdata = function (even) {
      var data = {
        id: $scope.student.students.length + 1,
        username: $scope.username,
        password: $scope.password,
        fullname: $scope.fullname,
        email: $scope.email,
        gender: $scope.gender,
        birthday: $scope.birthday,
        schoolfee: "0",
        marks: "0",
      };
      if ($scope.fullname &&
        $scope.username &&
        $scope.password &&
        $scope.email &&
        $scope.gender &&
        $scope.birthday
      ) {
        $http.post("http://localhost:3000/students", data).then(
          function (res) {
            alert("Đăng kí thành công");
            window.location = "http://127.0.0.1:5502/#/dangnhap";
          },
          function (error) {
            alert("Đăng kí thất bại");
          }
        );
      } else {
        alert("Đăng kí thất bại");
      }
    };
    // login
    $scope.login = function (even) {
      username = $scope.username;
      password = $scope.password;
      if (
        username &&
        password
        
      ){
        for (let index = 0; index < $scope.student.students.length; index++) {
          if (
            username == $scope.student.students[index].username &&
            password == $scope.student.students[index].password
          ) {
            $scope.iduser = $scope.student.students[index].id;
            // console.log("oke :", $scope.iduser);
            var datas = {
              id: $scope.student.students[index].id,
              username: $scope.student.students[index].username,
              password: $scope.student.students[index].password,
              fullname: $scope.student.students[index].fullname,
              email: $scope.student.students[index].email,
              gender: $scope.student.students[index].gender,
              birthday: $scope.student.students[index].birthday,
              schoolfee: $scope.student.students[index].schoolfee,
              marks: $scope.student.students[index].marks,
            };
            
            $http.post("http://localhost:3000/datalogin", datas).then(
              function (res) {
                alert("Đăng nhập thành công");
                window.location = "http://127.0.0.1:5502/#/";
              },
              function (error) {
                alert("Đăng nhập thất bại");
                console.log("0");
              }
            );
            break;
          }
        }
      }else{
        alert("Đăng nhập thất bại2");
      }
      
    };
    function checklogin() {
      if ($scope.iduser == "") {
      }
    }
    // logout
    $scope.logout = function (even) {
      $scope.logout = [];
      $http.get("http://localhost:3000/datalogin").then(function (reponse) {
        $scope.logout = reponse.data;
        // console.log($scope.logout[0].id);

        $http
          .delete("http://localhost:3000/datalogin/" + $scope.logout[0].id + "")
          .then(
            function (res) {
              alert("Đăng xuất thành công");
              window.location = "http://127.0.0.1:5502/#/dangnhap";
            },
            function (error) {
              alert("Đăng xuất thất bại");
            }
          );
      });
    };
    // update mk
    $scope.updatepassword = function (even) {
      $scope.dataupdate = [];
      $http.get("http://localhost:3000/datalogin").then(function (reponse) {
        $scope.dataupdate = reponse.data;
        // console.log($scope.dataupdate);
        var dataupdate = {
          username: $scope.dataupdate[0].username,
          password: $scope.newpassword,
          fullname: $scope.dataupdate[0].fullname,
          email: $scope.dataupdate[0].email,
          gender: $scope.dataupdate[0].gender,
          birthday: $scope.dataupdate[0].birthday,
          schoolfee: $scope.dataupdate[0].schoolfee,
          marks: $scope.dataupdate[0].marks,
        };
        if (
          $scope.newpassword &&

          $scope.password &&
          $scope.newpassword2
          
        ) {
          if ($scope.newpassword == $scope.newpassword2) {
            $http
              .put(
                "http://localhost:3000/students/" + $scope.dataupdate[0].id + "",
                dataupdate
              )
              .then(
                function (res) {
                  alert("Cập nhật thành công");
                },
                function (error) {
                  alert("cập nhật thất bại");
                }
              );
            $http.put(
              "http://localhost:3000/datalogin/" + $scope.dataupdate[0].id + "",
              dataupdate
            );
          } else {
            alert("cập nhật thất bại");
          }

        } else {
          alert("cập nhật thất bại");
        }

      });
    };
    // update
    $scope.updatedata = function (even) {
      $scope.dataupdate = [];
      $http.get("http://localhost:3000/datalogin").then(function (reponse) {
        $scope.dataupdate = reponse.data;
        // console.log($scope.dataupdate);
        var dataupdate = {
          username: $scope.dataupdate[0].username,
          password: $scope.dataupdate[0].password,
          fullname: $scope.fullname,
          email: $scope.email,
          gender: $scope.gender,
          birthday: $scope.birthday,
          schoolfee: $scope.dataupdate[0].schoolfee,
          marks: $scope.dataupdate[0].marks,
        };
        if (
          $scope.fullname &&

          $scope.email &&
          $scope.gender &&
          $scope.birthday
        ) {
          $http
            .put(
              "http://localhost:3000/students/" + $scope.dataupdate[0].id + "",
              dataupdate
            )
            .then(
              function (res) {
                alert("Cập nhật thành công");
              },
              function (error) {
                alert("cập nhật thất bại");
              }
            );
          $http.put(
            "http://localhost:3000/datalogin/" + $scope.dataupdate[0].id + "",
            dataupdate
          );
        } else {
          alert("cập nhật thất bại");
        }

      });
    };
  });
});

//  controller quizCtrl ______________________________

app.controller("quizCtrl", function ($scope, $http, $routeParams, quizFactory) {
  // $http.get("../db/Quizs/" + $routeParams.Id + ".js").then(function (reponse) {
  //   quizFactory.questions = reponse.data;
  // });
});

//  controller tableQuestion ______________________________

app.controller("tableQuestion", function ($scope) { });

//  controller subjectCtrl ______________________________

app.controller("subjectCtrl", function ($scope, $http) {

  $scope.studs = [];
  // $http.get("./Students.json").then(function (reponse) {
  $http.get("../db/Students.json").then(function (reponse) {
    $scope.studs = reponse.data;
    console.log($scope.studs.dataCourse)
  });


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

  });
});

//  directive______________________________

app.directive("rowArticle", function (quizFactory, $http) {
  return {
    restrict: "AE",
    scope: {},
    templateUrl: "./template/qizz-xayDungTrangWeb.html",
    link: function (scope, elem, attrs) {
      // console.log(Students.datalogin[0].id);

      var sts = [];

      // Start
      scope.start = function () {
        if (Students.datalogin.length < 1) {
          alert("Vui lòng đăng nhập để tiến hành các khoá học!");
        } else {
          scope.index = 0;
          scope.inProgess = true;
          scope.quizOver = false;
          scope.time = 60 * 10;
          scope.timeOut();
          scope.getQuestion();
          // scope.paginations();
        }
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
        // console.log(scope.answer);
      };
      // scope.domain = new scope.getQuestion();

      // checkAnswer
      scope.checkAnswer = function () {
        // alert("answer");
        if (!$("input[name = answer]:checked").length) return;
        var answ = $("input[name = answer]:checked").val();
        scope.id = 1;
        let demo = {
          id: sts.length + 1,
          id_quiz: scope.id_Q,
          id_ans: scope.answer,
          quest: scope.question,
          ans_check: answ,
        };

        sts.push(angular.copy(demo));
        // console.log("array(sts) la :", sts.length);
        scope.sts = sts;

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

      // Luu ket qua
      scope.saveKQ = () => {
        let dataCourse = {
          id: Students.dataCourse.length + 1,
          id_acc: Students.datalogin[0].id,
          id_cource: questions.id,
          nameCource: questions.name,
          markCource: scope.score,
        }
        $http.post("http://localhost:3000/dataCourse", dataCourse).then(
          function (res) {
            alert("Lưu kết quả thành công");
          },
          function (error) {
            alert("Lưu kết quả thất bại");
          }
        );
        // console.log(dataCourse);
      }

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
    questions.id = $routeParams.id;
  });
  $http.get("../db/Students.json").then(function (reponse) {
    Students = reponse.data;
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
