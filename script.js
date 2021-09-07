'use strict';


alert("Are u ready?!");

console.log("Hello curator!");


// Variables 

let money;

let income = "freelance";

let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую?"); 

let deposit = confirm("Есть ли у вас депозит в банке?");

let mission = 10000000;

let period = 2;

let accumulatedMonth;

let expenses1;

let expenses2;

let amount1;

let amount2;


function getExpensesMonth() {
    let sum = 0;
    let expensesMoney1;
    let expensesMoney2;
    for (let i = 0; i < 2; i++) {
        if(i===0) {
            expenses1 = prompt("Введите обязательную статью расходов?");

           while(isNaN(parseFloat(expensesMoney1))) {
                expensesMoney1 = +prompt("Во сколько это обойдется?");
           }
        } 
        else if(i===1) {    
            expenses2 = prompt("Введите обязательную статью расходов другую?");

            while(isNaN(parseFloat(expensesMoney2))) {
                expensesMoney2 = +prompt("Во сколько это обойдется?");
            }
        }
    }   
    sum = expensesMoney1 + expensesMoney2;

    console.log(sum);
    return sum;
    
}

let expensesMonth = getExpensesMonth();

console.log(("Период равен " +  period + " месяца.") + " " + ("Цель заработать " + mission + " долларов."));

console.log(addExpenses.toLowerCase().split(", "));


let start = function(){
    do {
        money = prompt("Сколько ты зарабатываешь за месяц?");
    }
    while(isNaN(parseFloat(money)));
} ;

start();



function getAccumulatedMonth() {
    let budgetMonth = money - expensesMonth;
    return budgetMonth;
}

accumulatedMonth =  getAccumulatedMonth();

let budgetDay = accumulatedMonth/30; 

function getStatusIncome() {
    
    if (budgetDay >= 1200) {
        console.log("У вас высокий доход!");
    } else if (1200 > budgetDay && budgetDay >= 600) {
        console.log("У вас Средний уровень!");
    } else if (600 > budgetDay && budgetDay >= 0) {
        console.log("У вас низкий  уровень!");
    } else {
        console.log("Что то пошло не так!");
    }

}

getStatusIncome();

console.log(Math.round(budgetDay) + " Бюджет на день");

function getTargetMonth() {
    let res;
    res = mission / accumulatedMonth;
    if(res>=0) {
        console.log("Цель будет достигнута за " + Math.round(res) + " Месяцeв!");
    }
    else {
        console.log("Цель не будет достигнута!");
    }
}

getTargetMonth(); 

function showTypeOf(whatType) {
    return typeof(whatType);
}

showTypeOf(money);

showTypeOf(income);

showTypeOf(deposit);

showTypeOf(expensesMonth);



