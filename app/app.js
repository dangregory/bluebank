'use strict';

// Declare app level module which depends on views, and components

var app = angular.module('myApp',['ngRoute', 'ui.utils.masks']);


app.config(function($routeProvider, $locationProvider)
{
   $routeProvider
 
   // para a rota '/', carregaremos o template home.html e o controller 'HomeCtrl'
   .when('/', {
      templateUrl : 'views/login.html',
      controller     : 'LoginCtrl',
   })
 
   // para a rota '/sobre', carregaremos o template sobre.html e o controller 'SobreCtrl'
   .when('/sobre', {
      templateUrl : 'views/about.html',
      controller  : 'AboutCtrl',
   })
 
   // para a rota '/contato', carregaremos o template contato.html e o controller 'ContatoCtrl'
   .when('/contato', {
      templateUrl : 'views/contact.html',
      controller  : 'ContactCtrl',
   })

   .when('/main', {
      templateUrl : 'views/main.html',
      controller  : 'MainCtrl',
   })

   .when('/transf', {
      templateUrl : 'views/transf.html',
      controller  : 'TransfCtrl',
   })
 
});

app.factory('users', function($http){

   var dados = {};
   dados.dado = [];


   $http({
        method: 'GET',
        url: 'http://private-915401-bluebank.apiary-mock.com/users'
      }).then(function successCallback(response) {
         for (var i = 0; i < response.data.length; i++) {
            dados.dado.push(response.data[i]);
         }
         //logado = users.dados[0];
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });


  return {
      dados : dados.dado
  };

});

app.factory('accounts', function($http){


   var contas = {};
   contas.dado = [];

   $http({
        method: 'GET',
        url: 'http://private-915401-bluebank.apiary-mock.com/accountType'
      }).then(function successCallback(response) {
         for (var i = 0; i < response.data.length; i++) {
            contas.dado.push(response.data[i]);
         }
         //logado = users.dados[0];
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });

  return {
      contas : contas.dado
  };

});



