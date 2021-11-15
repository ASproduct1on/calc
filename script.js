'use strict';

let start = document.getElementById('start');
// console.log(start);

let cancel = document.getElementById('cancel');

let incomeAdd = document.getElementsByTagName('button')[0];
// console.log(incomeAdd);

let expensesAdd = document.getElementsByTagName('button')[1];
// console.log(expensesAdd);

let checkBox = document.querySelector('#deposit-check');
// console.log(checkBox);

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
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    expensesMonth: 0,
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,

    check: function() {
        if(salaryAmount.value !== ''){
            start.removeAttribute('disabled');
        }
    },

    start: function(){
        if(salaryAmount.value === ''){
            start.setAttribute('disabled', 'true');
            return;
        }
        let allInput = document.querySelectorAll('.data input[type = text]');
        allInput.forEach(function(item){
            item.setAttribute('disabled', 'disabled');
        });
        expensesAdd.setAttribute('disabled', 'disabled');
        incomeAdd.setAttribute('disabled', 'disabled');
        start.style.display = 'none';
        cancel.style.display = 'block';

        this.budget = +salaryAmount.value;    

        this.getExpenses();  
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.getInfoDeposit();
        this.getStatusIncome();
        this.showResult();

    },

    showResult: function(){
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.ceil(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('change', function(){
          incomePeriodValue.value =  appData.calcPeriod;
        });
        incomePeriodValue.value = this.calcPeriod();
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
            this.incomeMonth += +this.income[key];
            
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
    
    getExpensesMonth: function(){
        for(let key in this.expenses){
            this.expensesMonth += +this.expenses[key];
        }
    },

    getBudget: function(){
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = this.budgetMonth/30;
    },

    getTargetMonth: function(){
        return targetAmount.value / this.budgetMonth;
    },

    getStatusIncome: function(){
        if (this.budgetDay >= 1200) {
            console.log("У вас высокий доход!");
        } else if (1200 > this.budgetDay && this.budgetDay >= 600) {
            console.log("У вас Средний уровень дохода!");
        } else if (600 > this.budgetDay && this.budgetDay >= 0) {
            console.log("У вас низкий  уровень дохода!");
        } else {
            console.log("Что то пошло не так!");
        }    
    },

    getInfoDeposit: function() {
        if (this.deposite) {
            do {
                this.percentDeposit = prompt('Какой годовой процент?', '12');
            } while (isNan(this.percentDeposit) || this.percentDeposit === ' ' || this.percentDeposit === null);
            do {
                this.moneyDeposit = prompt('Какая сумма заложена?', '1000');
            } while (isNan(this.moneyDeposit) || this.moneyDeposit === "" || this.moneyDeposit === " " || this.moneyDeposit === null);
        }    
    }, 

    calcPeriod: function(){
        return this.budgetMonth * periodSelect.innerHTML;
    },

    reset: function(){
        
        let inputTextData = document.querySelectorAll('.data input[type = text]');
        let resultInputAll = document.querySelectorAll('.result input[type = text]');

        inputTextData.forEach(function(elem){
            elem.value = '';
            elem.removeAttribute('disabled');
            periodSelect.value = 0;
            periodAmount.innerHTML = periodSelect.value;

        });
        resultInputAll.forEach(function(elem){
            elem.value = '';
        });

        for (let i = 1; i < incomeItems.length; i++){
            incomeItems[i].parentNode.removeChild(incomeItems[i]);
            incomeAdd.style.display = 'block';
        }
        for (let i = 1; i< expensesItems.length; i++){
            expensesItems[i].parentNode.removeChild(expensesItems[i]);
            expensesAdd.style.display = 'block';
        }

        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.expensesMonth = 0;
        this.deposit = false;
        this.percentDeposite = 0;
        this.moneyDeposit = 0;
        this.addExpenses = [];

        cancel.style.display = 'none';
        start.style.display = 'block';
        expensesAdd.removeAttribute('disabled');
        incomeAdd.removeAttribute('disabled');
        checkBox.checked = false;
    }
};

// Вызов методов

start.addEventListener('click', appData.start.bind(appData));

expensesAdd.addEventListener('click', appData.addExpensesBlock);

incomeAdd.addEventListener('click', appData.addIncomeBlock);

salaryAmount.addEventListener('keyup', appData.check);

cancel.addEventListener('click', appData.reset.bind(appData));

periodSelect.addEventListener("change", function(a){
    periodAmount.innerHTML = periodSelect.value;
});


let addExp = [];

for (let i=0; i< appData.addExpenses.length; i++) {
    let element = appData.addExpenses[i].trim();
    element = element.chartAt(0).toUpperCase()+ element.substring(1).toLowerCase();
    addExp.push(element);
}

