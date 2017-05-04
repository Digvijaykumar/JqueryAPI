function forgotEmployeePassword() {
debugger;   
var firstname = $("#fname").val();
var lastname = $("#lname").val();
var code = $("#code").val();
// var body = {
// firstname: $("#fname").val(),
// lastname: $("#lname").val(),
// code: $("#code").val()
// };
$.ajax({
    url: apiUrl()+'api/EmployeeForgotSignal?firstname='+firstname+'&lastname='+lastname+'&code='+code,
    type: 'POST',
    dataType: 'json',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
  //  data: body,
    success: function (result) {
        debugger;
        if(result == 'Request has been send successfully to administartor.'){
        //    alert("<h1>Thanks </h1> Your request has been send to Administrator");
            window.location = 'forgot-pass-details.html';
        }
        else{
            alert("Invalid User Details.");
            }
        },               
        error: function (result) {
            debugger;
            console.log(result);
        },
            });
            
}
function forgotClientPassword() {
debugger;   
var email = $("#email").val();
// var body = {
// firstname: $("#fname").val(),
// lastname: $("#lname").val(),
// code: $("#code").val()
// };
$.ajax({
    url: apiUrl()+'api/ClientForgotSignal?email='+email,
    type: 'POST',
    dataType: 'json',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
  //  data: body,
    success: function (result) {
        debugger;
        if(result == 'Request has been send successfully to administartor.'){
        //    alert("<h1>Thanks </h1> Your request has been send to Administrator");
            window.location = 'forgot-pass-details.html';
        }
        else{
            alert("Invalid User Details.");
            }
        },               
        error: function (result) {
            debugger;
            console.log(result);
        },
            });
            
}


 $(document).ready(function () {
            $("#forgetPassword").validate({
            rules: {
            password: { 
                required: true,
                minlength: 6,
                maxlength: 20,
            },
            cfmPassword: { 
                equalTo: "#password",
                minlength: 6,
                maxlength: 20
            }
            },            
            messages:{
                password: { 
                required:"the password is required"
            }
            },            
        })
      });
function forgotPassword() {
    debugger;
    if ($("#forgetPassword").valid()) { 
    userId = (sessionStorage.getItem("AuthorizationData").split(',')[1]);
    newPassword = $("#password").val();
    $.ajax({
        url: apiUrl()+'api/CreateNewPassword?UserId='+userId+'&newPassword='+newPassword,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (result) {
            debugger;
            if(result.Status == true){
            //    alert("<h1>Thanks </h1> Your request has been send to Administrator");
                alert("Your new password Created.");
                window.location = 'index.html';
                signout();
            }
            else{
                alert("Invalid Details.");
                }
            },  
            beforeSend: function (xhr, settings) {
                debugger;
                xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("AuthorizationData").split(',')[0]);
            },             
            error: function (result) {
                debugger;
                console.log(result);
            },
        });            
    }
}


///
function getEmployees() {
    $("#attendants").empty();
    $("#supervisors").empty();
    $("#administrators").empty();
     $("#location").empty();
    var html = "<div><ul id='scroll-1' class='list-group scrollbar'>";
    $.ajax({
        url: apiUrl() + 'api/GetEmployees',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (emp) {
            for (var i = 0; i < emp.length; i++) {
                 html += "<li class='list-group-item' data-toggle='modal' data-target='#myModal'><p class='usernm'><a onclick = getEditAdmin(" + emp[i].UserId + ",3);> " + emp[i].Fullname + "</a><p class='dd'>" + emp[i].Phone + "</p></p><span class='glyphicon glyphicon-chevron-right userarrow'></span></li>";
            }
            html += "</ul></div>";
            $("#attendants").append(html);
        },
        beforeSend: function (xhr, settings) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("AuthorizationData").split(',')[0]);
        },
        error: function (emp) {
            console.log(emp);
        },
    });
}
$(document).ready(function () {
    getEmployees();
})
///
function getSupervisors() {
    debugger;
    $("#attendants").empty();
    $("#supervisors").empty();
    $("#administrators").empty();
     $("#location").empty();
    var html = "<div><ul id='scroll-1' class='list-group scrollbar'>";
    $.ajax({
        url: apiUrl() + 'api/GetSupervisors',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (sup) {
            debugger;
            for (var i = 0; i < sup.length; i++) {
                
                html += "<li class='list-group-item' data-toggle='modal' data-target='#myModal'><p class='usernm'><a onclick = getEditAdmin(" + sup[i].UserId + ",2);> " + sup[i].Fullname + "</a><p class='dd'>" + sup[i].Phone + "</p></p><span class='glyphicon glyphicon-chevron-right userarrow'></span></li>";
                // html += "<li class='list-group-item' data-toggle='modal' data-target='#myModal'><p class='usernm'><a href='supervisor-admin-view.html?uid=" + sup[i].UserId + "&roleId=" + 2 + "'> " + sup[i].Fullname + "</a><p class='dd'>" + sup[i].Phone + "</p></p><span class='glyphicon glyphicon-chevron-right userarrow'></span></li>";
            }
            html += "</ul></div>";
            $("#supervisors").append(html);
        },
        beforeSend: function (xhr, settings) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("AuthorizationData").split(',')[0]);
        },
        error: function (sup) {
            console.log(sup);
        },
    });
}
///
function getAdministrators() {
    $("#attendants").empty();
    $("#supervisors").empty();
    $("#administrators").empty();
     $("#location").empty();
    var html = "<div><ul id='scroll-1' class='list-group scrollbar'>";
    $.ajax({
        url: apiUrl() + 'api/GetAdministrators',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (adm) {
            debugger;
            for (var i = 0; i < adm.length; i++) {
                //html += "<li class='list-group-item' data-toggle='modal' data-target='#myModal'><a href='admin-admin-sup-view.html?userId=" + adm[i].UserId + "'> " + adm[i].Fullname + "</a><p class='dd'>" + + "</p></p><span class='glyphicon glyphicon-chevron-right userarrow'></span></li>";
                 html += "<li class='list-group-item' data-toggle='modal' data-target='#myModal'><p class='usernm'><a onclick = getEditAdmin(" + adm[i].UserId + ",1);> " + adm[i].Fullname + "</a><p class='dd'>" +adm[i].Phone + "</p></p><span class='glyphicon glyphicon-chevron-right userarrow'></span></li>";

            }
            html += "</ul></div>";
            $("#administrators").append(html);
        },
        beforeSend: function (xhr, settings) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("AuthorizationData").split(',')[0]);
        },
        error: function (adm) {
            console.log(adm);
        },
    });
}
function getLocations() {
    $("#attendants").empty();
    $("#supervisors").empty();
    $("#administrators").empty();
    $("#location").empty();
    var html = "<div><ul id='scroll-1' class='list-group scrollbar'>";
    $.ajax({
        url: apiUrl() + 'api/GetLocations',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (loc) {
            debugger;
            for (var i = 0; i < loc.length; i++) {
                //html += "<li class='list-group-item' data-toggle='modal' data-target='#myModal'><a href='admin-admin-sup-view.html?userId=" + adm[i].UserId + "'> " + adm[i].Fullname + "</a><p class='dd'>" + + "</p></p><span class='glyphicon glyphicon-chevron-right userarrow'></span></li>";
                 html += "<li class='list-group-item' data-toggle='modal' data-target='#myModal'><p class='usernm'><a onclick = getEditAdmin(" + loc[i].LocationId + ",7);> " + loc[i].LocationName + "</a><p class='dd'>" +loc[i].LocationName + "</p></p><span class='glyphicon glyphicon-chevron-right userarrow'></span></li>";

            }
            html += "</ul></div>";
            $("#location").append(html);
        },
        beforeSend: function (xhr, settings) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("AuthorizationData").split(',')[0]);
        },
        error: function (loc) {
            console.log(loc);
        },
    });
}

function getEditAdmin(AdminId,RoleID)
{
    debugger;
    localStorage.setItem("AdministrationID", AdminId)
    localStorage.setItem("SupRoleID", RoleID)
    localStorage.setItem("EmpRoleID", RoleID)
    if(RoleID==1)
    {
    window.location.href = 'Edit-AdminProfile.html';
    }
    if(RoleID==2)
    {
        debugger;
      window.location.href =  'supervisor-admin-view.html';
    }
     if(RoleID==3)
    {
        debugger;
      window.location.href =  'employee-admin-view.html';
    }
    if(RoleID == 7){
         window.location.href =  'update-admin-add-location.html';
    }
}

 function getSupervisorName()
        {
debugger;
            $.ajax({
                //url: apiUrl() + 'api/GetLocationsByUser/' + result.UserId,
                url: apiUrl() + 'api/GetSupervisors',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (result1) {
                    $("#SupervisorId").append($("<option></option>").val(0).html("Select Supervisor"));
                    for (var i = 0; i < result1.length; i++) {
                        $("#SupervisorId").append($("<option/>").val(result1[i].UserId).text(result1[i].Fullname));
                    }
                },
                beforeSend: function (xhr, settings) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("AuthorizationData").split(',')[0]);
                },
                error: function (result1) { 
                    console.log(result1);
                },
            });
        }
