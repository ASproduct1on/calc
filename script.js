'Use strict';


alert("Are u ready?!");

console.log("Hello curator!");


// Variables 

let money = prompt("Сколько ты зарабатываешь за месяц?");

let income = "freelance";

let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую?"); 

let deposit = confirm("Есть ли у вас депозит в банке?");

let mission = 10000000;

let period = 2;




// Methods & Properties

console.log(typeof money, typeof income, typeof deposit);

console.log(addExpenses.length);

console.log(("Период равен " +  period + " месяца.") + " " + ("Цель заработать " + mission + " долларов."));

console.log(addExpenses.toLowerCase().split(", "));

let budgetDay = money/30; 

console.log(Math.round(budgetDay));


// Dynamic typing

let expenses1 = prompt("Введите обязательную статью расходов?");

let expenses2 = prompt("Введите обязательную статью расходов другую?");

let amount1 = prompt("Во сколько это обойдется в первом случае?");

let amount2 = prompt("Во сколько это обойдется во втором случае?");

let budgetMonth = money - amount1 -amount2;

console.log("Бюджет за месяц: " + budgetMonth);

let timeForMission = mission / budgetMonth;

console.log("Сколько будешь идти к миссии: " + Math.ceil(timeForMission) + " Месяцев");

budgetDay = budgetMonth / 30;

console.log(Math.floor(budgetDay)); 

if (budgetDay>=1200) {
    console.log("У вас высокий доход!");
} else if (1200 > budgetDay && budgetDay >= 600) {
    console.log("У вас Средний уровень!");
} else if (600 > budgetDay && budgetDay >= 0) {
    console.log("У вас низкий  уровень!");
} else {
    console.log("Что то пошло не так!")
}


