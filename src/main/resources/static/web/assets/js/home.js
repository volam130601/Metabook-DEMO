$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});


// Comment JS
let checkCommentClick = 1;

function showCommentBox(param) {
    if (checkCommentClick == 1) {
        checkCommentClick += 1;
        const $commentBox = $(param + ">.comment-post");
        const $spinner = $(param + "> .comment-spinner");
        let flag = true;
        if (flag == true) {
            $spinner.removeClass("d-none");
        }
        setTimeout(() => {
            flag = false;
            $spinner.addClass("d-none");
            $commentBox.removeClass("d-none");
        }, 700);
    }
}

// Like JS
function likePost(param) {
    const $likePost = $(param);
    const $dontLike = $(param).children("i:nth-child(1)");
    const $isLike = $(param).children("i:nth-child(2)");
    if ($likePost.hasClass("text-meta")) {
        $likePost.removeClass("text-meta");
        $likePost.addClass("text-muted");
        $dontLike.removeClass("d-none");
        $isLike.addClass("d-none");
    } else {
        $likePost.addClass("text-meta");
        $likePost.removeClass("text-muted");
        $dontLike.addClass("d-none");
        $isLike.removeClass("d-none");
    }
    $.ajax({
        url: "http://localhost:8080/admin/api/users",
        type: "get",
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        success: function (response) {
            console.log(response)
        },
        error: function (response) {
            console.log(response)
        }
    });
}

// Reply Comment
function showReply(param) {
    $(param)
        .children(".reply-comment-box")
        .children("li.reply-item")
        .removeClass("d-none");
    $(param)
        .children(".reply-comment-box")
        .children("div.reply-item")
        .addClass("d-none");
}

//Story create
$('#upload-image-story').change(function (e) {
    e.preventDefault();
    $('.story-footer').removeClass('d-none')
    $('#view-story').removeClass('d-none')
    $('.story-box-main').addClass('d-none')
    const file = this.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function (event) {
            $("#story-image")
                .attr("style",
                    `background-image: url('${event.target.result}');`);
            $('#story-text').addClass('d-none')
        };
        reader.readAsDataURL(file);
    }
});
$('#btn-story-text').click(function (e) {
    e.preventDefault();
    $('#story-paint').removeClass('d-none')
    $('.story-footer').removeClass('d-none')
    $('#view-story').removeClass('d-none')
    $('.story-box-main').addClass('d-none')
});

const $storyText = $("#story-text");

$("#story-enter-text").keyup(function (e) {
    const $text = $("#story-enter-text").val();
    $(".story-enter-span").addClass("d-none");
    $storyText.html($text);
});
$("#story-enter-text").mouseout(function (e) {
    if ($("#story-enter-text").val() == "") {
        $(".story-enter-span").removeClass("d-none");
        $storyText.html("Start enter text");
    }
});

function showSelectOption() {
    const $temp = $(".story-select-option");
    if ($temp.hasClass("d-none")) $(".story-select-option").removeClass("d-none");
    else $(".story-select-option").addClass("d-none");
}

function changeFontStyle(param) {
    var $temp = $(param).html();
    if ($temp == "Simple") $storyText.attr("style", "font-family: serif;");
    if ($temp == "Succinct") $storyText.attr("style", "font-family: sans-serif;");
    if ($temp == "Normal") $storyText.attr("style", "font-family: monospace;");
    if ($temp == "Title") $storyText.attr("style", "font-family: cursive;");
}

function changeBackground(param) {
    var $temp = $(param);
    const $storyImage = $("#story-image");
    if (param == 1)
        $storyImage.attr(
            "style",
            "background-image: linear-gradient(135deg, rgb(84, 150, 255) 0%, rgb(5, 72, 179) 100%);"
        );
    if (param == 2)
        $storyImage.attr(
            "style",
            "background-image: url('https://scontent.fdad1-1.fna.fbcdn.net/v/t39.10873-6/44079721_291719128109207_5500973612837896192_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=a86453&_nc_ohc=YoNRiOhCsswAX8UtZTZ&_nc_ht=scontent.fdad1-1.fna&oh=00_AfD_UIJUYJLoHDwjACPzQQuZF7TdZkkV-ixutbobUhHc7Q&oe=637D0BAC');"
        );
    if (param == 3)
        $storyImage.attr(
            "style",
            "background-image: url('https://scontent.fdad1-1.fna.fbcdn.net/v/t39.10873-6/40345755_2163632403908042_6254610308791271424_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=a86453&_nc_ohc=Xgug-J3u5M8AX_lLVQB&_nc_ht=scontent.fdad1-1.fna&oh=00_AfCHA0Kj6QCiYeLW2vOuSR3kRpl9AKvcoUrTy1cgnLrumg&oe=637DEBD0');"
        );
    if (param == 4)
        $storyImage.attr(
            "style",
            "background-image: url('https://scontent.fdad1-1.fna.fbcdn.net/v/t39.10873-6/44043938_1913725658714372_3692279308723683328_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=a86453&_nc_ohc=XjkmUjdKO0cAX84ejdX&_nc_ht=scontent.fdad1-1.fna&oh=00_AfC1fVXF8sUFNL-IUO7lf-cHaPi4NvP7pDFHgbuLaELiDg&oe=637C8170');"
        );
    if (param == 5)
        $storyImage.attr(
            "style",
            "background-image: url('https://scontent.fdad1-1.fna.fbcdn.net/v/t39.10873-6/51841714_236995953875660_8736933391053619200_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=a86453&_nc_ohc=Dwi0S2MKo5UAX8_M_0s&tn=RpZHlMl1tZnRpnfl&_nc_ht=scontent.fdad1-1.fna&oh=00_AfCZIxLORiLgzksnygxj-pSgpeEj9jhUVIIad_zN-w3Ssw&oe=637DC63E');"
        );
    if (param == 6)
        $storyImage.attr(
            "style",
            "background-image: url('https://scontent.fdad1-1.fna.fbcdn.net/v/t39.10873-6/51672542_410811559670311_860540562254594048_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=a86453&_nc_ohc=pqz2zwYFgpQAX8QSqxs&_nc_ht=scontent.fdad1-1.fna&oh=00_AfCp8s5BaXTLO_eo3PeGidE_mxCYDzzpnWTCnrHOvW7FRw&oe=637D30BB');"
        );

    const $list = $(".story-img");
    for (let i = 0; i < $list.length; i++) {
        const element = $list[i];
        if (i == param - 1) $(element).addClass('background-active')
        else $(element).removeClass('background-active')
    }
}

$('.story-create-info').click(function (e) {
    e.preventDefault();
    window.location.href = "story-create.html"
});

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
        position: "top-right",
        loaderBg: '#ef3a5d'
    });
}

