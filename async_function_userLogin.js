async function userLogin(){

    // aconselho criar um <small> no final, depois do </form> assim: <small class="d-none" id=small-msg></small>
    // E no caso faria assim aqui:
    smallMsg = document.getElementById('small-msg');// vc pode usar o document.querySelector('#small-msg');
    smallMsg.classList.remove('d-none'); //remove o d-none, que esconde o <small>

    // estou capturando o botao Login usando como nome a class btn-dark, porem vc pode dar umm nome(id) pra ele para identifica-lo melhor
    // e no caso seria(um exemplo): btn = document.querySelector('#btnLogin'), para id usa # e para classes .;
    btn = document.querySelector('.btn-dark');
    btn.innerHTML = 'Aguarde, Verificando';
    url = 'post/login';
    // capturando o form <form>
    form = document.querySelector('login-form');
    let formData = new FormData(form)
    // criando o Body que vai dentro do fletch, com o method post e passando o form 
    var myBody = {method:'POST',body: formData}

    fetch(url,myBody)
    .then(await function(respose){ // await(espera a resposta do servidor, a variavel response, será a variavel que irá armazenar a resposta do servidor)
        return respose.json();       
    })
    .then(function(resultJson){
        if(resultJson.userLogado){
            //usuario logado com sucesso; 
            let user = resultJson.usuario;

            // definindo  a cor do texto
            smallMsg.classList.add('text-primary'); 
            smallMsg.classList.remove('text-danger');

            smallMsg.innerHTML = 'Usuário:'+ user.name +' logado com sucesso!';
            // aguarda 2 segundo e redireciona para tela principal do usuario, com seu token e o nome dele( informações passadas pelo backend, de acordo como foi desenvolvido)   
            setTimeout(function(){
                window.location.href = 'main/tela_usuario.html?name='+user.name+'&token='+user.token;
            }, 2000);
        }
        else{
            // email ou senha inválido. 
            //coloca a mensagem para o usuario que deu errado o login
            smallMsg.classList.add('text-danger'); //add class css para o texto ficar vermelho
            smallMsg.classList.remove('text-primary'); //remove class css para o texto não ficar azul

            smallMsg.innerHTML = 'Email:'+ document.querySelector('input[name="Email"]').value+' ou senha digitada inválida, verifique!';
            // espera dois segundos para esconder o <small>(a msg) novamente
            setTimeout(function(){
                smallMsg.classList.add('d-none'); //adiciona dentro da class no small msg oatributo d-none para ficar invisivel
                document.querySelector('input[name="Email"]').focus() // coloca o cursor direto no input email
            }, 2000);
        }
    });


}