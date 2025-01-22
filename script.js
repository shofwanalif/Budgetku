const backHomeBtn = document.querySelector('#btn_backhome button.back_home');
const budgetsPage = document.getElementById('budgets');
const budgetDetails = document.querySelector('#budget_details');
const cardBudgets = document.querySelectorAll('#budgets .card_budget');
const addBudgetBtn = document.querySelector('#budgets button');
const modalForm = document.getElementById('modal_form');
const spentModalForm = document.getElementById('spentmodal_form');
const closeModal = document.querySelector('#modal_form .modal_heading i');
const addExpendBtn = document.querySelector('#budget_details button.add_expend');
const closeExpend = document.querySelector('#spentmodal_form .modal_heading i');

backHomeBtn.addEventListener('click', () => {
  budgetDetails.classList.add('hidden');
  budgetsPage.classList.remove('hidden');
});

console.log(cardBudgets);

cardBudgets.forEach((card) => {
  card.addEventListener('click', () => {
    budgetDetails.classList.remove('hidden');
    budgetsPage.classList.add('hidden');
  });
});

addBudgetBtn.addEventListener('click', () => {
  modalForm.classList.remove('hidden');
});

closeModal.addEventListener('click', () => {
  modalForm.classList.add('hidden');
});

addExpendBtn.addEventListener('click', () => {
  spentModalForm.classList.remove('hidden');
});

closeExpend.addEventListener('click', () => {
  spentModalForm.classList.add('hidden');
});
