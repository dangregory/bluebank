app.controller('LoginCtrl', function($rootScope, $location, $scope, users)
{
   $rootScope.activetab = $location.path();

   $rootScope.dados = users.dados;

   $rootScope.layout = [
		   {type: 'header', path:'layout/header.html'}, 
		   {type: 'footer', path:'layout/footer.html'}
	   ];


   $( ".input" ).focusin(function() {
	  $( this ).find( "span" ).animate({"opacity":"0"}, 200);
	});

	$( ".input" ).focusout(function() {
	  $( this ).find( "span" ).animate({"opacity":"1"}, 300);
	});

	$(".login").submit(function(){

		
		console.log($rootScope.dados);
		$scope.findID = function(loginID) {
		    for (var i = 0; i < $rootScope.dados.length; i++) {
		        if ($rootScope.dados[i].id === loginID){
		            $rootScope.selecionado = $rootScope.dados[i]; // Return as soon as the object is found
		        	console.log($rootScope.selecionado);
		        	$scope.submitQuery();
		        }
		    }
		    console.log("deu ruim");
		    return null; // The object was not found
		}



	  $(this).find(".submit i").removeAttr('class').addClass("fa fa-check").css({"color":"#fff"});
	  $(".submit").css({"background":"#2ecc71", "border-color":"#2ecc71"});
	  $(".feedback").show().animate({"opacity":"1", "bottom":"-80px"}, 400);
	  $("input").css({"border-color":"#2ecc71"});
	  return false;
	})

	$scope.submitQuery = function () {
		$location.path('/main');
	};


});
 
app.controller('ContactCtrl', function($rootScope, $location)
{
   $rootScope.activetab = $location.path();
}); 

app.controller('AboutCtrl', function($rootScope, $location)
{
   $rootScope.activetab = $location.path();
});

app.controller('MainCtrl', function($rootScope, $location, $scope, $http, users)
{
   $rootScope.activetab = $location.path();    

    $scope.hasChanged = function() {
		$("#agenciaDestino").val("");
		$("#contaDestino").val("");
	};

	$scope.teste = function(dado, transValue){
		if(transValue > dado.saldo){
			$scope.erro = true;
		};
		console.log(dado);
	};

	$scope.newTransfer = function(){
    };
});

app.controller('TransfCtrl', function($rootScope, $location, $scope, $http, accounts)
{
   	$rootScope.activetab = $location.path();

   	$rootScope.contas = accounts.contas;
   	console.log($rootScope.contas);
    	
	var current_fs, next_fs, previous_fs; //fieldsets
	var left, opacity, scale; //fieldset properties which we will animate
	var animating; //flag to prevent quick multi-click glitches

	$(".next").click(function(){
		if(animating) return false;
		animating = true;
		
		current_fs = $(this).parent();
		next_fs = $(this).parent().next();
		
		//activate next step on progressbar using the index of next_fs
		$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
		
		//show the next fieldset
		next_fs.show(); 
		//hide the current fieldset with style
		current_fs.animate({opacity: 0}, {
			step: function(now, mx) {
				//as the opacity of current_fs reduces to 0 - stored in "now"
				//1. scale current_fs down to 80%
				scale = 1 - (1 - now) * 0.2;
				//2. bring next_fs from the right(50%)
				left = (now * 50)+"%";
				//3. increase opacity of next_fs to 1 as it moves in
				opacity = 1 - now;
				current_fs.css({
	        'transform': 'scale('+scale+')',
	        'position': 'absolute'
	      });
				next_fs.css({'left': left, 'opacity': opacity});
			}, 
			duration: 800, 
			complete: function(){
				current_fs.hide();
				animating = false;
			}, 
			//this comes from the custom easing plugin
			easing: 'easeInOutBack'
		});
	});

	$(".previous").click(function(){
		if(animating) return false;
		animating = true;
		
		current_fs = $(this).parent();
		previous_fs = $(this).parent().prev();
		
		//de-activate current step on progressbar
		$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
		
		//show the previous fieldset
		previous_fs.show(); 
		//hide the current fieldset with style
		current_fs.animate({opacity: 0}, {
			step: function(now, mx) {
				//as the opacity of current_fs reduces to 0 - stored in "now"
				//1. scale previous_fs from 80% to 100%
				scale = 0.8 + (1 - now) * 0.2;
				//2. take current_fs to the right(50%) - from 0%
				left = ((1-now) * 50)+"%";
				//3. increase opacity of previous_fs to 1 as it moves in
				opacity = 1 - now;
				current_fs.css({'left': left});
				previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
			}, 
			duration: 800, 
			complete: function(){
				current_fs.hide();
				animating = false;
			}, 
			//this comes from the custom easing plugin
			easing: 'easeInOutBack'
		});
	});



	$scope.transf = function(user, dest, valor, contaUser, contaDest){
		console.log(user);
		console.log(dest);
		console.log(valor);
		console.log(contaUser);
		console.log(contaDest);
		
		console.log(user);
		console.log(dest);
		if (user.titular == dest.titular) {
			if (contaUser.tipo == contaDest.tipo) {
				console.log("mesmo tipo de conta");
			}
			else{
				console.log("transf de "+ contaUser.nome + " para " + contaDest.nome);
				if (valor > user.saldo + user.limite) {
					console.log("vc n tem grana");
				}
				else{
					if (valor < user.saldo) {
						console.log("vc vai usar seu saldo");
					}
					else{
						console.log("vc vai usar do limite");
					}
				}
			}

		}
		else{
			if (valor > user.saldo + user.limite) {
				console.log("vc n tem grana");
			}
			else{
				if (valor < user.saldo) {
					console.log("vc vai usar seu saldo");
				}
				else{
					console.log("vc vai usar do limite");
				}
			}

		}
		
	};


    $scope.hasChanged = function() {
		$("#agenciaDestino").val("");
		$("#contaDestino").val("");
	};
});

