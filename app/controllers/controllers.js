app.controller('LoginCtrl', function($rootScope, $location)
{
	console.log("caiu2");
   $rootScope.activetab = $location.path();

   $( ".input" ).focusin(function() {
	  $( this ).find( "span" ).animate({"opacity":"0"}, 200);
	});

	$( ".input" ).focusout(function() {
	  $( this ).find( "span" ).animate({"opacity":"1"}, 300);
	});

	$(".login").submit(function(){
	  $(this).find(".submit i").removeAttr('class').addClass("fa fa-check").css({"color":"#fff"});
	  $(".submit").css({"background":"#2ecc71", "border-color":"#2ecc71"});
	  $(".feedback").show().animate({"opacity":"1", "bottom":"-80px"}, 400);
	  $("input").css({"border-color":"#2ecc71"});
	  return false;
	})
});
 
app.controller('ContactCtrl', function($rootScope, $location)
{
   $rootScope.activetab = $location.path();
}); 

app.controller('AboutCtrl', function($rootScope, $location)
{
   $rootScope.activetab = $location.path();
});

app.controller('MainCtrl', function($rootScope, $location, $scope, $http)
{
   $rootScope.activetab = $location.path();

   $scope.layout = [
		   {type: 'header', path:'layout/header.html'}, 
		   {type: 'footer', path:'layout/footer.html'}
	   ];

        $scope.dados = {};

        $scope.selec = "123456";

        $scope.getResult = function(dado){
		    return dado.id == $scope.selec;
		};

        $scope.dados = [
        	{id:"123456", titular:"Daniel", saldo: -1000, limite: 5000, poupan: 20000},
        	{id:"123457", titular:"Maria", saldo: 1000, limite: 5000, poupan: 1000},
        	{id:"123458", titular:"José", saldo: 52000, limite: 8000, poupan: 4000},
        	{id:"123459", titular:"Fernanda", saldo: 400, limite: 1000, poupan: 200},
        	{id:"123450", titular:"Ana", saldo: 9000, limite: 20000, poupan: 10000}
        ];


       


});

