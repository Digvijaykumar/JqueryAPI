$(document).ready(function () {
    $(".parkzetaLgonForm").validate({
        rules: {
            idEmail: {
                required: true
            },
            idSignal: {
                required: true
            }
        },
        messages: {
            idEmail: {
                required: "Username required",
            },
            idSignal: {
                required: "Password required",
            }
        }
    });

    $("#frm").validate({
        rules: {
            idLocations: {
                    required: true
                },
        },
        messages: {
            idLocations: {
                    required: "Username required",
                    },
        }
    })
});
/// Login API
function signin() {
    debugger;
    if ($(".parkzetaLgonForm").valid()) {
        var array = setAuth();
        var body = {
            grant_type: 'password',
            username: $("#idEmail").val(),
            password: $("#idSignal").val()
        };
        $.ajax({
            url: apiUrl() + 'token',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: body,
            success: function (result) {
                $("#lblError").text("");
                $("#lblError").css("display", "none");
                array.push(result.access_token);
                if (result.RoleId == 1) { // for Admin
                    array.push(result.UserId);
                    array.push(result.UserName);
                    array.push(result.RoleId);
                    array.push(result.RoleCode);
                    sessionStorage.setItem("AuthorizationData", array);
                    window.location = 'admin-dashboard.html';
                }
                else if (result.RoleId == 5) { // for Main Admin
                    array.push(result.UserId);
                    array.push(result.UserName);
                    array.push(result.RoleId);
                    array.push(result.RoleCode);
                    sessionStorage.setItem("AuthorizationData", array);
                    
                     window.location = 'admin-dashboard.html';
                }
                else if (result.RoleId == 2) { // For Supervisor
                    debugger;
                    array.push(result.UserId);
                    array.push(result.UserName);
                    array.push(result.RoleId);
                    array.push(result.RoleCode);
                    sessionStorage.setItem("AuthorizationData", array);
                    /// For Location Modal Popup
                    $('#locationPopup').modal('show', function () {
                    });
                    /// Get Locations By Specific User
                    $.ajax({
                        url: apiUrl() + 'api/GetLocationsByUser/' + result.UserId,
                        type: 'GET',
                        dataType: 'json',
                        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                        success: function (result1) {
                            debugger;
                            $("#idLocations").append($("<option></option>").val(0).html("Choose Location"));
                            for (var i = 0; i < result1.length; i++) {
                                $("#idLocations").append($("<option/>").val(result1[i].LocationId).text(result1[i].LocationName));
                            }
                        },
                        beforeSend: function (xhr, settings) {
                            xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("AuthorizationData").split(',')[0]);
                        },
                        error: function (result1) {
                            console.log(result1);
                        },
                    });
                    $('#redirect').click(function () {
                        if ($("#idLocations").val() > 0) {
                            array.push($("#idLocations").val());
                            sessionStorage.setItem("AuthorizationData", array);
                            window.location = 'supervisor-dashboard.html';
                        }
                    });
                }
                else if (result.RoleId == 4) { // for Client
                    array.push(result.UserId);
                    array.push(result.UserName);
                    array.push(result.RoleId);
                    array.push(result.RoleCode);
                    sessionStorage.setItem("AuthorizationData", array);
                    window.location = 'client-dashboard.html'; 
                }
                else if (result.RoleId == 3) { // for Employee
                   sweetAlert("Message...", "You don't have the permission for Login!!", "error");
                }
            },
            error: function (result) {
            //    if (result.statusText == "Bad Request") {  //result.status
                if (result.status == 500 || result.status == 200) {  
                    $("#lblError").text("The user name or password is incorrect.");
                    $("#lblError").css("display", "block");
                }
                console.log(result);
            }
        });
        return true;
    }
}
