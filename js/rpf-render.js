update = function() {
    //Make some junk that changes the actual HTML content here
    var messages = play();

    var result_img = $("#result_img");
    
    //maybe refactor this to use jQuery, too. later.
    if (result_img.find("img")) {
      result_img.find("img").remove();
    }

    $("#player_moves").html(messages[0]);
    $("#rpf_result").html(messages[1]);

    var img = $("<img>", {
        src : messages[2],
        class : "img-rounded"
    });
    result_img.append(img);

    $("#play_button").show();

    $("#p1_score").html(messages[3][0]);
    $("#p2_score").html(messages[3][1]);
    $("#num_draws").html(messages[3][2]);
};

update();