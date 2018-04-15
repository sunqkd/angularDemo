// 生成angular对象
var App = angular.module('myApp',['ngRoute']); // 'ngRoute' 为注入路由插件 名字不能随便定义

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

// 自定义服务 第一个参数为自定服务的名字
App.factory("upper" ,function(){
    return {
        Upcase: function(input){
            if(!input){
                return input;
            }else{
                let output = input.toUpperCase();
                return output;
            }
        }
    }
})

// Controller  控制台
App.controller("mycontroller", function($scope){
    $scope.aaa = users;
    $scope.bbb = "bbb";
    $scope.is = false // 显示和隐藏
})
// controller 控制台
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
// 控制台
App.controller("aaa",function($scope,upper){
    $scope.upcaseinput = ""
    $scope.transform = function(inp){
        $scope.out = upper.Upcase(inp);
    }
})

// 控制台
App.controller("ajax",function($scope,$http){
    $http({
        url: './data.json',
    })
    .then(function(data){
        console.log(data)
    },function(err){
        console.log(err)
    })
})
// 路由