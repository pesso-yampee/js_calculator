'use strict';

const container           = document.getElementById('jsi-container'),
      value               = document.createElement('p'),
      mainBody            = document.createElement('div'),
      inner               = document.createElement('div'),
      other               = document.createElement('ul'),
      numbers             = document.createElement('ul'),
      operations          = document.createElement('ul'),
      otherItemTexts      = ['C', '+/-', '%'],
      otherItemIds        = ['jsi-clear', 'jsi-changeSign', 'jsi-changePercentage'],
      numbersItemTexts    = ['.'],
      operationsItemTexts = ['÷', '×', '-', '+', '='],
      operationsItemIds   = ['jsi-divide', 'jsi-multiply', 'jsi-minus', 'jsi-plus', 'jsi-equal'],
      numbersChildren     = numbers.childNodes;

let otherItemArray      = [],
    numbersItemArray    = [],
    operationsItemArray = [];

for (let i = 0; i < 10; i++) {
  numbersItemTexts.push[i];
}

container.className  = 'container';
value.className      = 'value';
mainBody.className   = 'main-body';
inner.className      = 'inner';
other.className      = 'other';
numbers.className    = 'numbers';
operations.className = 'operations';

value.id = 'jsi-value';
value.textContent = 0;

function stopClickAction(e) {
  e.preventDefault();
}

function AppendItemToArray(arr, target) {
  return arr.forEach(element => {
    target.append(element);
  });
}

function addCreateElementToArray(texts, className, ids, array) {
  for (let i = 0; i < texts.length; i++) {
    const li = document.createElement('li');

    li.classList = className;
    li.id = ids[i];
    li.textContent = texts[i];
    array.push(li);
  }

  return array;
}

function addNumber(target, number) {
  const clickedNumber = target.textContent;
  let limitedLength = 0;

  if (number.textContent.split('').indexOf('-') === -1) {
    limitedLength = 11;
  } else {
    limitedLength = 12;
  }

  if (number.textContent.length < limitedLength && limitedLength === 11) {
    if (number.textContent === '0') {
      number.textContent = clickedNumber;
    } else {
      // 正規表現を使ってカンマ区切りの数値を実現
      number.textContent = (number.textContent + clickedNumber).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    // このままだとカンマ区切りされた文字列に文字列を足していくことになるから、結果的にカンマが何個も増えることになる。
    if (number.textContent.length >= 6) {
      const removedComma = number.textContent.replace(/,/g, '');

      number.textContent = removedComma.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    changeFontSizeToSmall(number, 'is-active');

    return number;

  } else if (number.textContent.length < limitedLength && limitedLength === 12) {
    if (number.textContent === '-0') {
      number.textContent = `-${clickedNumber}`;
    } else {
      // 正規表現を使ってカンマ区切りの数値を実現
      number.textContent = (number.textContent + clickedNumber).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    // このままだとカンマ区切りされた文字列に文字列を足していくことになるから、結果的にカンマが何個も増えることになる。
    if (number.textContent.length >= 7) {
      const removedComma = number.textContent.replace(/,/g, '');

      number.textContent = removedComma.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    changeFontSizeToSmall(number, 'is-active');

    if (number.textContent.length >= limitedLength) {
      number.style.fontSize = '50px';
    }

    return number;

  } else {
    return false;
  }

  
}

// ボタン「C」を押した時の処理
function clearCalculation(target, operation = null) {
  target.classList.remove('is-active');
  return target.textContent = 0;
}

// ボタン「+/-」を押した時の処理
function changeSign(target) {
  const removedCommaNumber = target.textContent.replace(/,/g, ''),
        limitedLength      = 11;
  let changedSignNumber;

  if (removedCommaNumber.split('').indexOf('-') === -1) {
    changedSignNumber = `-${removedCommaNumber}`;
  } else {
    const removedCommaNumberArray = removedCommaNumber.split('');

    removedCommaNumberArray.splice(0, 1);
    changedSignNumber = removedCommaNumberArray.join('');
  }
  
  target.textContent = changedSignNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // MEMO: フォントサイズの設定はJS側でやりたくないところ。別案があればそちらで対応
  if (target.textContent.length > limitedLength) {
    target.style.fontSize = '50px';
  }else {
    target.style.fontSize = '55px';
  }

  return target;
}

function changeFontSizeToSmall(outcome, className) {
  if (outcome.clientWidth > container.clientWidth) {
    return outcome.classList.add(className);
  }
}

addCreateElementToArray(otherItemTexts, 'button button--other', otherItemIds, otherItemArray);
addCreateElementToArray(operationsItemTexts, 'button button--operation', operationsItemIds, operationsItemArray);

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


AppendItemToArray(otherItemArray, other);
AppendItemToArray(numbersItemArray, numbers);
AppendItemToArray(operationsItemArray, operations);

mainBody.append(other, numbers);
inner.append(value, mainBody, operations);
container.append(inner);

for (let i = 2; i < numbersChildren.length; i++) {
  const number = numbersChildren.item(i);

  number.addEventListener('click', function() {
    addNumber(this, value);
  });
}

document.getElementById('jsi-clear').addEventListener('click', () => {
  clearCalculation(value);
});

document.getElementById('jsi-changeSign').addEventListener('click', () => {
  changeSign(value);
});