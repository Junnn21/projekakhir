$(function(){
    $("#formLogin").submit(login);
})

function login(e){
    e.preventDefault();
    let email = $("#inputEmail").val();
    let password = $("#inputPassword").val();

    let option = {
        url: 'https://tugasmccakhir.herokuapp.com/doLogin',
        type: 'POST',
        data: {
            email: email,
            password: password
        }
    }

    let request = $.ajax(option);

    request.done(function(r){
        if(r.status === "SUCCESS"){
            let data = JSON.stringify(r.user.id);
            sessionStorage.setItem('userId', data);
            window.location.href = 'https://tugasmccakhir.herokuapp.com/home';
        } else{
            alert(r.message);
        }
    });
}