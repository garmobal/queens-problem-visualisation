'use strict';

function createBoard (array) {
  let isWhite = true;
  const $board = $('<div>');
  $board.addClass('board');
  for (let i = 0; i < array.length; i++) {
    const $row = $('<div>');
    $row.addClass('row');
    for (let j = 1; j <= array.length; j++) {
      const $square = $('<div>');
      $square.addClass('square');
      isWhite ? $square.addClass('white') : $square.addClass('black');
      isWhite = !isWhite;
      if (array[i] === j) $square.addClass('queen');
      $row.append($square);
    }
    $board.append($row);
    if (array.length % 2 === 0) isWhite = !isWhite;
  }
  $('#boards-div').append($board);
};

$("#form-create").on("submit", (e) => {
  e.preventDefault();
  const $container = $("#boards-div");
  $container.empty();
  const number = $('#boardsize').val();
  const sol = calc(Number(number));

  $('#solutions-p').text(`Combinations found: ${sol}`)
  
});

// const onClick = (e) => {
//   e.preventDefault();
//   const number = e.target.value;
//   console.log(4)
//   createBoard([1, 3, 0, 2, 4]);
// }





function calc (size) {

  if (size < 2) return size;

  // Create root
  let board = new TreeNode (0, []);

  // Make children
  breed(size, board);
  
  // if size is even, only push half of the children
  let stack = [];
  board.children.forEach(ch => stack.push(ch));
  
  
  let success = 0;
  
  while(stack.length > 0) {
    
    let currentTree = stack.pop();

    if (currentTree.parentsV.length === size) {
      success++;

      let arr = currentTree.parentsV.slice()

      createBoard(arr);
      // // LOOOL
      // let matrix = Array(size).fill(0).map(() => Array(size).fill(0));
      // matrix = matrix.map((el, i) => el = el.map((e, j) => (j + 1 === currentTree.parentsV[i]) ? e = 'T' : 0));
      // console.log('Solution: ', success)
      // console.log(currentTree.parentsV)
      // console.log(matrix)
      // console.table(matrix)
      // // end of LOL

    } else if ((currentTree.parentsV.length < size + 1)){
      breed(size, currentTree);
      currentTree.children.forEach(ch => stack.push(ch));
    }

  }

  // if (size % 2 === 0) return success * 2;
  return success;
  
}

function breed (NumOfChildren, parent) {
  
  for (let i = 1; i <= NumOfChildren; i++) {
    
    let ancestors = parent.parentsV;
    if (/* !ancestors.includes(i) */ !ancestors.includes(i) && !ancestorsThreatenNewQueen(ancestors, i)) {
      
      let subTree = new TreeNode(i, [...ancestors, i]);
      parent.addChild(subTree);
    }

  }

}

class TreeNode {
  constructor (position, ancestors) {
    this.position = position;
    this.parentsV = ancestors;
    this.children = [];
  }
  
  addChild (childTree) {    
    this.children.push(childTree);
    return true;
  }
  
}

function ancestorsThreatenNewQueen(ancestors, position) {

  const len = ancestors.length;

  for (let i = 0; i < ancestors.length; i++) {
    if (ancestors[i] - (len - i) === position) {
      return true
    } else if (ancestors[i] + (len - i) === position) {
      return true;
    }
  }
  return false;
}

// calc(5)

// module.exports = calc;
