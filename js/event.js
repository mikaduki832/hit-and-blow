let inputValues = ['', '', ''];

const decideButton = document.getElementById('confirmed');

function handleNumberInput(key) {
  if (/^[0-9]$/.test(key)) {
    inputValues[selectedIndex] = key;
    playSound('se/selectNumber.mp3');
  } else if (key === 'Backspace') {
    inputValues[selectedIndex] = '';
    playSound('se/cansel.mp3');
  } else if (key === 'Enter') {
    decideNumbers();
  }

  // 表示更新
  places.forEach((el, i) => {
    el.textContent = inputValues[i];
  });
}

// --- キーボード操作 ---
document.addEventListener('keydown', (e) => {
  if (e.isComposing) return; // 日本語入力対策
  handleNumberInput(e.key);
});

// --- クリック操作（スマホなど） ---
const keyboard = document.querySelector('.keyboard'); // 画面上の数字ボタンテーブル

keyboard.addEventListener('click', (e) => {
  const td = e.target.closest('td');
  if (!td) return;

  const key = td.textContent.trim();

  // クリックで「削除」や「決定」ボタンを作る場合に対応するなら
  if (key === '削除') {
    handleNumberInput('Backspace');
  } else {
    handleNumberInput(key);
  }
});


let answerCount = 0;

decideButton.addEventListener('click', decideNumbers);

resetButton.addEventListener('click', resetNumbers);
