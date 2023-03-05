"use strict";

const start = document.getElementById("start");
const cancel = document.getElementById("cancel");
const btnIncomePlus = document.getElementsByTagName("button")[0];
const btnExpensesPlus = document.getElementsByTagName("button")[1];
const additionalExpensesItem = document.querySelector(
  ".additional_expenses-item"
);
const additionalIncomeItem = document.querySelectorAll(
  ".additional_income-item"
);
const budgetDayValue = document.querySelector(".budget_day-value");
const budgetMonthValue = document.querySelector(".budget_month-value");
const expensesMonthValue = document.querySelector(".expenses_month-value");
const additionalIncomeValue = document.querySelector(
  ".additional_income-value"
);
const additionalExpensesValue = document.querySelector(
  ".additional_expenses-value"
);
const incomePeriodValue = document.querySelector(".income_period-value");
const targetMonthValue = document.querySelector(".target_month-value");
const salaryAmount = document.querySelector(".salary-amount");
const periodSelect = document.querySelector(".period-select");
const depositCheck = document.querySelector("#deposit-check");
const targetAmount = document.querySelector(".target-amount");
const periodAmount = document.querySelector(".period-amount");
const additionalExpenses = document.querySelector(".additional_expenses");
const depositBank = document.querySelector(".deposit-bank");
const depositAmount = document.querySelector(".deposit-amount");
const depositPercent = document.querySelector(".deposit-percent");

let expensesItems = document.querySelectorAll(".expenses-items");
let incomeItems = document.querySelectorAll(".income-items");

function numberHandler(value) {
  return isNaN(parseFloat(value) && isFinite(value));
}
class AppData {
  constructor() {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
  }

  isNum(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  start() {
    console.log("Start sraboral");
    salaryAmount.value = salaryAmount.value.trim();
    if (!this.isNum(salaryAmount.value)) {
      alert("Введите суму месяного дохода!");
      return;
    }
    this.budget = +salaryAmount.value;

    this.getIncome();
    this.getExpenses();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getInfoDeposit();
    this.getBudget();
    this.getStatusIncome();
    this.turnStartCancel(1);
    this.blockUnBlockInput(1);

    this.showResult();
  }
  reset() {
    if (expensesItems.length > 1) {
      for (let i = expensesItems.length - 1; i >= 1; i--) {
        if (expensesItems[i].parentNode) {
          expensesItems[i].parentNode.removeChild(expensesItems[i]);
        }
      }
    }
    if (incomeItems.length > 1) {
      for (let i = incomeItems.length - 1; i >= 1; i--) {
        if (incomeItems[i].parentNode) {
          incomeItems[i].parentNode.removeChild(incomeItems[i]);
        }
      }
    }

    btnIncomePlus.hiden = false;

    document.querySelectorAll("input").forEach((item) => {
      item.value = "";
    });

    periodSelect.value = 1;
    periodAmount.textContent = "1";
    depositCheck.cheked = false;
    this.addIncome = [];
    this.addExpenses = [];

    this.turnStartCancel(0);
    this.blockUnBlockInput(0);
  }

  turnStartCancel(n) {
    if (n) {
      start.hidden = true;
      cancel.style.display = "block";
    } else {
      start.hidden = false;
      cancel.style.display = "none";
    }
  }

  blockUnBlockInput(n) {
    const divData = document.querySelector(".data");
    const arrElemBlock = divData.getElementsByTagName("*");
    for (let i = 0; i < arrElemBlock.length; i++) {
      if (arrElemBlock[i].type !== "range") {
        arrElemBlock[i].disabled = !!n;
      }
    }
  }

  showResult() {
    console.log("znachenie " + this.budgetMonth);
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.ceil(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(", ");
    additionalIncomeValue.value = this.addIncome.join(", ");
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    periodSelect.addEventListener("change", () => {
      this.getPeriod();
    });
    incomePeriodValue.value = this.calcPeriod();
  }

  addExpensesBlock() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem
      .querySelectorAll("input")
      .forEach((item) => (item.value = ""));
    expensesItems[0].parentNode.insertBefore(
      cloneExpensesItem,
      btnExpensesPlus
    );
    expensesItems = document.querySelectorAll(".expenses-items");

    if (expensesItems.length === 3) {
      btnExpensesPlus.hidden = true;
    }
  }
  getExpenses() {
    expensesItems.forEach((item) => {
      let itemExpenses = item.querySelector(".expenses-title").value;
      let cashExpenses = item.querySelector(".expenses-amount").value;
      if (itemExpenses !== "" && cashExpenses !== "") {
        this.expenses[itemExpenses] = cashExpenses;
      }
    });
  }

  addIncomeBlock() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem
      .querySelectorAll("input")
      .forEach((item) => (item.value = ""));
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncomePlus);
    incomeItems = document.querySelectorAll(".income-items");

    if (incomeItems.length === 3) {
      btnIncomePlus.hidden = true;
    }
  }

  getIncome() {
    incomeItems.forEach((item) => {
      let itemIncome = item.querySelector(".income-title").value;
      let cashIncome = item.querySelector(".income-amount").value;
      if (itemIncome !== "" && cashIncome !== "") {
        this.income[itemIncome] = cashIncome;
      }
    });

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }
  getAddExpenses() {
    let addExpenses = additionalExpensesItem.value.split(",");
    addExpenses.forEach((item) => {
      let itemValue = item.trim();
      if (itemValue !== "") {
        this.addExpenses.push(itemValue);
      }
    });
  }
  getAddIncome() {
    additionalIncomeItem.forEach((item) => {
      let itemValue = item.value.trim();
      if (itemValue !== "") {
        this.addIncome.push(itemValue);
      }
    });
  }

  getPeriod() {
    this.period = document.querySelector(".period-select").value;
    periodAmount.textContent = this.period;
  }

  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  }

  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth =
      this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = this.budgetMonth / 30;
  }

  getTargetMonth() {
    return targetAmount.value / this.budgetMonth;
  }

  getStatusIncome() {
    if (this.budgetDay >= 1200) {
      console.log("У вас высокий доход!");
    } else if (1200 > this.budgetDay && this.budgetDay >= 600) {
      console.log("У вас Средний уровень дохода!");
    } else if (600 > this.budgetDay && this.budgetDay >= 0) {
      console.log("У вас низкий  уровень дохода!");
    } else {
      console.log("Что то пошло не так!");
    }
  }

  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }

  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }
  changePercent() {
    const selectValue = this.value;
    if (selectValue === "other") {
      let value = prompt("Введи свой процент!");
      selectValue = value;
    } else {
      depositPercent.value = selectValue;
    }
  }

  depositHendler() {
    if (depositCheck.checked) {
      depositBank.style.display = "inline-block";
      depositAmount.style.display = "inline-block";
      this.deposit = true;
      depositBank.addEventListener("change", this.changePercent);
    } else {
      depositBank.style.display = "none";
      depositAmount.style.display = "none";
      depositBank.value = "";
      depositAmount.value = "";
      this.deposit = false;
      depositBank.removeEventListener("change", this.changePercent);
    }
  }

  eventListeners() {
    start.addEventListener("click", this.start.bind(this));
    btnExpensesPlus.addEventListener("click", this.addExpensesBlock);
    btnIncomePlus.addEventListener("click", this.addIncomeBlock);

    periodSelect.addEventListener("change", () => {
      this.getPeriod();
      incomePeriodValue.value = this.calcPeriod();
    });

    cancel.addEventListener("click", this.reset.bind(this));
    depositCheck.addEventListener("change", this.depositHendler.bind(this));

    // salaryAmount.addEventListener("keyup", appData.check);
  }
}

let newData = new AppData();
newData.eventListeners();

/*
  let addExp = [];

  for (let i = 0; i < appData.addExpenses.length; i++) {
    let element = appData.addExpenses[i].trim();
    element =
      element.chartAt(0).toUpperCase() + element.substring(1).toLowerCase();
    addExp.push(element);
  }
*/
