function getResult(url) {
    return new Promise(
        function(resolve, reject) {
            var settings = {
                "async": true,
                "url": url,
                "method": "GET",
                "contentType": "application/json; charset=utf-8",
                "datatype": "json",
            }

            $.ajax(settings)
                .done(function(response) {
                    var res = JSON.parse(response);
                    resolve(res);
                })
                .error(function(err) {
                    console.log(err);
                    reject(err);
                });
        }
    );
}

function postResult(url, data) {
    return new Promise(
        function(resolve, reject) {
            $.ajax({
                    type: "POST",
                    url: url,
                    data: data,
                    contentType: "application/json; charset=utf-8",
                    datatype: "json",
                    async: "true",
                })
                .done(function(response) {
                    var res = JSON.parse(response);
                    resolve(res);
                })
                .error(function(err) {
                    console.log(err);
                    reject(err);
                });
        }
    )
}

function filterItems(arr, query) {
    return arr.filter(function(el) {
        return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
    })
}

function searchBoxModal(val) {
    $("#searchList").empty();
    var appUrl = $('#hdn-url').val();
    if (val.length > 2) {
        //console.log(val);
        var html = "<ul id='scroll-1' class='list-group scrollbar'>";
        // post data to server
        $('.loader').show();
        getData(appUrl).then(function(resp) {

            if (resp.status) {
                console.log("success list!!!", resp)
                var searchValue = resp.Searh;
                var searchCont = filterItems(searchValue, val);
                for (var i = 0; i < searchCont.length; i++) {
                    html += '<li onclick="selectSearch(\'' + searchCont[i] + '\')">' + searchCont[i] + '</li>';
                }
                html += "</ul>";

                $("#searchList").empty();
                $("#searchList").append(html);
                $('#searchList li:first-child').addClass('selected');
                $('.loader').hide();
            } else {
                $("#searchList").empty();
                alert("data not valid!!!");
            }
        }).
        catch(function(err) {
            console.log(err);
        })
    }

}

function selectSearch(resp) {
    window.location = '?test=' + resp;
}

$(document).ready(function() {
    var v = $("#contact-form").validate({
        rules: {
            name: {
                required: true,
                maxlength: 30,
                name_regex: /^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/g
            },
            email: {
                required: true,
                email: true,
                email_regex: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
            },
            mobile: {
                required: true,
                minlength: 10,
                maxlength: 10,
                number: true
            }
        },
        messages: {
            name: $(".name").attr('data-error'),
            email: $(".email").attr('data-error'),
            mobile: $(".mobile").attr('data-error')
        },
        errorElement: "em",
        errorPlacement: function(error, element) {
            // Add the `invalid-feedback` class to the error element
            error.addClass("invalid-feedback");
            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.next("label"));
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function(element, errorClass, validClass) {
            $(element).addClass("is-invalid").removeClass("is-valid");
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).addClass("is-valid").removeClass("is-invalid");
        },
        submitHandler: function(form) {
            form.submit();
        }
    });

    // these buttons all run the validation, overridden by specific targets above and submit final data
    var redirectURL='';
    $("#form-contact-us").find('.submitBtn').click(function(e) {
        if (v.form()) {
            if ($("#form-contact-us").find('#policy:checked').val()) {
                var body = {
                        "name": $('#name').val(),
                        "mobile": $('#mobile').val(),
                        "email": $('#email').val(),
                        "message": $('#message').val()
                    }
                    // post data to server
                postDetails('/api/url', JSON.stringify(body)).then(function(resData) {
                    if (resData.status == 1) {
                        console.log("End API");
                        alert("Data inserted successfully!!!");
                        redirectURL = resData.RedirectToURL;
                      //  window.open(resData.RedirectToURL,'_self');
                      $('.otp-modal').modal('show');
                    } else {
                        alert("Invalid Details!!!!");
                    }
                }).
                catch(function(err) {
                    console.log(err);
                    $('.otp-modal').modal('show');
                })

            } else {
                alert($("#policy").attr('data-error'));
            }

        }
    });
});
