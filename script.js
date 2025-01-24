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
const notification = document.getElementById('notification');

backHomeBtn.addEventListener('click', () => {
  budgetDetails.classList.add('hidden');
  budgetsPage.classList.remove('hidden');
});

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
  closeModalBudget();
});

function closeModalBudget() {
  modalForm.classList.add('hidden');
}

addExpendBtn.addEventListener('click', () => {
  spentModalForm.classList.remove('hidden');
});

closeExpend.addEventListener('click', () => {
  spentModalForm.classList.add('hidden');
});

function getFormValue(formData) {
  let result = new Object();

  for (const data of formData.entries()) {
    const [key, value] = data;
    Object.assign(result, {
      [key]: value,
    });
  }

  return result;
}

function saveData(databaru) {
  const existingData = JSON.parse(localStorage.getItem('Budgets')) ?? [];
  existingData.push(databaru);
  localStorage.setItem('Budgets', JSON.stringify(existingData));
}

function resetInput() {
  document.querySelectorAll('form input').forEach((input) => {
    input.value = '';
  });
}

function showNotif(message) {
  const newNotification = document.createElement('div');
  newNotification.innerText = message;
  newNotification.classList.add('notification');

  notification.appendChild(newNotification);

  setTimeout(() => {
    notification.removeChild(newNotification);
  }, 1800);
}

// submit form
document.querySelector('#modal_form form').addEventListener('submit', (e) => {
  e.preventDefault();
  const data = getFormValue(new FormData(e.target));
  saveData(data);
  closeModalBudget();
  resetInput();
  showNotif('✅ Budget berhasil di catat!');
});
