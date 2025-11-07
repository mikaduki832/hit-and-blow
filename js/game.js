// 解答生成

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let correctNumber;
let shuffled;
let selected;

const makeGameNumbers = () => {
  shuffled = numbers.sort(() => Math.random() - 0.5);
  selected = shuffled.slice(0, 3);
  correctNumber = selected.join('');
}

window.onload = () => {
  makeGameNumbers();
}
