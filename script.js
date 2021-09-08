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

money = prompt("Сколько ты зарабатываешь за месяц?");
  
// Methods & Properties



function showTypeOf (value) {
    console.log(typeof value);
}

showTypeOf(money);

showTypeOf(income);

showTypeOf(deposit);

console.log(("Период равен " + period + " месяца.") + " " + ("Цель заработать " + mission + " долларов."));

console.log(addExpenses.toLowerCase().split(", "));

let budgetDay = accumulatedMonth / 30;


// Dynamic typing

let expenses1 = prompt("Введите обязательную статью расходов?");

let expenses2 = prompt("Введите обязательную статью расходов другую?");

let amount1 = +prompt("Во сколько это обойдется в первом случае?");

let amount2 = +prompt("Во сколько это обойдется во втором случае?");



// Function

function getExpensesMonth() {
    return amount1 + amount2;
}

getExpensesMonth();

function getAccumulatedMonth() {
    return money - getExpensesMonth();
}


accumulatedMonth = getAccumulatedMonth();

console.log(accumulatedMonth);

function getTargetMonth() {
    return mission / accumulatedMonth;
}

budgetDay = accumulatedMonth / 30;

console.log(Math.floor(budgetDay));

if (budgetDay >= 1200) {
    console.log("У вас высокий доход!");
} else if (1200 > budgetDay && budgetDay >= 600) {
    console.log("У вас Средний уровень!");
} else if (600 > budgetDay && budgetDay >= 0) {
    console.log("У вас низкий  уровень!");
} else {
    console.log("Что то пошло не так!");
}
    


