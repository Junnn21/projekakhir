function logout(){
    sessionStorage.removeItem('userId');
    window.location.href = "https://tugasmccakhir.herokuapp.com/";
}

function home(){
    window.location.href = "https://tugasmccakhir.herokuapp.com/home";
}

function list(data){
    for (let i = 0 ; i < data.length; i++) {
        let temp = data[i];
        let MainCourse = `<h1>${temp.Main_course}<h1>`;
        let CourseName = `${temp.Course_name}`;
        let Description = `<p>${temp.Description}</p>`;
        let View = `<a data-ajax="false" data-role="button" href="https://tugasmccakhir.herokuapp.com/detail?courseId=${temp.id}">View Detail</a>`;

        let item = `<li data-role="list-divider">${MainCourse}</li><li><div>${CourseName}${Description}${View}</div></li>`;

        $('#myCourse').append(item);
    }

    $('#myCourse').trigger('create');
    $('#myCourse').listview('refresh');
}

jQuery(document).ready(function($){
    let URL = "https://tugasmccakhir.herokuapp.com/user_courses";
    let userId = sessionStorage.getItem('userId');

    let option = {
        type: 'POST',
        url: URL,
        data: {
            userId: userId
        }
    };

    let request = $.ajax(option);

    request.done(function(r){
        list(r);
    });
});