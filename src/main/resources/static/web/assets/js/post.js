let x = 0, i = 0, size = 2;
const postImageBody = $('#post-image-body')

showPostView(i, size)
$(window).scroll(function () {
    x = window.scrollY + $(window).height()
    if (x >= $(document).height()) {
        if (i <= getCountPost()) {
            postImageBody.append(loadingSpanner())
            setTimeout(() => {
                $('.comment-spinner').remove()
                showPostView(++i, size)
            }, 300)
        }
    }
})

function getCountPost() {
    let count = 0
    $.get({
        url: "/api/post/count-post",
        dataType: "json",
        async: false,
        success: function (res) {
            if (res.status === "success") {
                count = res.data
            }
        },
        error: function (e) {
            console.log(e)
        }
    });
    return count
}

function showPostView(page, size) {
    $.get({
        url: "/api/post/view",
        data: {
            page: page,
            size: size
        },
        dataType: "json",
        contentType: "application/json",
        async: false,
        success: function (res) {
            if (res.status === "success") {
                const $data = res.data
                $data.forEach(function (post) {
                    postImageBody.append(bodyPost(post))
                });
            }
        },
        error: function (e) {
            console.log(e)
        }
    });
}


function bodyPost(item) {
    let image = getImagePost(item)
    return `<div class="card-post-image card content mt-3">
                                <div class="card-header bg-white">
                                    <div class="d-flex align-items-center mb-2">
                                        <img class="w-50px h-50px img-cover rounded-circle" alt="" src="${item.user.avatarPath}">
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
                                        <button onclick="showCommentBox('#comment-post-'+${item.id})" class="comment-post text-muted ml-auto border-0 btn-focus text-underline bg-transparent">
                                            <span class="count-comment-post-${item.id}" >${item.countComments}</span> comments
                                        </button>
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
                                    <div id="comment-post-${item.id}">
                                        <!-- Comment Body -->
                                    </div>
                                </div>
                            </div>`
}

function loadingSpanner() {
    return `<div class="text-center comment-spinner" style="height: 500px;">
                <hr>
                <div class="spinner-grow mt-2" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>`
}

function getImagePost(item) {
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
    return image
}

loadLikeByUser()

function loadLikeByUser() {
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
}

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
    $data = []
    $postText.val("")
    clearImage()
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
                    icon: res.status,
                    showHideTransition: "slide",
                    allowToastClose: "true",
                    hideAfter: "2000",
                    position: "top-right",
                    loader: false
                });
                postImageBody.prepend(bodyPost(res.data))
                $('#postCreateModal').modal('toggle')
            }
        },
        error: function (e) {
            console.log(e)
        }
    });
}

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

function showCommentBox(param) {
    let postId = Number.parseInt(param.substring(param.lastIndexOf('-') + 1))
    const $commentPostBox = $(param)
    $commentPostBox.html(`
            <div class="text-center comment-spinner">
                <hr>
                <div class="spinner-grow mt-2" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
    `)
    setTimeout(() => {
        $commentPostBox.html('')
    }, 300);
    let user
    $.get({
        url: '/api/user/current-user',
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
    $.get({
        url: `/api/comment/get/${postId}?page=0&size=5`,
        dataType: "json",
        async: false,
        success: function (res) {
            let temp = `<hr>
                        <span class="comment-dropdown d-flex justify-content-end align-items-center text-muted">
                            <span class="font-weight-bold fs-3">Phù hợp nhất</span>
                            <i class="fa-solid fa-caret-down ml-2"></i>
                        </span>
                        <div class="comment-write d-flex align-content-center mt-2 w-100">
                            <img  class="h-40px w-40px img-cover rounded-circle" src="${user.avatarPath}">
                            <div id="box-comment-write-${postId}" class="flex-fill w-25">
                                <span onkeydown="handleEnter(event, ${postId})" id="comment-write-${postId}"
                                    class="textarea w-100 p-2 pl-3 pr-3 bg-grey btn-focus border-0 ml-2"
                                    role="textbox" contenteditable></span>
                            </div> 
                        </div>
                        <div id="comment-body-${postId}">
                    `;
            if (res.status === 'success' && res.data.length > 0) {
                const $data = res.data
                $data.forEach(function (comment) {
                    temp += getCommentBox(comment)
                })
                temp += '</div>'
                if ($data.length < res.totalData) {
                    temp += ` <div id="page-post-${postId}" class="d-flex mt-2 ">
                                   <input type="hidden" id="comment-page-number-${postId}" value="1">
                                  <button id="btn-show-comment-more-${postId}" onclick="showCommentMore(${postId})" class="fs-3 font-weight-bold text-muted text-underline bg-transparent btn-focus border-0"  >View more comment</button>
                                   <span class="ml-auto fs-2 text-muted">
                                         <span id="current-comment-${postId}">${$data.length}</span>
                                         / 
                                         <span  class="count-comment-post-${postId}">${res.totalData}</span>
                                     </span>
                             </div>
                             `
                }
            } else {
                console.log('Get comment failed')
            }
            setTimeout(() => {
                $commentPostBox.append(temp)
                loadLikeCommentByUser()
                showRenderCommentLike()
            }, 300);
        },
        error: function (e) {
            console.log(e)
        }
    });
}

function handleEnter(e, id) {
    if (e.keyCode === 13) {
        const $commentText = $(`#comment-write-${id}`).html()
        const $totalComment = $(`.count-comment-post-${id}`)
        const $currentComment = $(`#current-comment-${id}`)
        $currentComment.html(Number.parseInt($currentComment.html()) + 1)
        $totalComment.html(Number.parseInt($totalComment.html()) + 1)
        $(`#box-comment-write-${id}`).html(`
                        <span id="comment-write-${id}" onkeydown="handleEnter(event, ${id})"
                        class="textarea w-100 p-2 pl-3 pr-3 bg-grey btn-focus border-0 ml-2"
                        role="textbox" contenteditable></span>
                    `)

        const $commentBox = $(`#comment-body-${id}`)
        let temp = ``
        $.get({
            url: `/api/comment/create/${id}`,
            data: {
                content: $commentText
            },
            dataType: "json",
            contentType: "application/json",
            async: false,
            success: function (res) {
                const comment = res.data
                if (res.status === 'success') {
                    $commentBox.prepend(getCommentBox(comment))
                }
            },
            error: function (e) {
                console.log(e)
            }
        });
    }
}

function showCommentMore(id) {
    const $input = $(`#comment-page-number-${id}`)
    const $currentComment = $(`#current-comment-${id}`)
    const $totalComment = $(`.count-comment-post-${id}`)
    let $page = Number.parseInt($input.val())

    const $commentBox = $(`#comment-body-${id}`)
    $.get({
        url: `/api/comment/get/${id}?page=${$page}&size=5`,
        dataType: "json",
        async: false,
        success: function (res) {
            if (res.status === 'success' && res.data.length > 0) {
                const $data = res.data
                let item = ``
                $data.forEach(function (comment) {
                    item += getCommentBox(comment)
                })
                setTimeout(() => {
                    $commentBox.append(item)

                    //Handle info page
                    $input.val($page + 1)
                    let temp = 5 * (Number.parseInt($input.val()))
                    if (temp >= Number.parseInt($totalComment.html())) {
                        $currentComment.html(Number.parseInt($totalComment.html()))
                        $(`#page-post-${id}`).removeClass('d-flex').addClass('d-none')
                    } else {
                        $currentComment.html(temp)
                    }
                }, 300);
            } else {
                console.log('Get comment failed')
            }
        },
        error: function (e) {
            console.log(e)
        }
    });


    loadLikeCommentByUser()
}

function getCommentBox(comment) {
    return `<div class="comment-box" id="comment-box-${comment.id}">
                            <div class="comment-read d-flex mt-2">
                                <img  class="h-40px w-40px img-cover rounded-circle" src="${comment.user.avatarPath}">
                                <div class=" d-flex flex-column ml-2">
                                    <div class="comment-detail">
                                        <h6 class="comment-name fs-3 m-0">${comment.user.fullName}</h6>
                                        <div class="comment-content fs-3 ">${comment.content}</div>
                                    </div>
                                    <div class="d-flex align-items-center ml-2">
                                        <button id="commnent-like-${comment.id}" onclick="likeComment('#like-comment-${comment.id}')"
                                            class="comment-like fs-1 font-weight-bold bg-transparent border-0 text-secondary btn-focus">
                                            Like
                                        </button>
                                        <button onclick="showReplys('#reply-comment-box-1')"
                                            class="comment-reply fs-1 font-weight-bold bg-transparent border-0 text-secondary">
                                            Reply
                                        </button>
                                        <span class="comment-time fs-1 ml-2 text-muted">${comment.commentTime}</span>
                                        ${getLikeCommentSpan(comment)}
                                    </div>
                                </div>
                                <div class="line-reply-under d-none"></div>
                            </div>
                        </div> `
}

function getLikeCommentSpan(comment) {
    let $likeCommentSpan
    if (comment.totalCommentLike === 0) {
        $likeCommentSpan = `<span id="like-comment-${comment.id}" class="like-comment m-1 bg-white shadow-2 d-none">
                                                <img width="15" alt="" src="/web/image/like/like_thumb_social_vote_favorite_icon.png">
                                                <span class="fs-2"></span>  
                                            </span>`
    } else {
        $likeCommentSpan = `<span id="like-comment-${comment.id}" class="like-comment m-1 bg-white shadow-2">
                                                <img width="15" alt="" src="/web/image/like/like_thumb_social_vote_favorite_icon.png">
                                                <span class="fs-2 ml-1 mr-1">${comment.totalCommentLike}</span>  
                                            </span>`
    }
    return $likeCommentSpan
}

function likeComment(param) {
    let likeId = Number.parseInt(param.substring(param.lastIndexOf('-') + 1))
    const $likeComment = $(param)
    const $likeCommentImg = $(param + '> img')
    const $likeCommentSpan = $(param + '> span')
    const $commentLikeBtn = $('#commnent-like-' + likeId)
    let numberLike = Number.parseInt($likeCommentSpan.html()) || 0;
    if ($commentLikeBtn.hasClass('text-secondary')) {
        $likeCommentSpan.html(numberLike + 1).addClass('ml-1').addClass('mr-1')
        $commentLikeBtn.removeClass('text-secondary').addClass('text-primary')
        $likeComment.removeClass('d-none')
        $.get({
            url: `/api/comment/like/${likeId}`,
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
        $likeCommentSpan.html(numberLike - 1)
        $commentLikeBtn.removeClass('text-primary').addClass('text-secondary')
        if ((numberLike - 1) === 0) $likeComment.addClass('d-none')
        $.get({
            url: `/api/comment/dislike/${likeId}`,
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

function loadLikeCommentByUser() {
    let $data = []
    $.get({
        url: "/api/comment/user-like-comment",
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
        const $commentLikeBtn = $('#commnent-like-' + element.comment.id)
        if ($commentLikeBtn != null) $commentLikeBtn.removeClass('text-secondary').addClass('text-primary')
    })
}


setInterval(showRenderCommentLike, 3000)

function showRenderCommentLike() {
    const data = $('div[id^="comment-box"]')
    const ids = new Array()
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        let commentId = element.id.substring(element.id.lastIndexOf('-') + 1)
        ids.push(commentId)
    }
    if (ids.length > 0)
        $.post({
            url: "/api/comment/count-like-comment",
            data: JSON.stringify(ids),
            dataType: "json",
            contentType: "application/json",
            async: false,
            success: function (res) {
                res.data.map(item => {
                    const $likeCommentSpan = $(`#like-comment-${item.commentId}` + ' > span')
                    const $likeComment = $('#like-comment-' + item.commentId)
                    if (item.totalLike === 1) {
                        $likeComment.removeClass('d-none')
                        $likeCommentSpan.addClass('ml-1').addClass('mr-1')
                    } else if (item.totalLike === 0) {
                        $likeComment.addClass('d-none')
                    }
                    $likeCommentSpan.html(item.totalLike)
                })
            },
            error: function (e) {
                console.log(e)
            }
        });
}