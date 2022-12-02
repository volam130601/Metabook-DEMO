$('#view-story').click(function (e) {
    $("#story-text").draggable({
        scroll: false,
        containment: "#story-image"
    });
})
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
            $("#story-image_img")
                .attr("src",
                    `${event.target.result}`);
            $('#story-text').addClass('d-none')
        };
        reader.readAsDataURL(file);
    }
});

$('#share-story').click(function (e) {
    e.preventDefault()
    let formData = new FormData()
    let files = $('#upload-image-story')[0].files
    if (files != null) {
        formData.append('file', files[0])
        console.log(formData.get('file'))
        $.post({
            url: "/api/story/uploadFile",
            enctype: 'multipart/form-data',
            data: formData,
            contentType: false,
            processData: false,
            success: function (res) {
                console.log(res)
                if (res.status === 'success') {
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
                } else {
                    $.toast({
                        text: res.message,
                        heading: "Note",
                        icon: "error",
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
})

$('#deny-story').click(function (e) {
    $('.story-footer').addClass('d-none')
    $('#view-story').addClass('d-none')
    $('.story-box-main').removeClass('d-none')
})

// $('#btn-story-text').click( {
//     e.preventDefault();
//     $('#story-paint').removeClass('d-none')
//     $('.story-footer').removeClass('d-none')
//     $('#view-story').removeClass('d-none')
//     $('.story-box-main').addClass('d-none')
// });
//
// const $storyText = $("#story-text");
//
// $("#story-enter-text").keyup(function (e) {
//     const $text = $("#story-enter-text").val();
//     $(".story-enter-span").addClass("d-none");
//     $storyText.html($text);
// });
// $("#story-enter-text").mouseout(function (e) {
//     if ($("#story-enter-text").val() == "") {
//         $(".story-enter-span").removeClass("d-none");
//         $storyText.html("Start enter text");
//     }
// });
//
// function showSelectOption() {
//     const $temp = $(".story-select-option");
//     if ($temp.hasClass("d-none")) $(".story-select-option").removeClass("d-none");
//     else $(".story-select-option").addClass("d-none");
// }
//
// function changeFontStyle(param) {
//     var $temp = $(param).html();
//     if ($temp == "Simple") $storyText.attr("style", "font-family: serif;");
//     if ($temp == "Succinct") $storyText.attr("style", "font-family: sans-serif;");
//     if ($temp == "Normal") $storyText.attr("style", "font-family: monospace;");
//     if ($temp == "Title") $storyText.attr("style", "font-family: cursive;");
// }
//
// function changeBackground(param) {
//     var $temp = $(param);
//     const $storyImage = $("#story-image");
//     if (param == 1)
//         $storyImage.attr(
//             "style",
//             "background-image: linear-gradient(135deg, rgb(84, 150, 255) 0%, rgb(5, 72, 179) 100%);"
//         );
//     if (param == 2)
//         $storyImage.attr(
//             "style",
//             "background-image: url('https://scontent.fdad1-1.fna.fbcdn.net/v/t39.10873-6/44079721_291719128109207_5500973612837896192_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=a86453&_nc_ohc=YoNRiOhCsswAX8UtZTZ&_nc_ht=scontent.fdad1-1.fna&oh=00_AfD_UIJUYJLoHDwjACPzQQuZF7TdZkkV-ixutbobUhHc7Q&oe=637D0BAC');"
//         );
//     if (param == 3)
//         $storyImage.attr(
//             "style",
//             "background-image: url('https://scontent.fdad1-1.fna.fbcdn.net/v/t39.10873-6/40345755_2163632403908042_6254610308791271424_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=a86453&_nc_ohc=Xgug-J3u5M8AX_lLVQB&_nc_ht=scontent.fdad1-1.fna&oh=00_AfCHA0Kj6QCiYeLW2vOuSR3kRpl9AKvcoUrTy1cgnLrumg&oe=637DEBD0');"
//         );
//     if (param == 4)
//         $storyImage.attr(
//             "style",
//             "background-image: url('https://scontent.fdad1-1.fna.fbcdn.net/v/t39.10873-6/44043938_1913725658714372_3692279308723683328_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=a86453&_nc_ohc=XjkmUjdKO0cAX84ejdX&_nc_ht=scontent.fdad1-1.fna&oh=00_AfC1fVXF8sUFNL-IUO7lf-cHaPi4NvP7pDFHgbuLaELiDg&oe=637C8170');"
//         );
//     if (param == 5)
//         $storyImage.attr(
//             "style",
//             "background-image: url('https://scontent.fdad1-1.fna.fbcdn.net/v/t39.10873-6/51841714_236995953875660_8736933391053619200_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=a86453&_nc_ohc=Dwi0S2MKo5UAX8_M_0s&tn=RpZHlMl1tZnRpnfl&_nc_ht=scontent.fdad1-1.fna&oh=00_AfCZIxLORiLgzksnygxj-pSgpeEj9jhUVIIad_zN-w3Ssw&oe=637DC63E');"
//         );
//     if (param == 6)
//         $storyImage.attr(
//             "style",
//             "background-image: url('https://scontent.fdad1-1.fna.fbcdn.net/v/t39.10873-6/51672542_410811559670311_860540562254594048_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=a86453&_nc_ohc=pqz2zwYFgpQAX8QSqxs&_nc_ht=scontent.fdad1-1.fna&oh=00_AfCp8s5BaXTLO_eo3PeGidE_mxCYDzzpnWTCnrHOvW7FRw&oe=637D30BB');"
//         );
//
//     const $list = $(".story-img");
//     for (let i = 0; i < $list.length; i++) {
//         const element = $list[i];
//         if (i == param - 1) $(element).addClass('background-active')
//         else $(element).removeClass('background-active')
//     }
// }


//Story news
function showNewsContent(param) {
    const $data = $('.news-item')
    for (let i = 0; i < $data.length; i++) {
        const item = $data[i];
        $(item).children(`#story-news-${i + 1}`).addClass('d-none')
    }
    for (let i = 0; i < $data.length; i++) {
        const item = $data[i];
        if (param === (i + 1)) {
            $(item).children(`#story-news-${param}`).removeClass('d-none')
            break;
        }
    }
}

//Prev and next in news content
let slideIndex = 1;
let flag = 0;
const $storyId = getUrlParameter('id')
if ($storyId && flag === 0) {
    slideIndex = Number.parseInt($storyId)
    showArrows(slideIndex);
    flag++;
} else showArrows(slideIndex);

// Next/previous controls
function plusStoryNews(n) {
    showArrows((slideIndex += n));
}

function showArrows(param) {
    showNewsContent(param)
    let $prev = $(".news-prev");
    let $next = $(".news-next");
    const slides = $(".news-item");
    if (param <= 1) {
        $prev.hide();
    } else {
        $prev.show();
    }
    if (param >= slides.length) {
        $next.hide();
    } else {
        $next.show();
    }
}

//Param
function getUrlParameter(sParam) {
    let sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
}