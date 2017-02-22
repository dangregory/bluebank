'use strict';

// Declare app level module which depends on views, and components

var app = angular.module('myApp',['ngRoute']);


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
 
});