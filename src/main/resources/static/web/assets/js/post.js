// Post get data
$(document).ready(function () {
    $.get({
        url: "/api/post/getAll",
        dataType: "json",
        async: false,
        success: function (res) {
            const $data = res.data
            $data.forEach(function (item) {
                let image
                let lengthImages = $(item.postImages).length
                if (lengthImages === 1) {
                    image = `<div class="row m-0 p-0-5px">
                                <img class="post-image__img" style="height: 400px;" src="/image/post/${item.id}/${item.postImages[0].image}" alt="">
                            </div> `
                } else if (lengthImages === 2) {
                    image = `<div class="row m-0">
                        <div class="col m-0 p-0-5px">
                            <img  class="post-image__img" style="height: 300px;" src="/image/post/${item.id}/${item.postImages[0].image}" alt="">
                        </div>
                        <div class="col m-0 p-0-5px">
                            <img class="post-image__img" style="height: 300px;" src="/image/post/${item.id}/${item.postImages[1].image}" alt="">
                        </div>
                    </div>`
                } else if (lengthImages === 3) {
                    image = `
                    <div class="row m-0 p-0-5px">
                        <img class="post-image__img" style="height: 300px;" src="/image/post/${item.id}/${item.postImages[0].image}" alt="">
                    </div>
                    <div class="row m-0">
                        <div class="col m-0 p-0-5px">
                            <img  class="post-image__img" style="height: 250px;" src="/image/post/${item.id}/${item.postImages[1].image}" alt="">
                        </div>
                        <div class="col m-0 p-0-5px">
                            <img class="post-image__img" style="height: 250px;" src="/image/post/${item.id}/${item.postImages[2].image}" alt="">
                        </div>
                    </div>`
                } else {
                    image = `<div class="row m-0">
                    <div class="col m-0 p-0-5px">
                        <img  class="post-image__img" style="height: 300px;" src="/image/post/${item.id}/${item.postImages[0].image}" alt="">
                    </div>
                    <div class="col m-0 p-0-5px">
                        <img class="post-image__img" style="height: 300px;" src="/image/post/${item.id}/${item.postImages[1].image}" alt="">
                    </div>
                    </div>
                    <div class="row m-0">
                        <div class="col m-0 p-0-5px">
                            <img class="post-image__img" style="height: 300px;" src="/image/post/${item.id}/${item.postImages[2].image}" alt="">
                        </div>
                        <div class="col m-0 p-0-5px">
                            <img class="post-image__img" style="height: 300px;" src="/image/post/${item.id}/${item.postImages[3].image}" alt="">
                        </div>
                </div>`
                }

                $('#post-image-body').append(`
                          <div class="card-post-image card content mt-3">
                            <div class="card-header bg-white">
                                <div class="d-flex align-items-center mb-2">
                                    <img alt="" src="/web/image/avatar_batman.png" width="50">
                                    <div class="d-flex flex-column ml-2">
                                        <h6 class="m-0">${item.user.fullName}</h6>
                                        <span class="text-muted"><small>${item.postCurrentDate}</small> <b>&#xB7</b> <small><i
                                                    class="fa-solid fa-earth-americas"></i></small></span>
                                    </div>
                                    <i class="fa-solid fa-ellipsis ml-auto fs-6"></i>
                                </div>
                                <div class="post-content">${item.content}</div>
                            </div>
                            <div class="post-image">
                                ${image}
                            </div>
                            <div class="card-footer bg-white">
                                <div class="d-flex align-items-center">
                                    <div class="post-like-icon">
                                        <img width="20" alt="" src="/web/image/like/like_thumb_social_vote_favorite_icon.png">
                                    </div>
                                    <span id="count-like-post-${item.id}" class="text-muted ml-3">${item.countLikes}</span>
                                    <span id="count-comment-post-${item.id}" class="text-muted ml-auto">1,4K comments</span>
                                    <span id="count-share-post-${item.id}" class="text-muted ml-2">274 shares</span>
                                </div>
                                <hr>
                                <div class="d-flex justify-content-around align-items-center">
                                    <button class="btn-post fs-4 font-weight-bold text-muted like-post" id="like-post-${item.id}" onclick="likePost('#like-post-'+${item.id})">
                                        <i class="fa-regular fa-thumbs-up "></i>
                                        <i class="fa-solid fa-thumbs-up d-none"></i>
                                        <span>Like</span>
                                    </button>
                                    <button class="btn-post fs-4 font-weight-bold text-muted"
                                        onclick="showCommentBox('#comment-post-'+${item.id})">
                                        <i class="fa-regular fa-comment"></i>
                                        <span>Comment</span>
                                    </button>
                                    <button class="btn-post fs-4 font-weight-bold text-muted">
                                        <i class="fa-solid fa-share"></i>
                                        <span>Share</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                 `)
            });
        },
        error: function (e) {
            console.log(e)
        }
    });

    //Load like
    let $data = []
    $.get({
        url: "/api/post/user-like-post",
        dataType: "json",
        async: false,
        success: function (res) {
            $data = res.data
        },
        error: function (e) {
            console.log(e)
        }
    });
    $($data).each(function (index, element) {
        console.log()
        let param = `#like-post-${element.post.id}`
        const $likePost = $(param);
        const $dontLike = $(param).children("i:nth-child(1)");
        const $isLike = $(param).children("i:nth-child(2)");
        $likePost.addClass("text-meta");
        $likePost.removeClass("text-muted");
        $dontLike.addClass("d-none");
        $isLike.removeClass("d-none");
    })
});

//Post Create
const $postControl = $('.post-control-top')
const $postClose = $('.post-close')
const $postCreateImage = $('.post-create__image')
const $postImage = $('#post-image')

let countImage = 0
let $data = []
$('#upload-image-post').change(function (e) {
    e.preventDefault();
    $postCreateImage.addClass('d-none')
    $postClose.removeClass('d-none')
    $postControl.removeClass('d-none')
    const $listPostIMG = $('.post-image__img')
    const file = this.files[0];
    if (file) {
        $data.push(file)
        let reader = new FileReader();
        reader.onload = function (event) {
            if (countImage == 0) {
                $postImage.html(`<div class="row m-0 p-0-5px">
                    <img class="post-image__img" style="height: 250px;" src="${event.target.result}" alt="">
                    </div> `);
            } else if (countImage == 1) {
                $postImage.html(`<div class="row m-0">
                        <div class="col m-0 p-0-5px">
                            <img  class="post-image__img" style="height: 200px;" src="${$($listPostIMG[0]).attr('src')}" alt="">
                        </div>
                        <div class="col m-0 p-0-5px">
                            <img class="post-image__img" style="height: 200px;" src="${event.target.result}" alt="">
                        </div>
                    </div>`);
            } else if (countImage == 2) {
                $postImage.html(`
                    <div class="row m-0 p-0-5px">
                        <img class="post-image__img" style="height: 250px;" src="${$($listPostIMG[0]).attr('src')}" alt="">
                    </div>
                    <div class="row m-0">
                        <div class="col m-0 p-0-5px">
                            <img  class="post-image__img" style="height: 200px;" src="${$($listPostIMG[1]).attr('src')}" alt="">
                        </div>
                        <div class="col m-0 p-0-5px">
                            <img class="post-image__img" style="height: 200px;" src="${event.target.result}" alt="">
                        </div>
                    </div>`);
            } else if (countImage == 3) {
                $postImage.html(`<div class="row m-0">
                    <div class="col m-0 p-0-5px">
                        <img  class="post-image__img" style="height: 200px;" src="${$($listPostIMG[0]).attr('src')}" alt="">
                    </div>
                    <div class="col m-0 p-0-5px">
                        <img class="post-image__img" style="height: 200px;" src="${$($listPostIMG[1]).attr('src')}" alt="">
                    </div>
                    </div>
                    <div class="row m-0">
                        <div class="col m-0 p-0-5px">
                            <img class="post-image__img" style="height: 200px;" src="${$($listPostIMG[2]).attr('src')}" alt="">
                        </div>
                        <div class="col m-0 p-0-5px">
                            <img class="post-image__img" style="height: 200px;" src="${event.target.result}" alt="">
                        </div>
                </div>`);
            }
            countImage++;
        };
        reader.readAsDataURL(file);
    }
});

function clearImage() {
    $postCreateImage.removeClass('d-none')
    $postClose.addClass('d-none')
    $postControl.addClass('d-none')
    $postImage.html('')
    countImage = 0
}

function postContent() {
    const $postText = $('#post-create__input').val()
    let formData = new FormData()
    formData.append('content', $postText)
    $data.forEach((item, index) => {
        formData.append('file', item)
    });
    $.post({
        url: "/api/post/create",
        data: formData,
        enctype: 'multipart/form-data',
        contentType: false,
        processData: false,
        success: function (res) {
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
                $('#postCreateModal').modal('toggle')
            }
        },
        error: function (e) {
            console.log(e)
        }
    });
}

// Like JS
function likePost(param) {
    let likeId = Number.parseInt(param.substring(param.lastIndexOf('-') + 1))
    let $like = $(`#count-like-post-${likeId}`)
    let $countLike = Number.parseInt($like.html())
    const $likePost = $(param);
    const $dontLike = $(param).children("i:nth-child(1)");
    const $isLike = $(param).children("i:nth-child(2)");
    if ($likePost.hasClass("text-meta")) {
        $likePost.removeClass("text-meta");
        $likePost.addClass("text-muted");
        $dontLike.removeClass("d-none");
        $isLike.addClass("d-none");
        $like.html(--$countLike)
        $.get({
            url: `/api/post/dislike/${likeId}`,
            dataType: "json",
            contentType: "application/json",
            success: function (res) {
                console.log(res)
            },
            error: function (e) {
                console.log(e)
            }
        });
    } else {
        $likePost.addClass("text-meta");
        $likePost.removeClass("text-muted");
        $dontLike.addClass("d-none");
        $isLike.removeClass("d-none");
        $like.html(++$countLike)
        $.get({
            url: `/api/post/like/${likeId}`,
            dataType: "json",
            contentType: "application/json",
            success: function (res) {
                console.log(res)
            },
            error: function (e) {
                console.log(e)
            }
        });
    }
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