function logout(){
    sessionStorage.removeItem('userId');
    window.location.href = "https://tugasmccakhir.herokuapp.com/";
}

function mycourse(){
    window.location.href = "https://tugasmccakhir.herokuapp.com/mycourse";
}

function list(data){
    for (let i = 0 ; i < data.length; i++) {
        let temp = data[i];
        let MainCourse = `<h1>${temp.Main_course}<h1>`;
        let CourseName = `${temp.Course_name}`;
        let Description = `<p>${temp.Description}</p>`;
        let View = `<a data-ajax="false" data-role="button" href="https://tugasmccakhir.herokuapp.com/detail?courseId=${temp.id}">View Detail</a>`;

        let item = `<li data-role="list-divider">${MainCourse}</li><li><div>${CourseName}${Description}${View}</div></li>`;

        $('#CourseList').append(item);
    }

    $('#CourseList').trigger('create');
    $('#CourseList').listview('refresh');
}

jQuery(document).ready(function($){
    let para = window.location.search;
    let search = new URLSearchParams(para);
    if(search.has("userData")){
        let data = search.get("userData");
        data = JSON.parse(data);
        sessionStorage.setItem('userId', data.facebookId);
    }

    let URL = "https://tugasmccakhir.herokuapp.com/courses";

    let option = {
        type: 'GET',
        url: URL
    };

    let request = $.ajax(option);

    request.done(function(r){
        list(r);
    });
});