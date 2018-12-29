function logout(){
    sessionStorage.removeItem('userId');
    window.location.replace('https://tugasmccakhir.herokuapp.com/');
}

function home(){
    window.location.replace('https://tugasmccakhir.herokuapp.com/home');
}

function mycourse(){
    window.location.replace('https://tugasmccakhir.herokuapp.com/mycourse');
}

function getCourse(courseId) {
    let URL = "https://tugasmccakhir.herokuapp.com/detail_course";
    let userId = sessionStorage.getItem('userId');

    let option = {
        url: URL,
        type: "POST",
        data: {
            courseId: courseId
        }
    };

    let request = $.ajax(option);
    request.done(function (r) {
        $('#mainCourse').text(r.course.Main_course);
        $('#courseName').text(r.course.Course_name);
        $('#popupVideo').attr('src', r.course.link);
        $('#description').text(r.course.Description);   

        let add = `<a onClick="save()" data-role="button" id="add">Add Course</a>`;
        let URL = 'https://tugasmccakhir.herokuapp.com/searchCourse';

        let option = {
            url: URL,
            type: "POST",
            data: {
                userId: userId,
                courseId: courseId
            }
        }

        let request = $.ajax(option);
        request.done(function(r){
            if(r.message != "Found"){
                $("#Detail").append(add);
                $("#Detail").trigger("create");
            }
        });
    });
}

function save() {
    let para = window.location.search;
    let search = new URLSearchParams(para);
    let courseId = search.get('courseId');
    let userId = sessionStorage.getItem('userId');
    
    let url = 'https://tugasmccakhir.herokuapp.com/assign_course'
    let option = {
        url: url,
        type: "POST",
        data: {
            courseId: courseId,
            userId: userId
        }
    }

    $.ajax(option);
    
    $("#add").hide();
}

$(function () {
    let para = window.location.search;
    let search = new URLSearchParams(para);
    let id = search.get('courseId');

    getCourse(id);
});