  var notId = [];
        //var notid=[];
        //notid.push({});
        //var nid = [];
        function disapprove( id, divid, nid, rFrom)
        {
            debugger;
            var statusValue = '';
            var notid = id.replace("Approveradio", "");
            var notid2 = id.replace("Approveradio2", "");
            var dvid = divid.id;
            dvid = dvid.replace("dv", "");
            var radiovalue = $('#' + id).val();
            var kk = '#a' + dvid;
            if(radiovalue == 'Approve'){
                 statusValue = 1;
            }
            else{
                statusValue = 0;
            }
            if(radiovalue == 'Approve'){
                $(kk).html('<img id="theImg" src="images/right-box.png" />');
                $( ".activeStar" ).addClass( "activeStar1" );
                $(".activeStar").removeClass("activeStar");
                  notId.push({
                      Status: statusValue,
                        NotificationId: nid,
                        UserId: rFrom
                    })
                    console.log(notId);
            }
            else{
                 $(kk).html('<img id="theImg" src="images/cros-box.png" />');
                 $( ".activeStar" ).addClass( "activeStar" );
                 $(".activeStar").removeClass("activeStar1");
                 notId.push({
                     Status: statusValue,
                     NotificationId: nid,
                     UserId: rFrom
                 })
            }


        }
	
//api/EmployeeForgotSignal?firstname=' + firstname + '&lastname=' + lastname + '&code=' + code,
    function GetAllNotifications() {
        debugger;
        var html = "<div class='container notificationBlock'>";
		var userID = sessionStorage.getItem("AuthorizationData").split(',')[1];
		var roleID = sessionStorage.getItem("AuthorizationData").split(',')[3];
		notId = [];
        $.ajax({
            url: apiUrl() + 'api/GetAllNotifications?UserId=' + userID + '&roleID=' + roleID,
            type: 'GET',
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (emp) {
                

                var notificationNo = emp.length ;
                $("#notificationNumber").html(notificationNo);

                debugger;
                //onclick='disapprove(this.id," + dvid + ")'
                for (var i = 0; i < emp.length; i++) {
                  debugger;                    

                    var dvid = $.trim('dv' + emp[i].NotificationId);
                    var nid = emp[i].NotificationId;
                    var rFrom = emp[i].RequestFrom;
                html += "<div class='col-xs-1 approveStatus' id='a" +
                 emp[i].NotificationId + "' > </div><div class='col-xs-11 notificationRight' id='dv" +
                 emp[i].NotificationId + "'><div class='col-xs-10'><strong>" + emp[i].Username +
                "</strong></div><div class='col-xs-2'>" + emp[i].RequestedDate + "</div><div class='col-xs-10'>"
                + emp[i].Notification +
                "</div><div class='col-xs-2 activeStar'>*</div><div class='col-xs-12 nopadding container approveHeader'><div class='col-xs-6 approveMargin'> <div class='radio-select-approve'><input type='radio' onclick='disapprove(this.id,"+ dvid +","+ nid +","+ rFrom +")' value='Approve' name='"
                + emp[i].NotificationId + "'  id='" + emp[i].NotificationId +
                 "Approveradio" + "' class='reserved'><label for='" + emp[i].NotificationId +
                 "Approveradio" + "'><span class='aapSpace'>APPROVE</span></label></div></div><div class='col-xs-6'><div class='radio-select-disapprove'><input type='radio' onclick='disapprove(this.id,"+ dvid +","+ nid +","+ rFrom +")' value='DisApprove' name='" +
                 emp[i].NotificationId + "' id='" + emp[i].NotificationId +
                 "Approveradio2" + "' class='reserved'><label for='" + emp[i].NotificationId + "Approveradio2" + "'><span class='aapSpace'>DISAPPROVE</span></label></div></div></div></div>";
            }

                $("#notificationList").append(html);
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
        GetAllNotifications();
    });
    function getRadioValue() {
        document.getElementById("")
    }

function notificationChecked(id, locId, shiftId)
{
debugger;
if (id.checked == true) 
{
shiftlist.push({
        ShiftId:shiftId,
        ParkingLocationId:locId
    });
}

else {
    shiftlist = $.grep(shiftlist, function (value) {
        return value != shiftId;
    });
}
}

$("#btnFinish").click(function () {
   // console.log(notId);
    debugger;
            var body = {
                ApprovedUserId: sessionStorage.getItem("AuthorizationData").split(',')[1],
                Notifications: notId
            };
            $.ajax({
                url: apiUrl() + 'api/ApproveDeclineNotification',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                data: body,
                async: false,
                success: function (data) {                   
                    if (data == "Success!") {
                         swal({
                            title: "Success!",
                            text: "Supervisor profile has been created successfully",
                            type: "success"
                        }, function() {
                            window.location = "admin-dashboard.html";
                        });
                    }
                    if (data == "Failed!") {
                         sweetAlert("Message...", "Failed!", "error");
                    }
                },
                beforeSend: function (xhr, settings) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("AuthorizationData").split(',')[0]);
                },
                error: function (result1) {
                    console.log(result1);
                },
            });
			
        })
