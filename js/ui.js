const infomation = document.querySelector('.info1');
const infomation2 = document.querySelector('.info2');
const infomation3 = document.querySelector('.info3');
const phase = document.querySelector('.phase');
const errorText = document.createElement('div');
const newText = document.createElement('div');
const gameText = document.createElement('div');

// 入力エラーの処理 

const errorNumber = () => {
  errorText.className = 'text';
  errorText.textContent = '同じ数字が入力されています。全て違う数字で入力してください。';
  infomation2.appendChild(errorText);
}

// ゲーム終了時のテキスト

const answer = document.querySelector('.answer-number');
const resultMessage = document.createElement('div');

const gameClear = () => {
    let message = '';
    if (answerCount <= 5) {
        message = '神レベル！';
    } else if (answerCount <= 8) {
        message = '優秀！';
    } else if (answerCount <= 12) {
        message = 'お見事！'
    } else {
        message = '正解！お疲れ様です';
    }
    
    resultMessage.className = 'text';
    resultMessage.textContent = message;
    gameText.className = 'text';
    gameText.textContent = `記録：${answerCount}ターン`;
    infomation2.appendChild(gameText);
    infomation2.appendChild(resultMessage);
    decideButton.style.display = 'none';
    resetButton.style.display = 'block';
}
