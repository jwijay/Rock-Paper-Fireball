var p1_wins = 0;
var p2_wins = 0;
var num_draws = 0;

play = function () {
  //for player moves, rock = 1, paper = 2, fireball = 3)
  var player_moves = "";
  var rpf_result = "";
  var result_img = "";
  var p1_move = "";
  var p2_move = "";
  var winner = 0;
  //prompt user for "Rock", "Paper", or "Fireball"
  var userChoice = prompt ('Rock, Paper, or Fireball?! \nPossible inputs: rock (r), paper (p), fireball (f)');

  //maybe later validate user input
  switch (userChoice) {
    case "rock":
    case "r":
      p1_move = "rock";
      break;
    case "paper":
    case "p":
      p1_move = "paper";
      break;
    case "fireball":
    case "f":
      p1_move = "fireball";
      break;
    default:
      console.log("Does not compute.");
  }

  //player 2 is the computer (for now)...
  p2_move = computerMove();

  //print out player moves
  player_moves = "You played " + p1_move + ".<br\/>I, Masterhand, played " + p2_move + ".";

  //now let's decide who the winner is, based on RPF rules
  winner = checkWinner(p1_move, p2_move);

  if (winner === 0) {
    rpf_result = "It's a draw. Nobody wins!";
    num_draws++;
  } else if (winner === 1) {
    rpf_result = "You won.";
    p1_wins++;
  } else {
    //This means the comp (player 2) won.
    rpf_result = "I (Masterhand) won.";
    result_img = "img/masterhand.png";
    p2_wins++;
  }

  return [player_moves, rpf_result, result_img, [p1_wins, p2_wins, num_draws]];
};

//AKA Masterhand's move.
computerMove = function() {
  //for now, we're gonna randomly generate a move (use a dumb AI).
  //computerMove will return "rock", "paper", or "fireball"
  var choices = ["rock", "paper", "fireball"];
  return choices[Math.floor(Math.random() * 3)];
};

/*
RULES:
  rock (1) > fireball (3)
  fireball (3) > paper (2)
  paper (2) > rock (1)
*/
//checkWinner returns 1 for P1, 2 for P2/computer, or 0 (for draw).
checkWinner = function (p1_move, p2_move) {
  var p1_vs_p2 = p1_move + "|" + p2_move;
  var winner = 0;
  switch (p1_vs_p2) {
    case "rock|rock":
      break;
    case "paper|paper":
      break;
    case "fireball|fireball":
      break;
    case "rock|paper":
      winner = 2;
      break;
    case "rock|fireball":
      winner = 1;
      break;
    case "paper|rock":
      winner = 1;
      break;
    case "paper|fireball":
      winner = 2;
      break;
    case "fireball|rock":
      winner = 2;
      break;
    case "fireball|paper":
      winner = 1;
      break;
  }
  return winner;
};