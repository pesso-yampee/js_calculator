'use strict';

const container           = document.getElementById('jsi-container'),
      result              = document.createElement('p'),
      mainBody            = document.createElement('div'),
      inner               = document.createElement('div'),
      other               = document.createElement('ul'),
      numbers             = document.createElement('ul'),
      operations          = document.createElement('ul'),
      otherItemTexts      = ['C', '+/-', '%'],
      otherItemIds        = ['jsi-clear', 'jsi-changeSign', 'jsi-changePercentage'],
      numbersItemTexts    = ['.', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      operationsItemTexts = ['÷', '×', '-', '+', '='],
      operationsItemIds   = ['jsi-divide', 'jsi-multiply', 'jsi-minus', 'jsi-plus', 'jsi-equal'],
      numbersChildren     = numbers.childNodes;

let otherItemArray      = [],
    numbersItemArray    = [],
    operationsItemArray = [];

container.classList  = 'container';
result.classList     = 'result';
mainBody.classList   = 'main-body';
inner.classList      = 'inner';
other.classList      = 'other';
numbers.classList    = 'numbers';
operations.classList = 'operations';

result.textContent = 0;

function stopClickAction(e) {
  e.preventDefault();
}

function ArrayAppendItem(arr, target) {
  return arr.forEach(element => {
    target.append(element);
  });
}

function ArrayPushCreateElement(texts, className, ids, array) {
  for (let i = 0; i < texts.length; i++) {
    const li = document.createElement('li');

    li.classList = className;
    li.id = ids[i];
    li.textContent = texts[i];
    array.push(li);
  }
}

function addNumber(target) {
  const clickedNumber = target.textContent,
        limitedLength = 11;

  if (result.textContent.length < limitedLength) {
    if (result.textContent === '0') {
      result.textContent = clickedNumber;
    } else {
      // 正規表現を使ってカンマ区切りの数値を実現
      result.textContent = (result.textContent + clickedNumber).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    // このままだとカンマ区切りされた文字列に文字列を足していくことになるから、結果的にカンマが何個も増えることになる。
    // もし文字列の長さが6以上(カンマ含めむ)なら、入力したタイミングでカンマを外して通常の文字列に直す。
    if (result.textContent.length >= 6) {
      const removedComma = result.textContent.replace(/,/g, '');
  
      result.textContent = removedComma.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  
    if (result.clientWidth > container.clientWidth) {
      result.style.fontSize = '55px';
    }
  } else {
    return false;
  }
}

// ボタン「C」を押した時の処理
// function resetCalculation(number, operation = null) {
//   // 最終的に何かを返すのか or 返さないのか
//   return number.textContent = 0;
// }

// function changeSign(number) {
//   let result = Number(number.textContent);

//   if (result > 0) {
//     result = `-${result}`;
//   } else {
//     result = Math.abs(result);
//   }
//   return result;
// }

ArrayPushCreateElement(otherItemTexts, 'button button--other', otherItemIds, otherItemArray);

for (let i = 0; i < 11; i++) {
  const numbersItem = document.createElement('li');
  
  if (i === 1) {
    numbersItem.classList = 'button button--colon';
    numbersItem.id = 'jsi-colon';
  } else {
    numbersItem.classList = 'button button--number';
    numbersItem.id = 'jsi-number';
  }

  if (i === 0) {
    numbersItem.textContent = i;
  } else if (i === 1) {
    numbersItem.textContent = '.';
  } else {
    numbersItem.textContent = i - 1;
  }

  numbersItemArray.push(numbersItem);
}

ArrayPushCreateElement(operationsItemTexts, 'button button--operation', operationsItemIds, operationsItemArray);

ArrayAppendItem(otherItemArray, other);
ArrayAppendItem(numbersItemArray, numbers);
ArrayAppendItem(operationsItemArray, operations);

mainBody.append(other, numbers);
inner.append(result, mainBody, operations);
container.append(inner);


/*
  ■ 機能追加
  ①押したボタンの数字を反映させる
  ②1回目に押したボタンの数字を一の位として認識させ、2回目以降に押したボタンの数字を十の位、百の位と認識させる
  ③11桁を超えるとクリックイベントを中断する(カンマ含む)
*/

for (let i = 0; i < numbersChildren.length; i++) {
  const number = numbersChildren.item(i);

  number.addEventListener('click', function() {
    addNumber(this);
  });
}

// document.getElementById('jsi-clear').addEventListener('click', () => {
//   resetCalculation(result);
// });

// document.getElementById('jsi-changeSign').addEventListener('click', () => {
//   changeSign(result);
// });