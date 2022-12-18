// Search Box
function hideBoxSearch() {
    $('#box-search').addClass('d-none')
}

function showBoxSearch() {
    $('#box-search').removeClass('d-none')
    $('#search-user-input').focus()
}

function searchUser(param) {
    $('#span-search-null').removeClass('d-flex').addClass('d-none')
    const keyword = $(param).val()
    const boxSearch = $('#box-show-user-search')
    if (keyword !== "") {
        let currenUser
        $.get({
            url: '/api/user/current-user',
            async: false,
            success: function (res) {
                if (res.status === 'success') {
                    currenUser = res.data
                }
            },
            error: function (e) {
                console.log(e)
            }
        })
        let load = `<div class="spinner-grow mt-2 " role="status">
            <span class="sr-only">Loading...</span>
        </div>`
        boxSearch.html('')
        boxSearch.html(load)
        $.get({
            url: '/api/user/search?kw=' + keyword,
            dataType: 'json',
            async: false,
            success: function (res) {
                if (res.status === 'success') {
                    const data = res.data
                    let str = ``
                    if (data.length > 0) {
                        data.forEach(function (user) {
                            if (user.id !== currenUser.id) {
                                str += `
                                    <div class="sidebar-item">
                                        <img alt="" class="sidebar-item__img w-40px h-40px img-cover rounded-circle" src="${user.avatarPath}">
                                        <a class="sidebar-item__link ml-2" href="#!">${user.fullName}</a>
                                    
                                `
                                if (user.friendOfCurrentUser === false) {
                                    str += `
                                      <button onclick="modalAddFriend(${user.id})" class="btn btn-outline-primary ml-auto p-1 fs-2 font-weight-bold" data-toggle="modal" data-target="#addFriendModal">Add friend</button>
                                    `
                                } else {
                                    str += `
                                    <button onclick="modalUnfriend(${user.id})" class="btn btn-success ml-auto p-1 fs-2 font-weight-bold" data-toggle="modal" data-target="#addFriendModal">Friend</button>
                                    `
                                }
                                str += `</div>`
                            }
                        })
                        setTimeout(function () {
                            boxSearch.html(str)
                        }, 1000)
                    } else {
                        setTimeout(function () {
                            boxSearch.html('')
                            $('#span-search-null').removeClass('d-none').addClass('d-flex')
                        }, 1000)
                    }
                }
            },
            error: function (e) {
                console.log(e)
            }
        })
    } else {
        boxSearch.html('')
        $('#span-search-null').removeClass('d-none').addClass('d-flex')
    }

}

function modalAddFriend(id) {
    $.get({
        url: '/api/user/getById/' + id,
        async: false,
        success: function (res) {
            console.log(res)
            if (res.status === 'success') {
                const data = res.data
                let str = ``
                str += bodyAddFriendBox(data)
                str += `
                    <div class="modal-footer">
                         <div class="" id="addfriend-footer">
                             <button aria-label="Close" class="btn btn-secondary" data-dismiss="modal" type="button">Cancel
                             </button>
                             <button onclick="addFriend(${data.id})" class="btn btn-primary ml-2" type="button">Add friend</button>
                         </div>
                     </div>
                    `
                $('#box-friend').html(str)
            }
        },
        error: function (e) {
            console.log(e)
        }
    })
}


function modalUnfriend(id) {
    $.get({
        url: '/api/user/getById/' + id,
        async: false,
        success: function (res) {
            if (res.status === 'success') {
                const data = res.data
                let str = ``
                str += bodyAddFriendBox(data)
                str += `
                        <div class="modal-footer">
                            <button onclick="unfriend(${data.id})" class="btn btn-danger w-100" id="unfriend-btn"
                                    type="button">Unfriend
                            </button>
                        </div>
                    `
                $('#box-friend').html(str)
            }
        },
        error: function (e) {
            console.log(e)
        }
    })
}

function addFriend(id) {
    $.get({
        url: '/api/friend/add-friend/' + id,
        success: function (res) {
            if (res.status === 'success') {
                $.toast({
                    text: res.message,
                    heading: "Message",
                    icon: "success",
                    showHideTransition: "slide",
                    allowToastClose: "true",
                    hideAfter: "2000",
                    loader: false,
                    position: "top-right",
                });
                $('#addFriendModal').modal('toggle')
                hideBoxSearch()
            } else {
                $.toast({
                    text: res.message,
                    heading: "Message",
                    icon: "error",
                    showHideTransition: "slide",
                    allowToastClose: "true",
                    hideAfter: "2000",
                    loader: false,
                    position: "top-right",
                });
                $('#addFriendModal').modal('toggle')
                hideBoxSearch()
            }
        },
        error: function (e) {
            console.log(e)
        }
    })
}

function unfriend(id) {
    console.log(id)
    $.get({
        url: '/api/friend/unfriend/' + id,
        success: function (res) {
            if (res.status === 'success') {
                $.toast({
                    text: res.message,
                    heading: "Message",
                    icon: "success",
                    showHideTransition: "slide",
                    allowToastClose: "true",
                    hideAfter: "2000",
                    loader: false,
                    position: "top-right",
                });
                $('#addFriendModal').modal('toggle')
                hideBoxSearch()
            }
        },
        error: function (e) {
            console.log(e)
        }
    })
}

function bodyAddFriendBox(user) {
    return `
            <div class="modal-header">
                <h5 class="font-weight-bold">Account Information</h5>
                <button aria-label="Close" class="close btn-focus" data-dismiss="modal" type="button">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body p-0" >
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
                        <label class=" text-muted" style="width: 100px;">Gender</label>
                        <span>${user.gender}</span>
                    </div>

                    <div class="d-flex align-content-center fs-3">
                        <label class=" text-muted" style="width: 100px;">Birthday</label>
                        <span>${user.strBirthDay}</span>
                    </div>
                </div>
            </div>
    `
}


showAllFriend()
showFirstFriendAccept()

setInterval(checkChangeAcceptFriend, 3000)
setInterval(checkAllFriend, 3000)
let flag_accept_friend = -1

function checkChangeAcceptFriend() {
    $.get({
        url: '/api/friend/find-accept-list',
        dataType: 'json',
        success: function (res) {
            if (res.status === "success") {
                let length = res.data.length
                if (flag_accept_friend !== length) {
                    showFirstFriendAccept()
                }
                flag_accept_friend = res.data.length
            }
        },
        error: function (e) {
            console.log(e)
        }
    })
}

let flag_all_friend = -1

function checkAllFriend() {
    $.get({
        url: '/api/friend/findAll',
        dataType: 'json',
        success: function (res) {
            if (res.status === "success") {
                let length = res.data.length
                if (flag_all_friend !== length) {
                    showAllFriend()
                    showStorySlide()
                }
                flag_all_friend = length
            }
        },
        error: function (e) {
            console.log(e)
        }
    })
}

function showAllFriend() {
    $.get({
        url: '/api/friend/findAll',
        dataType: 'json',
        success: function (res) {
            if (res.status === "success") {
                const boxShowFriend = $('#box-show-friend')
                const data = res.data
                let str = ``
                data.forEach(function (user) {
                    str += `<div class="sidebar-item">
                            <img alt="" class="w-40px h-40px img-cover rounded-circle"
                                 class="sidebar-item__img" src="${user.avatarPath}">
                            <a class="sidebar-item__link ml-2" href="#!">${user.fullName}</a>
                        </div>
                    `
                })
                boxShowFriend.html(str)
            }
        },
        error: function (e) {
            console.log(e)
        }
    })

}

function showFirstFriendAccept() {
    $.get({
        url: '/api/friend/find-first-accept',
        dataType: 'json',
        success: function (res) {
            const boxShowAcceptFriend = $('#box-accept-friend')
            if (res.status === "success") {
                const user = res.data
                let str = `<img alt="" class="w-40px h-40px img-cover rounded-circle"
                                 class="sidebar-invitation__img" src="${user.avatarPath}">
                            <div class="d-flex flex-column" style="width: 100%;">
                                <div class="d-flex justify-content-around">
                                    <h6 class="mr-auto ml-3">${user.fullName}</h6>
                                    <em class="text-muted fs-2">${user.acceptFriendDate}</em>
                                </div>
                                <div class="d-flex">
                                    <button onclick="acceptFriend(${user.id})" class="btn btn-meta ml-3 pl-4 pr-4 font-weight-bold">Accept</button>
                                    <button onclick="removeFriend(${user.id})" class="btn btn-secondary ml-3 pl-4 pr-4 font-weight-bold">Remove</button>
                                </div>
                            </div>
                    `
                boxShowAcceptFriend.html(str)
            } else {
                boxShowAcceptFriend.html(`
                    <div class="text-muted fs-3 ml-2">${res.message}</div> 
                `)
            }
        },
        error: function (e) {
            console.log(e)
        }
    })
}

function showAcceptFriendList() {
    $.get({
        url: '/api/friend/find-accept-list',
        dataType: 'json',
        success: function (res) {
            console.log(res)
            const requestList = $('#request-list')
            if (res.status === "success") {
                const data = res.data
                let str = ``
                data.forEach(function (user) {
                    str += `<div class="sidebar-invitation">    
                                    <img alt="" class="w-40px h-40px img-cover rounded-circle"
                                     class="sidebar-invitation__img" src="${user.avatarPath}">
                                    <div class="d-flex flex-column" style="width: 100%;">
                                        <div class="d-flex justify-content-around">
                                            <h6 class="mr-auto ml-3">${user.fullName}</h6>
                                            <em class="text-muted fs-2">${user.acceptFriendDate}</em>
                                        </div>
                                        <div class="d-flex">
                                            <button onclick="acceptFriend(${user.id})" class="btn btn-meta ml-3 pl-4 pr-4 font-weight-bold">Accept</button>
                                            <button onclick="removeFriend(${user.id})" class="btn btn-secondary ml-3 pl-4 pr-4 font-weight-bold">Remove</button>
                                        </div>
                                    </div>
                                </div>
                        `
                })
                requestList.html(str)
            } else {
                requestList.html(`
                    <div class="text-muted fs-3 ml-2">${res.message}</div> 
                `)
            }
        },
        error: function (e) {
            console.log(e)
        }
    })
}

function acceptFriend(id) {
    $.get({
        url: '/api/friend/accept-friend/' + id,
        success: function (res) {
            console.log(res)
            if (res.status === 'success') {
                $.toast({
                    text: res.message,
                    heading: "Message",
                    icon: "success",
                    showHideTransition: "slide",
                    allowToastClose: "true",
                    hideAfter: "2000",
                    loader: false,
                    position: "top-right",
                });
                $('#box-accept-friend').html('')
            }
        },
        error: function (e) {
            console.log(e)
        }
    })
}

function removeFriend(id) {
    $.get({
        url: '/api/friend/remove-accept/' + id,
        success: function (res) {
            if (res.status === 'success') {
                $('#box-accept-friend').html('')
                showAcceptFriendList()
            }
        },
        error: function (e) {
            console.log(e)
        }
    })
}

