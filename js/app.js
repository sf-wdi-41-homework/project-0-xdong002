console.log("Sanity Check: JS is working!");

$(document).on('ready', function(){

  switch (e.keyCode){
    case 37:    //left arrow key
    $("#car").animate({
      left: "-=50"
    });
    break;
    case 38:    //up arrow key
    $("#car").animate({
      top: "-=50"
    });
    break;
    case 39:    //right arrow key
    $("#car").finish().animate({
      left: "+=50"
    });
    break;
    case 40:    //bottom arrow key
    $("#car").finish().animate({
      top: "+=50"
    });
    break;
  }

  $(document).on('keydown',function(e){
    console.log('in');
  });

});
