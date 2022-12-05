$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});
$('.story-create-info').click(function (e) {
    e.preventDefault();
    window.location.href = "/story/create"
});

function showStoryNews(param) {
    window.location.href = `/story/news?id=${param}`
}

// Comment JS
$('.comment-spinner').html(`<hr>
<div class="spinner-grow mt-2" role="status">
    <span class="sr-only">Loading...</span>
</div>`)

function showCommentBox(param) {
    const $commentBox = $(param + ">.comment-post");
    const $spinner = $(param + "> .comment-spinner");
    let flag = true;
    if (flag == true) {
        $spinner.removeClass("d-none");
    }
    setTimeout(() => {
        flag = false;
        $spinner.html("");
        $commentBox.removeClass("d-none");
    }, 700);
}


// Login page
function hideLoginAvatarCard(param) {
    $(`#login-card-${param}`).addClass('d-none')
}

$('#eye-show').click(function (e) {
    e.preventDefault();
    $('#eye-show').addClass('d-none')
    $('#eye-hide').removeClass('d-none')
    $('#password').attr('type', 'password')
});

$('#eye-hide').click(function (e) {
    e.preventDefault();
    $('#eye-hide').addClass('d-none')
    $('#eye-show').removeClass('d-none')
    $('#password').attr('type', 'text')
});

// Handle Error Text Login and Registration
const $inputEmail = $('#email')
const $inputPassword = $('#password')
const pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
$($inputEmail).focusout(function () {
    if (!pattern.test($inputEmail.val())) {
        $('#emailHelpId').html("Email is invalid.")
        $($inputEmail).addClass('border-danger')
    } else {
        $($inputEmail).removeClass('border-danger')
        $('#emailHelpId').html("")
    }
});

function checkEmpty() {
    if ($inputEmail.val() == "" || $inputEmail.val() == null) {
        $('#emailHelpId').html("Email isn't empty")
        $($inputEmail).addClass('border-danger')
    } else {
        $($inputEmail).removeClass('border-danger')
        $('#emailHelpId').html("")
    }
    if ($inputPassword.val() == "" || $inputPassword.val() == null) {
        $('#passwordHelpId').html("Password isn't empty")
        $($inputPassword).addClass('border-danger')
    } else {
        $($inputPassword).removeClass('border-danger')
        $('#passwordHelpId').html("")
    }
}


//Toast Jquery
const $toast = window.location.href
if ($toast.includes('login?error')) {
    $.toast({
        text: "Invalid email or password",
        heading: "Message",
        icon: "error",
        showHideTransition: "plain",
        allowToastClose: "true",
        hideAfter: "2000",
        position: "top-right",
        loaderBg: '#ef3a5d'
    });
}
if ($toast.includes('login?logout')) {
    $.toast({
        text: "You have been logged out.",
        heading: "Message",
        icon: "success",
        showHideTransition: "plain",
        allowToastClose: "true",
        hideAfter: "2000",
        position: "top-right",
        loaderBg: '#ef3a5d'
    });
}
//Check Validate FormRegistration
const $firstName = $('#firstName')
const $lastName = $('#lastName')
const $newEmail = $('#newEmail')
const $newPassword = $('#newPassword')
const $birthday = $('#birthday')
const $smallFirstName = $('#firstNameId')
const $smallLastName = $('#lastNameId')
const $smallnewEmail = $('#newEmailId')
const $smallnewPassword = $('#newPasswordId')
const $smallbirthday = $('#birthdayId')

$($firstName).focus(function (e) {
    e.preventDefault();
    $smallFirstName.html('')
    $firstName.removeClass('border-danger')
});
$($lastName).focus(function (e) {
    e.preventDefault();
    $smallLastName.html('')
    $lastName.removeClass('border-danger')
});
$($newEmail).focus(function (e) {
    e.preventDefault();
    $smallnewEmail.html('')
    $newEmail.removeClass('border-danger')
});
$($newPassword).focus(function (e) {
    e.preventDefault();
    $smallnewPassword.html('')
    $newPassword.removeClass('border-danger')
});
$($birthday).focus(function (e) {
    e.preventDefault();
    $smallbirthday.html('')
    $birthday.removeClass('border-danger')
});

//Register Function
$('#registration').submit(function (e) {
    e.preventDefault();
    let flag = 1, count = 1;
    let $values = {}
    $.each($('#registration').serializeArray(), function (i, field) {
        if (field.name == "firstName") {
            if (field.value == "") {
                $smallFirstName.html("Please enter a valid first name")
                $('#firstName').addClass('border-danger')
            } else {
                flag += 1;
                $values[field.name] = field.value
            }
        }
        if (field.name == "lastName") {
            if (field.value == "") {
                $smallLastName.html("Please enter a valid last name")
                $('#lastName').addClass('border-danger')
            } else {
                flag += 1;
                $values[field.name] = field.value
            }
        }
        if (field.name == "newEmail") {
            let check_email = false
            checkEmailExist(field.value).done(function (response) {
                if (response.status === "success")
                    check_email = true
            })
            if (field.value == "") {
                $smallnewEmail.html("Please enter a valid email address")
                $('#newEmail').addClass('border-danger')
            } else if (!validateEmail(field.value)) {
                $smallnewEmail.html("Email address is invalid")
                $('#newEmail').addClass('border-danger')
            } else if (check_email) {
                $smallnewEmail.html("Email address is exist")
                $('#newEmail').addClass('border-danger')
            } else {
                flag += 1;
                $values[field.name] = field.value
            }
        }
        if (field.name == "newPassword") {
            if (field.value == "") {
                $smallnewPassword.html("Please enter a valid new password")
                $('#newPassword').addClass('border-danger')
            } else {
                flag += 1;
                $values[field.name] = field.value
            }
        }
        if (field.name == "birthday" || field.name == "gender") {
            flag += 1;
            $values[field.name] = field.value
        }
        count++;
    });
    if (flag == count)
        sendRegistration(JSON.stringify($values))
    else console.log("Register Wrong")
});

function validateEmail($email) {
    const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test($email);
}

function checkEmailExist(param) {
    return $.get({
        url: "/api/check-email",
        data: {email: param},
        dataType: "json",
        contentType: "application/json",
        async: false,
        success: function (res) {
            console.log('check email success')
        },
        error: function (e) {
            console.log('check email failed')
            console.log(e)
        }
    });
}

function sendRegistration(data) {
    $.post({
        url: "/api/registration",
        data: data,
        dataType: "json",
        contentType: "application/json",
        success: function (res) {
            console.log(res)
            if (res.status === "success") {
                $('#create_account').modal('toggle')
                $.toast({
                    text: "Registration is success",
                    heading: "Message",
                    icon: "success",
                    showHideTransition: "plain",
                    allowToastClose: "true",
                    hideAfter: "2000",
                    position: "top-right",
                    loaderBg: '#ef3a5d'
                });
            }
        },
        error: function (e) {
            console.log(e)
        }
    });
}


//Form forgot password
const $emailFG = $('#emailForgotPassword')
const $smallEmailFG = $('#smallForgotPassword')
$emailFG.focus(function (e) {
    e.preventDefault()
    $smallEmailFG.html('')
    $emailFG.removeClass('border-danger')
})

$('#formForgotPassword').submit(function (e) {
    e.preventDefault()
    let check_email = false
    checkEmailExist($emailFG.val()).done(function (response) {
        if (response.status === "success")
            check_email = true
    })
    if (check_email) {
        $.get({
            url: "/api/send-email",
            data: {email: $emailFG.val()},
            dataType: "json",
            contentType: "application/json",
            success: function (res) {
                console.log("send email success...")
                if (res.status === 'success')
                    $.toast({
                        text: res.message,
                        heading: "Note",
                        icon: "success",
                        showHideTransition: "plain",
                        allowToastClose: "true",
                        hideAfter: "2000",
                        position: "top-right",
                        loaderBg: '#ef3a5d'
                    });
                else $.toast({
                    text: res.message,
                    heading: "Note",
                    icon: "error",
                    showHideTransition: "plain",
                    allowToastClose: "true",
                    hideAfter: "2000",
                    position: "top-right",
                    loaderBg: '#ef3a5d'
                });
            },
            error: function (e) {
                console.log(e)
            }
        });
        console.log('Waiting send email....')
        $('#forgot_password').modal('toggle')
    } else {
        $smallEmailFG.html('Email cannot found')
        $emailFG.addClass('border-danger')
    }
})

