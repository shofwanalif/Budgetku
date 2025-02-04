const backHomeBtn = document.querySelector('#btn_backhome button.back_home');
const budgetsPage = document.getElementById('budgets');
tampilBudget();
const budgetDetails = document.querySelector('#budget_details');

const modalForm = document.getElementById('modal_form');
const spentModalForm = document.getElementById('spentmodal_form');
const closeModal = document.querySelector('#modal_form .modal_heading i');
const addExpendBtn = document.querySelector('#budget_details button.add_expend');
const closeExpend = document.querySelector('#spentmodal_form .modal_heading i');
const notification = document.getElementById('notification');

function tampilBudget() {
  const budgetData = getExistingData();
  const budgetList = budgetData
    .map((budget) => {
      return ` <div class="card_budget" BudgetID="${budget.id}">
        <h2 class="budget_name">${budget.nama_budget}</h2>
        <p class="budget_amount">Rp ${budget.total_budget}</p>
        <p class="total_amount">Rp ${budget.total_budget}</p>
      </div>`;
    })
    .concat([`<button class="add_budget">+</button>`])
    .join('');

  budgetsPage.innerHTML = budgetList;
  selectBudgetCards();
}

function selectBudgetCards() {
  const cardBudgets = document.querySelectorAll('#budgets .card_budget');
  const addBudgetBtn = document.querySelector('#budgets button');

  cardBudgets.forEach((card) => {
    card.addEventListener('click', () => {
      const budgetID = card.getAttribute('BudgetID');
      renderBudgetDetail(budgetID);
      renderPengeluaran(budgetID);
      budgetDetails.classList.remove('hidden');
      budgetsPage.classList.add('hidden');
    });
  });

  addBudgetBtn.addEventListener('click', () => {
    modalForm.classList.remove('hidden');
  });
}

function renderPengeluaran(budgetId) {
  const detailPengeluaran = document.querySelector('#budget_details .spent');
  const { pengeluaran } = getBudgetByID(budgetId);
  const listPengeluaran = pengeluaran
    .map((pengeluaran) => {
      return `<div class="spent_items">
          <div class="spent_items_description">
            <h4>${pengeluaran.namaPengeluaran}</h4>
            <p>${pengeluaran.tanggal}</p>
          </div>
          <div class="spent_items_price">
            <p>Rp ${pengeluaran.total}</p>
          </div>
        </div>`;
    })
    .join('');
  detailPengeluaran.innerHTML = listPengeluaran;
}

backHomeBtn.addEventListener('click', () => {
  budgetDetails.classList.add('hidden');
  budgetsPage.classList.remove('hidden');
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
  clsoeModalSpent();
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

function getBudgetByID(budgetID) {
  const budgetData = getExistingData();
  return budgetData.filter((budget) => budget.id == budgetID)[0];
}

function getExistingData() {
  return JSON.parse(localStorage.getItem('Budgets')) ?? [];
}

function saveData(databaru) {
  const existingData = getExistingData();
  existingData.push(databaru);
  localStorage.setItem('Budgets', JSON.stringify(existingData));
}

function generateID() {
  return new Date().getTime();
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

function renderBudgetDetail(budgetID) {
  const selectedBudget = getBudgetByID(budgetID);

  document.querySelector('#budget_details .card_budget').setAttribute('BudgetID', budgetID);
  document.querySelector('#budget_details h2').innerText = selectedBudget.nama_budget;
  document.querySelector('#budget_details p.budget_amount').innerText = `Rp ${selectedBudget.total_budget}`;
  document.querySelector('#budget_details p.total_amount').innerText = `Rp ${selectedBudget.total_budget}`;
}

function addPengeluaran(data) {
  const budgetID = document.querySelector('#budget_details .card_budget').getAttribute('BudgetID');
  const budgetData = getBudgetByID(budgetID);
  const currentSpent = budgetData.pengeluaran ?? [];
  const budgetWithSpent = { ...budgetData, pengeluaran: [...currentSpent, data] };
  const allBudgets = getExistingData();
  const updatedBudgets = allBudgets.map((budget) => {
    if (budget.id == budgetID) {
      return budgetWithSpent;
    } else return budget;
  });

  localStorage.setItem('Budgets', JSON.stringify(updatedBudgets));
}

function clsoeModalSpent() {
  spentModalForm.classList.add('hidden');
}

// submit form
document.querySelector('#modal_form form').addEventListener('submit', (e) => {
  e.preventDefault();
  const data = getFormValue(new FormData(e.target));
  const dataWithID = { ...data, id: generateID() };
  saveData(dataWithID);
  closeModalBudget();
  resetInput();
  showNotif('✅ Budget berhasil di catat!');
  tampilBudget();
});

//submit pengeluaran
document.querySelector('#spentmodal_form form').addEventListener('submit', (e) => {
  const budgetiD = document.querySelector('#budget_details .card_budget').getAttribute('BudgetID');
  e.preventDefault();
  const data = getFormValue(new FormData(e.target));
  addPengeluaran(data);
  clsoeModalSpent();
  showNotif('✅ Pengeluaran berhasil di catat!');
  renderPengeluaran(budgetiD);
  resetInput();
});
