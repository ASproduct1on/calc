'use strict';

/*function numberHandler(value) {
    
    return isNaN(parseFloat(value) && isFinite(value));
}

let money;

let start = function(){
    do {
        money = prompt("Сколько ты зарабатываешь за месяц?");
    }
    while(isNaN(parseFloat(money)));
} ;

start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposite: false,
    percentDeposite: 0,
    moneyDeposite: 0,
    mission: 50000,
    period: 2,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function(){

        if(confirm("Есть ли у вас доп. заработок?")) {
            let cashincome;
            let itemincome = prompt("Какой у вас есть доп.заработок?", "crypto");
                console.log(typeof itemincome);
                while(numberHandler(cashincome)){
                cashincome = +prompt("Сколько в месяц вы на этом зарабатываете?", 1000);
            }
            appData.income[itemincome] = cashincome;
        }


        let addExpenses = prompt("Перечислите возможные расходы через запятую");
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        for(let key in appData.addExpenses ){
            // appData.addExpenses[key] = array[indexOf()]
            let capitaize = appData.addExpenses[key].charAt(0).toUpperCase() + appData.addExpenses[key].slice(1);
            appData.addExpenses[key] = capitaize;
            console.log(appData.addExpenses[key]);
            
        }
        
        console.log(appData.addExpenses.join(", "));
        console.log(appData.addExpenses);


        appData.deposite = confirm('Есть ли у вас депозит в банке?');
        for(let i = 0; i < 2; i++) {
            let expenses1 = prompt("Введите обязательную статью расходов?");
            let amount1;
            do {
                amount1 = +prompt('Во соклько это обойдется ?');
            }
            while(isNaN(parseFloat(amount1)) || amount1 === ' ' || amount1 === null);
            appData.expenses[expenses1] = amount1;
        }

        console.log(appData.expenses);
    },

    getExpensesMonth: function(){
        let sum = 0;
        for(let key in appData.expenses){
            sum += appData.expenses[key];
        }
        appData.expensesMonth = sum;
    },
    getBudget: function(){
        appData.budgetMonth = money - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth/30;
        return Math.floor(appData.budgetMonth), Math.floor(appData.budgetDay);
    },
    getTargetMonth: function(){
        let res;
        res = appData.mission / appData.budgetMonth;
        if(res>=0) {
            console.log("Цель будет достигнута за " + Math.round(res) + " Месяцeв!");
        }
        else {
            console.log("Цель не будет достигнута!");
        }
    },
    getStatusIncome: function(){
        if (appData.budgetDay >= 1200) {
            console.log("У вас высокий доход!");
        } else if (1200 > appData.budgetDay && appData.budgetDay >= 600) {
            console.log("У вас Средний уровень дохода!");
        } else if (600 > appData.budgetDay && appData.budgetDay >= 0) {
            console.log("У вас низкий  уровень дохода!");
        } else {
            console.log("Что то пошло не так!");
        }    
    },
    getInfoDeposite: function() {
        if(appData.deposite === true) {
            while(numberHandler(appData.percentDeposite)){
                appData.percentDeposite = +prompt("Какой годовой процент % ?", 10);
            }
            while(numberHandler(appData.moneyDeposite)){
                appData.moneyDeposite = +prompt("Какая сумма заложена?", 10000);
            }
        }
    },
    calcSavedMoney: function(){
        return appData.budgetMonth * appData.period;
    }
};

// Вызов методов

appData.asking();

appData.getExpensesMonth();

appData.getBudget();

appData.getTargetMonth();

appData.getStatusIncome();


// Консоль

console.log('Расходы за месяц: ' +  Math.floor(appData.expensesMonth));
 
console.log(("Период равен " +  appData.period + " месяца.") + " " + ("Цель заработать " + appData.mission + " долларов."));

console.log(Math.round(appData.budgetDay) + " Бюджет на день");


// Обьект appData

console.log("Наша программа включает в себя данные: ");

for(let key in appData){
    console.log("Свойство: " + key + " Значение: " + appData[key]);
}


appData.getInfoDeposite();
console.log(appData.percentDeposite, appData.moneyDeposite, appData.calcSavedMoney());*/

// Работа с DOM

let calculate = document.getElementById('start');
console.log(calculate);

let incomeAdd = document.getElementsByTagName('button')[0];
console.log(incomeAdd);

let expensesAdd = document.getElementsByTagName('button')[1];
console.log(expensesAdd);

let depositCheck = document.querySelector('#deposit-check');
console.log(depositCheck);

let incomeItem = document.querySelectorAll('.additional_income-item');
console.log(incomeItem);

const budgetDayValue = document.getElementsByClassName('budget_day-value');
console.log(budgetDayValue);

const expensesMonthValue = document.getElementsByClassName('expenses_month-value');
console.log(expensesMonthValue);

const additionalIncomeValue = document.getElementsByClassName('additional_income-value');
console.log(additionalIncomeValue);

const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value');
console.log(additionalExpensesValue);

const incomePeriodValue = document.getElementsByClassName('income_period-value');
console.log(incomePeriodValue);

const targetMonthValue = document.getElementsByClassName('target_month-value');
console.log(targetMonthValue);

const salaryAmount = document.querySelector('.salary-amount');
console.log(salaryAmount);

const incomeTitle = document.querySelector('.income-title-input');
console.log(incomeTitle);

const incomeAmount = document.querySelector('.income-amount');
console.log(incomeAmount);

const additionalIncomeItem = document.querySelector('.additional_income-item');
console.log(additionalIncomeItem);

const expensesTitle = document.querySelector('.expenses-title-input');
console.log(expensesTitle);

const expensesAmount = document.querySelector('.expenses-amount');
console.log(expensesAmount);

const additionalExpensesItem = document.querySelector('.additional_expenses-item');
console.log(additionalExpensesItem);

const depositAmount = document.querySelector('.deposit-amount');
console.log(depositAmount);

const depositPercent = document.querySelector('.deposit-percent');
console.log(depositPercent);

const targetAmount = document.querySelector('.target-amount');
console.log(targetAmount);

const range = document.querySelector('[type="range"]');
console.log(range);