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

		$scope.findID = function(loginID) {
			$rootScope.loginID = loginID;
		    for (var i = 0; i < $rootScope.dados.length; i++) {
		        if ($rootScope.dados[i].id == loginID){
		            $rootScope.selecionado = $rootScope.dados[i]; // Return as soon as the object is found
		        	$scope.submitQuery();
		        }
		    }
		}



	  $(this).find(".submit i").removeAttr('class').addClass("fa fa-check").css({"color":"#fff"});
	  $(".submit").css({"background":"#2ecc71", "border-color":"#2ecc71"});
	  $(".feedback").show().animate({"opacity":"1", "bottom":"-80px"}, 400);
	  $("#input-id").css({"border-color":"#cc2e3a"});
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

   var dados = {};
   dados.dado = [];

   $http({
        method: 'GET',
		url: 'https://fake-restful.herokuapp.com/users'
	}).then(function successCallback(response) {
			for (var i = 0; i < response.data.length; i++) {
			    dados.dado.push(response.data[i]);
			}
			$scope.checaSelecionado();
		}, function errorCallback(response) {
	});
   $rootScope.dados = dados.dado;


   $scope.checaSelecionado = function() {
	   	for (var i = 0; i < $rootScope.dados.length; i++) {
	        if ($rootScope.dados[i].id == $rootScope.loginID){
	            $rootScope.selecionado = $rootScope.dados[i]; 
	            $scope.getExtrato($rootScope.selecionado.id);
	        }
	    }
	}

	$scope.getExtrato = function(id){
   		var extrato = [];

		$http({
	        method: 'GET',
			url: 'https://fake-restful.herokuapp.com/users/' + id + '/extratos'
		}).then(function successCallback(response) {
				for (var i = 0; i < response.data.length; i++) {
				    extrato.push(response.data[i]);
				}
			}, function errorCallback(response) {
		});
		$scope.extrato = extrato;
	};

    $scope.hasChanged = function() {
		$("#agenciaDestino").val("");
		$("#contaDestino").val("");
	};

	$scope.newTransfer = function(){
    };
});

app.controller('TransfCtrl', function($rootScope, $location, $scope, $http, accounts, users)
{
   	$rootScope.activetab = $location.path();

   	$rootScope.contas = accounts.contas;
   	$rootScope.userAcc = $rootScope.contas[0];
   	$rootScope.destAcc = $rootScope.contas[0];
    	
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

	$scope.fechaAlert = function(){
		$("#alert").addClass("hidden");
		$location.path('/main');
	}

	$scope.fechaAlertTransf = function(id){
		$("#"+id).addClass("hidden");
	}

	$scope.transf = function(user, dest, valor, contaUser, contaDest){

		//TRANSF PARA MESMO USUÁRIO
		if (user.titular == dest.titular) {
			if (contaUser.tipo == contaDest.tipo) {
					$("#alertConta").removeClass("hidden");
			}
			else{
				if (contaUser.tipo == "corrente") {
					if (valor > user.saldo + user.limite) {
						$("#alertSaldo").removeClass("hidden");
					}
					else{
						if (valor < user.saldo) {
							$scope.update(user, dest, valor, contaUser, contaDest, "dest", "");
							$scope.update(user, dest, valor, contaUser, contaDest, "user", "saldo");
						}
						else{
							$scope.update(user, dest, valor, contaUser, contaDest, "dest", "");
							$scope.update(user, dest, valor, contaUser, contaDest, "user", "limite");
						}
					}
				}
				else{
					if (valor > user.poupan) {
						$("#alertSaldo").removeClass("hidden");
					}
					else{
							$scope.update(user, dest, valor, contaUser, contaDest, "dest", "");
							$scope.update(user, dest, valor, contaUser, contaDest, "user", "poupan");
					}
				}
			}

		}
		//TRANSF PARA USUÁRIO DIFERENTE
		else{
			if (contaUser.tipo == "corrente") {
				if (valor > user.saldo + user.limite) {
					$("#alertSaldo").removeClass("hidden");
				}
				else{
					if (valor < user.saldo) {
						$scope.update(user, dest, valor, contaUser, contaDest, "dest", "");
						$scope.update(user, dest, valor, contaUser, contaDest, "user", "saldo");
					}
					else{
						$scope.update(user, dest, valor, contaUser, contaDest, "dest", "");
						$scope.update(user, dest, valor, contaUser, contaDest, "user", "limite");
					}
				}
			}
			else{
				if (valor > user.poupan) {
					$("#alertSaldo").removeClass("hidden");
				}
				else{
						$scope.update(user, dest, valor, contaUser, contaDest, "dest", "");
						$scope.update(user, dest, valor, contaUser, contaDest, "user", "poupan");
				}
			}
			

		}
		
	};

	$scope.update = function(user, dest, valor, contaUser, contaDest, tipo, operacao){

		if(tipo == "user"){
			//Operações na conta do usuário
			if(operacao == "saldo"){
				$http({
				  	url: 'https://fake-restful.herokuapp.com/users/' + user.id,
				  	method: 'PATCH',
				  	headers: {
		    			'Content-Type': 'application/json'
		    		},
				  	data: {
				  		saldo: user.saldo - valor
				  	}
				  		
				}).success(function(response) {
				      	$("#alert").removeClass("hidden");
				      	$scope.updateExtrato(dest, user, valor, contaUser, contaDest, "Débito", operacao);
				  	}).
				  error(function(response) {
				  console.log(response);
				  return false;
				});	
			}
			else if(operacao == "limite"){
				$http({
				  	url: 'https://fake-restful.herokuapp.com/users/' + user.id,
				  	method: 'PATCH',
				  	headers: {
		    			'Content-Type': 'application/json'
		    		},
				  	data: {
				  		saldo: 0,
				  		limite: user.limite - valor
				  	}
				  		
				}).success(function(response) {
				      	$("#alert").removeClass("hidden");
				      	$scope.updateExtrato(dest, user, valor, contaUser, contaDest, "Débito", operacao);
				  	}).
				  error(function(response) {
				  console.log(response);
				  return false;
				});
			}
			else if(operacao == "poupan"){
				$http({
				  	url: 'https://fake-restful.herokuapp.com/users/' + user.id,
				  	method: 'PATCH',
				  	headers: {
		    			'Content-Type': 'application/json'
		    		},
				  	data: {
				  		poupan: dest.poupan - valor
				  	}
				  		
				}).success(function(response) {
				      	$("#alert").removeClass("hidden");
				      	$scope.updateExtrato(dest, user, valor, contaUser, contaDest, "Débito", operacao);
				  	}).
				  error(function(response) {
				  console.log(response);
				  return false;
				});
			}
		}
		else{
			//Operações na conta do favorecido
			if (contaDest.tipo == "corrente") {
				$http({
				  	url: 'https://fake-restful.herokuapp.com/users/' + dest.id,
				  	method: 'PATCH',
				  	headers: {
		    			'Content-Type': 'application/json'
		    		},
				  	data: {
				  		saldo: dest.saldo + valor
				  	}
				  		
				}).success(function(response) {
				      	$("#alert").removeClass("hidden");
				      	$scope.updateExtrato(user, dest, valor, contaUser, contaDest, "Crédito", operacao);
				  	}).
				  error(function(response) {
				  console.log(response);
				  return false;
				});
			} 
			else if(contaDest.tipo == "poupan"){
				$http({
				  	url: 'https://fake-restful.herokuapp.com/users/' + dest.id,
				  	method: 'PATCH',
				  	headers: {
		    			'Content-Type': 'application/json'
		    		},
				  	data: {
				  		poupan: dest.poupan + valor
				  	}
				  		
				}).success(function(response) {
				      	$("#alert").removeClass("hidden");
				      	$scope.updateExtrato(user, dest, valor, contaUser, contaDest, "Crédito", operacao);
				  	}).
				  error(function(response) {
				  console.log(response);
				  return false;
				});
			}			
		}
	}

	$scope.updateExtrato = function(user, dest, valor, contaUser, contaDest, tipo, operacao){
		$http({
		  	url: 'https://fake-restful.herokuapp.com/users/' + user.id +'/extratos',
		  	method: 'POST',
		  	headers: {
    			'Content-Type': 'application/json'
    		},
		  	data: {

	  			usuario: dest.titular,
                origem: contaUser.nome,
                destino: contaDest.nome,
                tipo: tipo,
                valor: valor,
                userId: user.id
		  		
		  	}
		  		
		}).success(function(response) {
		  	}).
		  error(function(response) {
		  console.log(response);
		  return false;
		});
	}


    $scope.hasChanged = function() {
		$("#agenciaDestino").val("");
		$("#contaDestino").val("");
	};
});

