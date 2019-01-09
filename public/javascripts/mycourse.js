function logout(){
    sessionStorage.removeItem('userId');
    window.location.href = "/";
}

function home(){
    window.location.href = "/home";
}

function list(data){
    for (let i = 0 ; i < data.length; i++) {
        let temp = data[i];
        let MainCourse = `<h1>${temp.Main_course}<h1>`;
        let CourseName = `${temp.Course_name}`;
        let link = `<center><iframe width="420" height="315" id=popupVideo src="${temp.link}"></iframe></center>`
        let Description = `<p>${temp.Description}</p>`;

        let item = `<li data-role="list-divider">${MainCourse}</li><li><div>${CourseName}${link}${Description}</div></li>`;

        $('#myCourse').append(item);
    }

    $('#myCourse').trigger('create');
    $('#myCourse').listview('refresh');
}

jQuery(document).ready(function($){
    let URL = "/user_courses";
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