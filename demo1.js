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

// 为了防止gulp压缩 官方写法 (顺序不能乱) 函数形参顺序相同
App.controller("official",['$scope',function($scope){

}])

// 路由配置  $routeProvide 用来配置路由
App.config(['$routeProvider', function($routeProvider){
    /**
     * when方法里面有两个形参 第一个表示路径 第二个是一个对象templateUrl 为组建的地址
     */
    $routeProvider.caseInsensitiveMatch = true; // 路由不区分大小写
    $routeProvider
    .when('/home',{
        templateUrl: 'template/home.html',
        controller: 'home'
    })
    .when('/course',{
        templateUrl: 'template/course.html',
        controller: 'course'
    })
    .when('/course/detail/:id',{
        templateUrl: 'template/detail.html',
        controller: 'detail'
    })
    .otherwise({ //默认主页
		redirectTo:'/home'
	})
}])

App.controller('home',['$scope','$rootScope',function($scope,$rootScope){
    $scope.abc="77sdf"
    $rootScope.abc = "7758"
}])

var detail = [
    {
        id:0,
        text: "tomcat"
    },{
        id:1,
        text: "tomcat2"
    },{
        id:2,
        text: "tomcat3"
    }
]
App.controller('course',['$scope','$rootScope','$route',function($scope,$rootScope,$route){
    $scope.ref = $rootScope.abc
    $scope.detail = detail
    // 刷新路由显示区域
    $scope.rel = function(){
        $route.reload()
    }
    /**也可以 $rootScope.$on 根节点添加路由事件，则每个路由都添加上了*/
    // 路由跳转生命周期
    $scope.$on('$routeChangeStart',function(event,next,current){
        console.log(next)
        if(confirm('跳转到'+ next.$$route.originalPath)){
            // 跳转
        }else {
            // 取消跳转
            event.preventDefault()
        }
    })
    // 跳转成功  外部向里跳转
    $scope.$on('$routeChangeSuccess',function(event,current,previous){
        console.log(current)
        console.log(previous)
    })
}])

App.controller('detail',['$scope','$rootScope','$routeParams',function($scope,$rootScope,$routeParams){
    $scope.aaa = $routeParams.id
}])