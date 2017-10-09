$(function() {

  var anim_id;
  //------Score------
  var score = $('#score');
  var score_counter = 1;
  //------Player1 and player2------
  var car = $('#car');
  var car_width = parseInt(car.width());
  var car_height = parseInt(car.height());
  var car1 = $('#car1');
  var car1_width = parseInt(car1.width());
  var car1_height = parseInt(car1.height());
  //-----AI cars and lines-----
  var car2 = $('#car2');
  var car3 = $('#car3');
  var car4 = $('#car4');
  var line_1 = $('#line_1');
  var line_2 = $('#line_2');
  var line_3 = $('#line_3');
  //------controls for player1------
  var move_right = false;
  var move_left = false;
  var move_up = false;
  var move_down = false;
  //------controls for player2------
  var move_right1 = false;
  var move_left1 = false;
  var move_up1 = false;
  var move_down1 = false;
  //------game board-----
  var gameBoard = $('#gameBoard');
  var gameBoard_left = parseInt(gameBoard.css('left'));
  var gameBoard_width = parseInt(gameBoard.width());
  var gameBoard_height = parseInt(gameBoard.height());

  //-----game speed-----
  var speed = 2;
  var line_speed = 5;


  var restart_btn = $('#startButton');
  var game_over = false;

//-----functions for control the player1's car------
  $(document).on('keydown', function(e) {
      e.preventDefault();
      if (game_over === false) {
          var key = e.keyCode;
          if (key === 37 && move_left === false) {
              move_left = requestAnimationFrame(left);
          } else if (key === 39 && move_right === false) {
              move_right = requestAnimationFrame(right);
          } else if (key === 38 && move_up === false) {
              move_up = requestAnimationFrame(up);
          } else if (key === 40 && move_down === false) {
              move_down = requestAnimationFrame(down);
          }
      }
  });

  $(document).on('keyup', function(e) {
      if (game_over === false) {
          var key = e.keyCode;
          if (key === 37) {
              cancelAnimationFrame(move_left);
              move_left = false;
          } else if (key === 39) {
              cancelAnimationFrame(move_right);
              move_right = false;
          } else if (key === 38) {
              cancelAnimationFrame(move_up);
              move_up = false;
          } else if (key === 40) {
              cancelAnimationFrame(move_down);
              move_down = false;
          }
      }
  });

  function left() {
      if (game_over === false && parseInt(car.css('left')) > 0) {
          car.css('left', parseInt(car.css('left')) - 5);
          move_left = requestAnimationFrame(left);
      }
  }

  function right() {
      if (game_over === false && parseInt(car.css('left')) < gameBoard_width - car_width) {
          car.css('left', parseInt(car.css('left')) + 5);
          move_right = requestAnimationFrame(right);
      }
  }

  function up() {
      if (game_over === false && parseInt(car.css('top')) > 0) {
          car.css('top', parseInt(car.css('top')) - 3);
          move_up = requestAnimationFrame(up);
      }
  }

  function down() {
      if (game_over === false && parseInt(car.css('top')) < gameBoard_height - car_height) {
          car.css('top', parseInt(car.css('top')) + 3);
          move_down = requestAnimationFrame(down);
      }
  }

  //------functions for control the player2's car------
  $(document).on('keydown', function(e) {
      if (game_over === false) {
          var key = e.keyCode;
          if (key === 65 && move_left1 === false) {
              move_left1 = requestAnimationFrame(left1);
          } else if (key === 68 && move_right1 === false) {
              move_right1 = requestAnimationFrame(right1);
          } else if (key === 87 && move_up1 === false) {
              move_up1 = requestAnimationFrame(up1);
          } else if (key === 83 && move_down1 === false) {
              move_down1 = requestAnimationFrame(down1);
          }
      }
  });

  $(document).on('keyup', function(e) {
      if (game_over === false) {
          var key = e.keyCode;
          if (key === 65) {
              cancelAnimationFrame(move_left1);
              move_left1 = false;
          } else if (key === 68) {
              cancelAnimationFrame(move_right1);
              move_right1 = false;
          } else if (key === 87) {
              cancelAnimationFrame(move_up1);
              move_up1 = false;
          } else if (key === 83) {
              cancelAnimationFrame(move_down1);
              move_down1 = false;
          }
      }
  });

  function left1() {
      if (game_over === false && parseInt(car1.css('left')) > 0) {
          car1.css('left', parseInt(car1.css('left')) - 5);
          move_left1 = requestAnimationFrame(left1);
      }
  }

  function right1() {
      if (game_over === false && parseInt(car1.css('left')) < gameBoard_width - car1_width) {
          car1.css('left', parseInt(car1.css('left')) + 5);
          move_right1 = requestAnimationFrame(right1);
      }
  }

  function up1() {
      if (game_over === false && parseInt(car1.css('top')) > 0) {
          car1.css('top', parseInt(car1.css('top')) - 3);
          move_up1 = requestAnimationFrame(up1);
      }
  }

  function down1() {
      if (game_over === false && parseInt(car1.css('top')) < gameBoard_height - car1_height) {
          car1.css('top', parseInt(car1.css('top')) + 3);
          move_down1 = requestAnimationFrame(down1);
      }
  }

//-----------------------------------------------------------------------------------

  anim_id = requestAnimationFrame(repeat);

//-----the line and the AI cars will always repeat itself------
  function repeat() {
      if ((collision(car, car2) || collision(car, car3) || collision(car, car4)) || (collision(car1, car2) || collision(car1, car3) || collision(car1, car4))) {
          stop_the_game();
          gameOver() ;
          return;
      }

      score_counter++;

      if (score_counter % 20 == 0) {
          score.text(parseInt(score.text()) + 1);
      }
      if (score_counter % 500 == 0) {
          speed++;
          line_speed++;
      }

      car_down(car2);
      car_down(car3);
      car_down(car4);

      line_down(line_1);
      line_down(line_2);
      line_down(line_3);

      anim_id = requestAnimationFrame(repeat);
  }

  function car_down(car) {
      var car_current_top = parseInt(car.css('top'));
      if (car_current_top > gameBoard_height) {
          car_current_top = -200;
          var car_left = parseInt(Math.random() * (gameBoard_width - car_width));
          car.css('left', car_left);
      }
      car.css('top', car_current_top + speed);
  }

  function line_down(line) {
      var line_current_top = parseInt(line.css('top'));
      if (line_current_top > gameBoard_height) {
          line_current_top = -300;
      }
      line.css('top', line_current_top + line_speed);
  }

  restart_btn.click(function() {
      location.reload();
  });

  //------Game over function(make everything stoped)------

  function stop_the_game() {
      game_over = true;
      cancelAnimationFrame(anim_id);
      cancelAnimationFrame(move_right);
      cancelAnimationFrame(move_left);
      cancelAnimationFrame(move_up);
      cancelAnimationFrame(move_down);
  }


//-----show the words when game is over------
function gameOver() {
  $('.restartBox').append('<h1>Game Over!</h1>')
  $('.restartBox').append('<h3><------- Press the start game button to restart the game!</h3>')
}

//------function for calculate the cars collision------
function collision($div1, $div2) {
    var x1 = $div1.offset().left;
    var y1 = $div1.offset().top;
    var h1 = $div1.outerHeight(true);
    var w1 = $div1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
}


});
