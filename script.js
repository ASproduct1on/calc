'use strict';

let start = document.getElementById('start');
// console.log(start);

let incomeAdd = document.getElementsByTagName('button')[0];
// console.log(incomeAdd);

let expensesAdd = document.getElementsByTagName('button')[1];
// console.log(expensesAdd);

let depositCheck = document.querySelector('#deposit-check');
// console.log(depositCheck);

let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
// console.log(budgetDayValue);

let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];

let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
// console.log(expensesMonthValue);

let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
// console.log(additionalIncomeValue);

let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
// console.log(additionalExpensesValue);

let incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
// console.log(incomePeriodValue);

let targetMonthValue = document.getElementsByClassName('target_month-value')[0];
// console.log(targetMonthValue);

let salaryAmount = document.querySelector('.salary-amount');
// console.log(salaryAmount);

let incomeTitle = document.querySelector('.income-title');
// console.log(incomeTitle);

let expensesTitle = document.querySelector('.expenses-title');
// console.log(expensesTitle);

let expensesItems = document.querySelectorAll('.expenses-items');
// console.log(expensesItems);

let incomeItems = document.querySelectorAll('.income-items');

let additionalExpenses = document.querySelector('.additional_expenses');
// console.log(additionalExpensesItem);

let periodSelect = document.querySelector('.period-select');
console.log('periodSecelect', periodSelect.value);

let periodAmount = document.querySelector('.period-amount');

let additionalExpensesItem = document.querySelector('.additional_expenses-item');

let additionalIncomeItem = document.querySelectorAll('.additional_income-item');

let depositAmount = document.querySelector('.deposit-amount');
// console.log(depositAmount);

let depositPercent = document.querySelector('.deposit-percent');
// console.log(depositPercent);

let targetAmount = document.querySelector('.target-amount');
// console.log(targetAmount);

let range = document.querySelector('[type="range"]');
// console.log(range);

function numberHandler(value) {
    
    return isNaN(parseFloat(value) && isFinite(value));
}


let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    incomeMonth: 0,
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    start: function(){
        if(salaryAmount.value === ''){
            alert('Ошибка поля "Мсячный доход" заполните обязательно!');
            return;
        }

        appData.budget = salaryAmount.value;    

        appData.getExpenses();  
        
        appData.getExpensesMonth();

        appData.getBudget();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getIncome();
        // appData.selectPeriodValue();

        appData.showResult();


    },
    showResult: function(){
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = Math.ceil(appData.budgetDay);
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        
        incomePeriodValue.value = appData.calcPeriod();
    },
    addExpensesBlock: function(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');
        
        if(expensesItems.length === 3){
            expensesAdd.style.display = 'none';
        }
    },
    getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    addIncomeBlock: function(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
        incomeItems = document.querySelectorAll('.expenses-items');
        
        if(incomeItems.length === 3){
            incomeAdd.style.display = 'none';
        }
    },
    getIncome: function(){
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                appData.income[itemIncome] = cashIncome;
            }
        });

        for(let key in appData.income){
            appData.incomeMonth += +appData.income[key];
            console.log(appData.income[key]);
        }
    },
    getAddExpenses: function(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if(item !== ''){
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },
    
    getInfoDeposit: function() {
        appData.deposit = confirm('Усть ли у вас депозит в банке?');
        if(appData.deposit) {
            appData.percentDeposit = prompt('Какой годовой процент?', "10");
            appData.moneyDeposit = prompt('Какая сумма заложена', 10000);
        }
        
    }, 
    getExpensesMonth: function(){
        for(let key in appData.expenses){
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    getBudget: function(){
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth/30;
    },
    getTargetMonth: function(){
        return targetAmount.value / appData.budgetMonth;
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
    calcPeriod: function(){
        return appData.budgetMonth * periodAmount.innerHTML;
    }
};

// Вызов методов

start.addEventListener('click', appData.start);

expensesAdd.addEventListener('click', appData.addExpensesBlock);

incomeAdd.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener("input", function(a){
    periodAmount.innerHTML = periodSelect.value;
});

console.log(periodSelect.value);

// Обьект appData

// for(let key in appData){
//     console.log("Свойство: " + key + " Значение: " + appData[key]);
// }


// appData.getInfoDeposit();
// console.log(appData.percentDeposit, appData.moneyDeposit,Period());