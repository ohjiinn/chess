
var board = null;
var game = new Chess();

function onDragStart(source, piece, position, orientation) {
  if (game.game_over()) return false;
  if ((game.turn() === 'w' && piece.search(/^b/) !== -1) || (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false;
  }
}

function onDrop(source, target) {
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  // Illegal move
  if (move === null) return 'snapback';

  updateStatus();
}

function updateStatus() {
  var status = '';
  var moveColor = 'White';
  if (game.turn() === 'b') {
    moveColor = 'Black';
  }

  // Checkmate?
  if (game.in_checkmate()) {
    status = 'Game over, ' + moveColor + ' is in checkmate.';
  }

  // Draw?
  else if (game.in_draw()) {
    status = 'Game over, drawn position';
  }

  // Game still on
  else {
    status = moveColor + ' to move';

    // Check?
    if (game.in_check()) {
      status += ', ' + moveColor + ' is in check';
    }
  }

  // Update the status element
  document.getElementById('status').innerHTML = status;
}

var config = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  pieceTheme: 'https://cdnjs.cloudflare.com/ajax/libs/chessboard-js/1.0.0/img/chesspieces/wikipedia/{piece}.png'
};
board = Chessboard('board', config);

updateStatus();
