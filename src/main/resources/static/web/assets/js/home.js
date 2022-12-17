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
        showHideTransition: "slide",
        allowToastClose: "true",
        hideAfter: "2000",
        loader: false,
        position: "top-right",
        loaderBg: '#ef3a5d'
    });
}
if ($toast.includes('login?logout')) {
    $.toast({
        text: "You have been logged out.",
        heading: "Message",
        icon: "success",
        showHideTransition: "slide",
        allowToastClose: "true",
        hideAfter: "2000",
        loader: false,
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
    console.log(data)
    $.post({
        url: "/api/registration",
        data: data,
        dataType: "json",
        contentType: "application/json",
        success: function (res) {
            if (res.status === "success") {
                $('#create_account').modal('toggle')
                $.toast({
                    text: "Registration is success",
                    heading: "Message",
                    icon: "success",
                    showHideTransition: "slide",
                    allowToastClose: "true",
                    hideAfter: "2000",
                    loader: false,
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
                        heading: "Message",
                        icon: "success",
                        showHideTransition: "slide",
                        allowToastClose: "true",
                        hideAfter: "2000",
                        loader: false,
                        position: "top-right",
                        loaderBg: '#ef3a5d'
                    });
                else $.toast({
                    text: res.message,
                    heading: "Message",
                    icon: "error",
                    showHideTransition: "slide",
                    allowToastClose: "true",
                    hideAfter: "2000",
                    loader: false,
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

//Show edit account
function showEditAccount() {
    const $editFooterBtn = $('#edit-account-btn')
    const $editAccountBody = $('#edit-account-body')
    $editFooterBtn.removeClass('d-none').addClass('d-flex')
    $editAccountBody.removeClass('d-none')

    const $accountBody = $(".account-body")
    const $accountBtn = $('#account-btn')
    $accountBody.addClass('d-none')
    $accountBtn.addClass('d-none')
}

function hideEdit() {
    const $editFooterBtn = $('#edit-account-btn')
    const $editAccountBody = $('#edit-account-body')
    $editFooterBtn.removeClass('d-flex').addClass('d-none')
    $editAccountBody.addClass('d-none')

    const $accountBody = $(".account-body")
    const $accountBtn = $('#account-btn')
    $accountBody.removeClass('d-none')
    $accountBtn.removeClass('d-none')
}

function cancelEdit() {
    hideEdit()
}

//Upload avatar user
$('#btn-my-account').click(function (e) {
    e.preventDefault()
    let user
    $.get({
        url: '/api/current-user',
        async: false,
        success: function (res) {
            if (res.status === 'success') {
                user = res.data
            }
        },
        error: function (e) {
            console.log(e)
        }
    })
    const accountImage = `<div class="w-100">
                                <img alt="" class="account-cover-img w-100" src="${user.coverImgPath}">
                                <label class="position-absolute top-0 left-0 bg-transparent h-100 w-100 cursor-pointer"
                                       for="upload-cover-img"></label>
                                <input hidden id="upload-cover-img" type="file"  onchange="uploadCoverImg(event)">
                            </div>
                            <div class="account-avatar">
                                <img alt="" class="account-avatar-img" src="${user.avatarPath}">
                                <i class="fa-solid fa-camera"></i>
                                <label class="bg-transparent h-100 w-100 cursor-pointer"
                                       for="upload-avatar-user"></label>
                                <input hidden id="upload-avatar-user" type="file"  onchange="uploadAvatarUser(event)">
                            </div>`

    $('#modal-account-information').html(`
    <div class="modal-header">
                <h5 class="font-weight-bold" id="userProfileModalLabel">My account</h5>
                <button aria-label="Close" class="close" data-dismiss="modal" type="button">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body  p-0">
                <div class="account-body">
                    <div class="account-image">
                        <div class="w-100">
                            <img alt="" class="account-cover-img w-100" src="${user.coverImgPath}">
                        </div>
                        <div class="account-avatar">
                            <img alt="" class="account-avatar-img" src="${user.avatarPath}">
                        </div>
                    </div>
                    <p class="text-center mt-5 fs-5 font-weight-bold">${user.fullName}</p>
                    <div class="p-3">

                        <label class="fs-4 font-weight-bold">Personal information</label>

                        <div class="d-flex align-content-center fs-3">
                            <label class=" text-muted" style="width: 100px;">Email</label>
                            <span>${user.email}</span>
                        </div>

                        <div class="d-flex align-content-center fs-3">
                            <label class=" text-muted" style="width: 100px;">Gender</label>
                            <span>${user.gender}</span>
                        </div>

                        <div class="d-flex align-content-center fs-3">
                            <label class=" text-muted" style="width: 100px;">Birthday</label>
                            <span>${user.strBirthDay}</span>
                        </div>

                        <div class="d-flex align-content-center fs-3">
                            <label class=" text-muted" style="width: 100px;">Phone number</label>
                            <span >${user.phoneNumber}</span>
                        </div>

                        <div class="d-flex align-content-center fs-3">
                            <label class=" text-muted" style="width: 100px;">Country</label>
                            <span >${user.country}</span>
                        </div>
                    </div>
                </div>
                <div class="d-none" id="edit-account-body" style="height: 450px;">
                    <form id="formEditAccount">
                        <div class="account-image">
                            ${accountImage}
                        </div>
                        <div class="pl-3 pr-3">
                            <div class="form-group mt-5">
                                <label class="fs-3 font-weight-bold" for="fullName">Display name</label>
                                <input aria-describedby="fullNameId" class="form-control" id="fullName" name="fullName"
                                       placeholder="Enter display name" value="${user.fullName}" type="text">
                                <small class="form-text text-muted fs-1" id="fullNameId">Use your real name to make it
                                    easier
                                    for friends to identify.</small>
                            </div>
                            <div class="bg-grey-1 w-100" style="height: 10px;"></div>
                            <div class="fs-3 font-weight-bold mt-2">Personal information</div>

                            <label class="form-check-label mt-2 fs-3">Gender</label>
                            <div class="row ml-2">
                                <div class="form-check">
                                    <label class="form-check-label">
                                        <input checked class="form-check-input"
                                               name="gender" 
                                               type="radio"
                                               value="true">
                                       
                                        Male
                                    </label>
                                </div>
                                <div class="form-check ml-3">
                                    <label class="form-check-label">
                                        <input  class="form-check-input"
                                               name="gender" type="radio"
                                               value="false">
                                        Female
                                    </label>
                                </div>
                            </div>

                            <div class="form-group mt-2">
                                <label class=" fs-3" for="birthday">Birthday</label>
                                <input class="form-control" id="birthday"
                                       name="birthday" value="${user.strBirthDay}" type="date">
                                <small class="form-text text-muted fs-1" id="birthdayId"></small>
                            </div>

                            <div class="form-group">
                                <label class="fs-3" for="country">Country</label>
                                <input class="form-control" id="country" name="country" placeholder="Enter country"
                                       value="${user.country}" type="text">
                                <small class="form-text text-muted fs-1" id="countryId"></small>
                            </div>

                            <div class="form-group">
                                <label class="fs-3" for="phoneNumber">Phone number</label>
                                <input class="form-control" id="phoneNumber" name="phoneNumber"
                                       placeholder="Enter phone number"
                                       value="${user.phoneNumber}" type="text">
                                <small class="form-text text-muted fs-1" id="phoneNumberId"></small>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary w-100" id="account-btn" onclick="showEditAccount()" type="button">
                    Update information
                </button>

                <div class="d-none" id="edit-account-btn">
                    <button class="btn btn-secondary" onclick="cancelEdit()" type="button">Cancel</button>
                    <button class="btn btn-primary ml-2" onclick="saveEditAccount()" type="button">Post</button>
                </div>
            </div>
    `)
})

let formDataEditAccount = new FormData()

function uploadAvatarUser(event) {
    // var output = $('#upload-avatar-user');
    const file = event.target.files[0];
    if (file) {
        formDataEditAccount.append('avatar-img', file)
        let reader = new FileReader();
        reader.onload = function (event) {
            console.log(event.target.result)
            $('.account-avatar-img').attr("src", event.target.result)
        }
        reader.readAsDataURL(file);
    }
}

function uploadCoverImg(event) {
    // var output = $('#upload-avatar-user');
    const file = event.target.files[0];
    if (file) {
        formDataEditAccount.append('cover-img', file)
        let reader = new FileReader();
        reader.onload = function (event) {
            console.log(event.target.result)
            $('.account-cover-img').attr("src", event.target.result)
        }
        reader.readAsDataURL(file);
    }
}

const $smallFullName = $('#fullNameId')
const $inputFullName = $('#fullName')
const $smallBirthDay = $('#birthdayId')
const $inputBirthDay = $('#birthday')
const $smallCountry = $('#countryId')
const $inputCountry = $('#country')
const $smallPhoneNumber = $('#phoneNumberId')
const $inputPhoneNumber = $('#phoneNumber')

function clearValid() {
    $smallFullName.html('Use your real name to make it easier for friends to identify').addClass('text-muted').removeClass('text-danger')
    $inputFullName.removeClass('border-danger')
    $smallBirthDay.html('').addClass('text-muted').removeClass('text-danger')
    $inputBirthDay.removeClass('border-danger')
    $smallPhoneNumber.html('').addClass('text-muted').removeClass('text-danger')
    $inputPhoneNumber.removeClass('border-danger')
    $smallCountry.html('').addClass('text-muted').removeClass('text-danger')
    $inputCountry.removeClass('border-danger')
}

$($inputFullName).click(function (e) {
    $smallFullName.html('Use your real name to make it easier for friends to identify').addClass('text-muted').removeClass('text-danger')
    $inputFullName.removeClass('border-danger')
});
$($inputBirthDay).click(function (e) {
    $smallBirthDay.html('').addClass('text-muted').removeClass('text-danger')
    $inputBirthDay.removeClass('border-danger')
});
$($inputPhoneNumber).click(function (e) {
    $smallPhoneNumber.html('').addClass('text-muted').removeClass('text-danger')
    $inputPhoneNumber.removeClass('border-danger')
});
$($inputCountry).click(function (e) {
    $smallCountry.html('').addClass('text-muted').removeClass('text-danger')
    $inputCountry.removeClass('border-danger')
});

function saveEditAccount() {
    //COde here
    const data = $('#formEditAccount').serializeArray()
    // console.log(data)
    const values = {}
    let flag = 0
    clearValid()
    $.each(data, function (i, field) {
        if (field.name == "fullName") {
            if (field.value == "") {
                $smallFullName.html('Full name is invalid').addClass('text-danger').removeClass('text-muted')
                $inputFullName.addClass('border-danger')
                flag = 1
            } else {
                values[field.name] = field.value
            }
        }
        if (field.name == "gender") {
            values[field.name] = field.value
        }
        if (field.name == "birthday") {
            if (field.value == "") {
                $smallBirthDay.html('Birthday is invalid').addClass('text-danger').removeClass('text-muted')
                $inputBirthDay.addClass('border-danger')
                flag = 1
            } else {
                values[field.name] = field.value
            }
        }
        if (field.name == "country") {
            if (field.value == "") {
                $smallCountry.html('Birthday is invalid').addClass('text-danger').removeClass('text-muted')
                $inputCountry.addClass('border-danger')
                flag = 1
            } else {
                values[field.name] = field.value
            }
        }
        if (field.name == "phoneNumber") {
            if (field.value == "") {
                $smallPhoneNumber.html('Birthday is invalid').addClass('text-danger').removeClass('text-muted')
                $inputPhoneNumber.addClass('border-danger')
                flag = 1
            } else {
                values[field.name] = field.value
            }
        }
    });
    if (flag === 0) {
        console.log('success')
        formDataEditAccount.append('data', JSON.stringify(values))
        $.post({
            url: "/api/user/edit",
            data: formDataEditAccount,
            enctype: 'multipart/form-data',
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status === 'success') {
                    $.toast({
                        text: res.message,
                        heading: "Message",
                        icon: res.status,
                        showHideTransition: "slide",
                        allowToastClose: "true",
                        hideAfter: "2000",
                        position: "top-right",
                        loader: false
                    });
                    $('#userProfileModal').modal('toggle')
                }
            },
            error: function (e) {
                console.log(e)
            }
        });
    }
}
