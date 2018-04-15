// 生成angular对象
var App = angular.module('myApp',[]);

// Model
let users = [
    {
        username: '张三',
        age: 12
    },
    {
        username: '李四',
        age: 15
    }
]
let asad=["456","62"];

// Controller  控制台
App.controller("mycontroller", function($scope){
    $scope.aaa = users;
    $scope.bbb = "bbb";
    $scope.is = false // 显示和隐藏
})

App.controller("abc", function($scope){
    $scope.inputtext = "45646";
    $scope.asad = asad; // 绑定数组
    $scope.add = function(ev){ // 添加数据
        if(ev.keyCode == 13){
            $scope.asad.push($scope.inputtext)
            $scope.inputtext =""
        }
    }
    $scope.remove = function(index){ // 删除数据
        console.log(index)
        $scope.asad.splice(index,1)
    }
})