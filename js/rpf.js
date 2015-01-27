var p1_wins = 0;
var p2_wins = 0;
var num_draws = 0;
var next_move = "";

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
      return ["Does not compute. \nTry again.", "", "", [p1_wins, p2_wins, num_draws]];
  }

  //player 2/computer chooses randomly, IF next_move is an empty string
  //if there is a next_move specified, use it
  if (next_move === "") {
    p2_move = randomMove();
  } else {
    p2_move = next_move;
  }

  //print out player moves
  player_moves = "You played " + p1_move + ".<br\/>I, Masterhand, played " + p2_move + ".";

  //now let's decide who the winner is, based on RPF rules
  winner = checkWinner(p1_move, p2_move);
  next_move = winner[1];

  if (winner[0] === 0) {
    rpf_result = "It's a draw. Nobody wins!";
    result_img = "img/draw.png";
    num_draws++;
  } else if (winner[0] === 1) {
    rpf_result = "You won.";
    result_img = "img/" + p1_move + ".png";
    p1_wins++;
  } else {
    //This means the comp (player 2) won.
    rpf_result = "I (Masterhand) won.";
    //result_img = "img/masterhand.png";
    result_img = "img/" + p2_move + ".png";
    p2_wins++;
  }

  return [player_moves, rpf_result, result_img, [p1_wins, p2_wins, num_draws]];
};

//AKA Masterhand's first random move.
randomMove = function() {
  //for now, we're gonna randomly generate a move (use a dumb AI).
  //randomMove will return "rock", "paper", or "fireball"
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

  //if winner is 1 (player 1) or 0 (draw), then
  //play thing that would have beat player 1's previous
  //move. i.e. if previous move was rock, play paper. THE END.
  if (winner === 1|| winner === 0) {
    if (p1_move === "rock") {
      next_move = "paper";
    }
    if (p1_move === "paper") {
      next_move = "fireball";
    }
    if (p1_move === "fireball") {
      next_move = "rock";
    }
  } else {
    //this means that player 2 (computer) won
    //in this case, we'll play player 1's last move.
    //for explanation, see this article:
    //http://arstechnica.com/science/2014/05/win-at-rock-paper-scissors-by-knowing-thy-opponent/
    next_move = p1_move;
  }

  return [winner, next_move];
};