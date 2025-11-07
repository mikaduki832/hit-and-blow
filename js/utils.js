// 効果音

function playSound(src) {
  const audio = new Audio(src);
  audio.play();
}

// 選択中のインデックス

let selectedIndex = null;

/* 解答 */
const places = [
  document.querySelector('.first-number'),
  document.querySelector('.second-number'),
  document.querySelector('.third-number')
];

// 選択しているインデックスを更新

function updateSelectedPlace() {
  places.forEach((el, i) => {
    el.classList.toggle('selected', i === selectedIndex);
  });
}

places.forEach((el, i) => {
  el.addEventListener('click', () => {
    selectedIndex = i;
    updateSelectedPlace();
    playSound('se/move.mp3');
  });
});

// 入力された値をチェック

function hasDuplicate(arr) {
  const filtered = arr.filter(v => v !== '');
  return new Set(filtered).size !== filtered.length;
}

// 確定ボタンを押した時の処理

const decideNumbers = () => {
  if (inputValues.includes('')) {
    errorText.textContent = 'すべての桁に数字を入力してください。';
    infomation2.appendChild(errorText);
    return;
  }

  if (hasDuplicate(inputValues)) {
    errorNumber();
    return;
  }

  answerCount++;
  checkingAnswers();
  errorText.remove();
  playSound('se/enter.mp3');

  // 解答後に入力した数字を削除（誤動作防止）

  inputValues = ["", "", ""];
  for (let i = 0; i < places.length; i++) {
    places[i].textContent = "";
    if (i === 2) {
      places[i].textContent = "";
      break;
    }
  }
}

// 解答チェック

function checkingAnswers() {
  let hit = 0;
  let blow = 0;
  let guess = inputValues; // 入力された4桁の配列（例：['1', '4', '7', '2']）

  // 解答と位や数値が合っているかの確認

  for (let i = 0; i < 3; i++) {
    if (guess[i] === selected[i]) {
      hit++;
    } else if (selected.includes(guess[i])) {
      blow++;
    }
  }

  // テキストUIの追加

  const newText = document.createElement('div');
  newText.className = 'text';
  newText.innerHTML = `${answerCount}フェイズ ${inputValues.join(' ')} … Hit ${hit} Blow ${blow}`;
  infomation.appendChild(newText);

  const phaseText = document.createElement('div');
  phaseText.className = 'text';
  phaseText.innerHTML = `${answerCount}フェイズ`;
  phase.appendChild(phaseText);

  const secondText = document.createElement('div');
  secondText.className = 'text';
  secondText.innerHTML = `${inputValues.join(' ')} … Hit ${hit} Blow ${blow}`;
  infomation3.appendChild(secondText);

  // 選択解除

  selectedIndex = null;

  for (let i = 0; i < places.length; i++) {
    places[i].classList.remove('selected');
    if (i === 2) {
      places[i].classList.remove('selected');
      break;
    }
  }

  // 解答に応じての処理

  if (hit === 3) {
    gameClear();
    answer.textContent = correctNumber;
  } else if (answerCount <= 2) {
    return;
  } else if (castShuffle === false && hit + blow >= 2) {
    selected = selected.sort(() => Math.random() - 0.5);
    correctNumber = selected.join('');
    const shuffleText = document.createElement('div');
    shuffleText.className = 'shuffleText';
    shuffleText.innerHTML = 'シャッフルが発動されました。数字の順番が並び変わります。';
    infomation.appendChild(shuffleText);
    infomation3.appendChild(shuffleText);
    castShuffle = !castShuffle;
  }
}

// 数字をリセット

const resetButton = document.getElementById('reset');

const resetNumbers = () => {
  answer.innerHTML = '<span>?</span><span>?</span><span>?</span>';
  makeGameNumbers();
  answerCount = 0;
  infomation.textContent = '';
  infomation2.textContent = '';
  infomation3.textContent = '';
  phase.textContent = '';
  for (let i = 0; i < 3; i++) {
    places[i].textContent = '';
    if (i === 2) {
      places[i].textContent = '';
      break;
    }
  }
  inputValues = ['', '', ''];
  if (castShuffle === true) {
    castShuffle = !castShuffle;
  }
  resetButton.style.display = "none";
  decideButton.style.display = "block";
  resultMessage.remove();
  gameText.remove();
}
