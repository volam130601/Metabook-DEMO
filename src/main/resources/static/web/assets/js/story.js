$('#view-story').click(function (e) {
    $("#story-text").draggable({
        scroll: false,
        containment: "#story-image"
    });
})