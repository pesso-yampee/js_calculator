'use strict';
/*
  電卓アプリ作成していくよ！
*/
// 見た目
// まずは以下のレイアウトを作る

const container = document.getElementById('jsi-container');
const result = document.createElement('p');
const mainBody = document.createElement('div');
const inner = document.createElement('div');
const other = document.createElement('ul');
const numbers = document.createElement('ul');
const operations = document.createElement('ul');
const otherItemTexts = ['C', '+/-', '%'];
const otherItemIds = ['jsi-clear', 'jsi-changeSign', 'jsi-changePercentage'];
const numbersItemTexts = ['.', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const operationsItemTexts = ['÷', '×', '-', '+', '='];
const operationsItemIds = ['jsi-divide', 'jsi-multiply', 'jsi-minus', 'jsi-plus', 'jsi-equal'];

let otherItemArray = [];
let numbersItemArray = [];
let operationsItemArray = [];

container.classList = 'container';
result.classList = 'result';
mainBody.classList = 'main-body';
inner.classList = 'inner';
other.classList = 'other';
numbers.classList = 'numbers';
operations.classList = 'operations';

result.textContent = 0;

for (let i = 0; i < otherItemTexts.length; i++) {
  const otherItem = document.createElement('li');

  otherItem.classList = 'button button--other';
  otherItem.id = otherItemIds[i];
  otherItem.textContent = otherItemTexts[i];
  otherItemArray.push(otherItem);
}

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

for (let i = 0; i < operationsItemTexts.length; i++) {
  const operationsItem = document.createElement('li');

  operationsItem.classList = 'button button--operation';
  operationsItem.id = operationsItemIds[i];
  operationsItem.textContent = operationsItemTexts[i];
  operationsItemArray.push(operationsItem);
}

otherItemArray.forEach(element => {
  other.append(element);
});

numbersItemArray.forEach(element => {
  numbers.append(element);
});

operationsItemArray.forEach(element => {
  operations.append(element);
});

mainBody.append(other, numbers);
inner.append(result, mainBody, operations);
container.append(inner);


/*
  ■ 機能追加
  ①押したボタンの数字を反映させる
  ②1回目に押したボタンの数字を一の位として認識させ、2回目以降に押したボタンの数字を十の位、百の位と認識させる
*/

// 親ノードnumbersの子ノードを読み取り、変数numbersChildrenに代入
const numbersChildren = numbers.childNodes;

for (let i = 0; i < numbersChildren.length; i++) {
  // 変数numbersChildrenのi番目の要素を取得
  const number = numbersChildren.item(i);

  number.addEventListener('click', function () {
    const clickedNumber = this.textContent;

    if (result.textContent === '0') {
      // 正規表現を使ってカンマ区切りの数値を実現
      result.textContent = clickedNumber;
    } else {
      result.textContent = (result.textContent + clickedNumber).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      // このままだとカンマ区切りされた文字列に文字列を足していくことになるから、結果的にカンマが何個も増えることになる。
      // もし文字列の長さが6以上(カンマ含めむ)なら入力したタイミングでカンマを外して、通常の文字列に直す。
      if (result.textContent.length >= 6) {
        const removedComma = result.textContent.replace(/,/g, '');
        result.textContent = removedComma.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        console.log(removedComma);
      }
    }
  });
}