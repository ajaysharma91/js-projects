class Calculator {
  constructor(prevTextEle, currentTextEle) {
    this.prevTextEle = prevTextEle;
    this.currentTextEle = currentTextEle;
    this.clear()
  }

  clear() {
    console.log()
    this.prevOperand= '';
    this.currentOperand = '';
    this.operation = undefined;

  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0,-1)
  }

  append(num) {
    console.log("NUm",num)
    if(num === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand?this.currentOperand.toString() + num.toString():num.toString();
  }

  performOperation(operation) {
    if(this.currentOperand === '') return;
    if(this.prevOperand !== ''){
        this.compute()
    }
    this.operation = operation;
    this.prevOperand = this.currentOperand;
    this.currentOperand = ''
  }

  compute() {
    console.log("Hii")
    let computation;
    const prevValue = parseFloat(this.prevOperand);
    const currentValue = parseFloat(this.currentOperand);

    if(isNaN(prevValue)|| isNaN(currentValue)) return;
    switch(this.operation){
        case '+': computation = prevValue + currentValue; break;
        case '-': computation = prevValue - currentValue; break;
        case '*': computation = prevValue * currentValue; break;
        case '÷': computation = prevValue / currentValue; break;
        default: return;
    }
    this.currentOperand = computation;
    this.operation = undefined
    this.prevOperand = ''
  }
  getDisplayNumber(number){
    const stringNumber = number.toString();
    const integerNum = parseFloat(stringNumber.split('.')[0]);
    const decimalNum = stringNumber.split('.')[1];
    let integerDisplay;
    if(isNaN(integerNum)){
        integerDisplay=''
    }else {
        integerDisplay = integerNum.toLocaleString("en",{maximumFractionDigits:0})
    }

    if(decimalNum != null){
        return `${integerDisplay}.${decimalNum}`;
    }else{
        return integerDisplay;
    }

  }

  displayUpdate() {
    console.log("Update",this.currentOperand)
    this.currentTextEle.innerText = this.getDisplayNumber(this.currentOperand)

    if(this.operation !=null){
        this.prevTextEle.innerText = this.prevOperand +" "+ this.operation
    }else{
        this.prevTextEle.innerText = ''
    }
  }
}

const numbers = document.querySelectorAll("[data-number]");
const operationKeyWord = document.querySelectorAll("[data-operation]");
const equalOpr = document.querySelector("[data-equal]");
const del = document.querySelector("[data-del]");
const clearAll = document.querySelector("[data-all-clear]");
const prevTextEle = document.querySelector("[data-prev-operand]");
const currentTextEle = document.querySelector("[data-current-operand]");
const calculator = new Calculator(prevTextEle, currentTextEle)
numbers.forEach(number=>{
    number.addEventListener("click",()=>{
        console.log("click")
        calculator.append(number.innerText);
        calculator.displayUpdate()
    })
})

operationKeyWord.forEach(operation=>{
    operation.addEventListener("click",()=>{
        console.log("click op")
        calculator.performOperation(operation.innerText)
        calculator.displayUpdate()
    })
})

equalOpr.addEventListener("click",()=>{
    console.log("Equal")
    calculator.compute();
    calculator.displayUpdate()
})

clearAll.addEventListener("click",()=>{
    console.log("Clear")
    calculator.clear();
    calculator.displayUpdate()
})
del.addEventListener("click",()=>{
    console.log("delete")
    calculator.delete();
    calculator.displayUpdate()
})