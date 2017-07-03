$(function () {
    var content = $(".content"),
        buttons = $("[data-color]"),
        fontSize = sessionStorage.getItem("fontSize") || 16,
        bgColor = sessionStorage.getItem("bgColor") || "default";
    for (var i = 0; i < buttons.length; i++) {
        var btn = buttons.eq(i);
        btn.removeClass("selected");
        if (btn.attr("data-color") == bgColor) {
            btn.addClass("selected");
        }
    }
    content.css({"font-size": fontSize + "px"});
    $("body").attr("class", bgColor);
    $(".font-size").html(fontSize + "px");
    $(".large-font").click(function () {
        if (!(fontSize >= 25)) {
            fontSize++;
            sessionStorage.setItem("fontSize", fontSize);
            $(".content").css({"font-size": fontSize + "px"});
            $(".font-size").html(fontSize + "px");
        }
    });
    $(".small-font").click(function () {
        if (!(fontSize <= 14)) {
            fontSize--;
            sessionStorage.setItem("fontSize", fontSize);
            $(".content").css({"font-size": fontSize + "px"});
            $(".font-size").html(fontSize + "px");
        }
    });
    buttons.on("click", function () {
        bgColor = $(this).attr("data-color");
        sessionStorage.setItem("bgColor", bgColor);
        buttons.removeClass("selected");
        $(this).addClass("selected");
        $("body").attr("class", bgColor);
    });
    $(".reward-box div").click(function () {
        $(".reward-box div").removeClass("selected");
        $(this).addClass("selected");
    });
    $("[data-toggle='modal']").on("click", function () {
        var target = $(this).attr("data-target");
        $(".mask").fadeIn();
        $(target).fadeIn();
    })
    $("[data-dismiss='modal']").on("click", function () {
        $(".mask").fadeOut();
        $(".modal").fadeOut();
    })
})