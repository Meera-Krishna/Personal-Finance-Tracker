const body = document.body;
const toggle = document.getElementById('theme-toggle');
const sidebarItems = document.querySelectorAll('.sidebar-menu li[data-section]');
const sections = document.querySelectorAll('.dashboard-section');
const btnNewTransaction = document.getElementById('btn-new-transaction');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const form = document.getElementById('transaction-form');
const tbody = document.getElementById('transactions-body');

const incomeEl = document.getElementById('incomes-value');
const expensesEl = document.getElementById('expenses-value');
const totalEl = document.getElementById('total-value');
const chartCircle = document.getElementById('chart-circle');
const chartLabel = document.getElementById('chart-label');

let transactions = [];

// Theme toggle
if (toggle) {
  toggle.addEventListener('click', () => {
    body.classList.toggle('dark');
  });
}

// Sidebar navigation (Dashboard / Contact)
sidebarItems.forEach(item => {
  item.addEventListener('click', () => {
    const sectionName = item.getAttribute('data-section');
    if (!sectionName) return;

    sidebarItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');

    sections.forEach(sec => {
      if (sec.id === `section-${sectionName}`) {
        sec.classList.remove('hidden');
      } else {
        sec.classList.add('hidden');
      }
    });
  });
});

// Modal open / close
function openModal() {
  modalOverlay.classList.add('open');
}

function closeModal() {
  modalOverlay.classList.remove('open');
  form.reset();
  const dateInput = document.getElementById('input-date');
  if (dateInput) {
    dateInput.value = new Date().toISOString().slice(0, 10);
  }
}

btnNewTransaction.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

// Currency formatter
function formatCurrency(value) {
  return 'R$ ' + value.toFixed(2).replace('.', ',');
}

// Render all amounts + table + chart
function render() {
  let incomes = 0;
  let expenses = 0;

  transactions.forEach(t => {
    if (t.type === 'income') {
      incomes += t.amount;
    } else {
      expenses += t.amount;
    }
  });

  const total = incomes - expenses;

  incomeEl.textContent = formatCurrency(incomes);
  expensesEl.textContent = formatCurrency(expenses);
  totalEl.textContent = formatCurrency(total);

  // Table
  tbody.innerHTML = '';
  if (transactions.length === 0) {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.colSpan = 4;
    cell.textContent = 'No Transactions';
    row.appendChild(cell);
    tbody.appendChild(row);
  } else {
    transactions.slice().reverse().forEach(t => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${t.description}</td>
        <td>${t.type === 'income' ? 'Income' : 'Expense'}</td>
        <td>${formatCurrency(t.amount)}</td>
        <td>${t.date}</td>
      `;
      tbody.appendChild(row);
    });
  }

  // Chart
  if (transactions.length === 0) {
    chartCircle.setAttribute('data-empty', 'true');
    chartLabel.textContent = 'No Transactions';
  } else {
    chartCircle.removeAttribute('data-empty');
    const totalAbs = incomes + expenses;
    const incomeAngle = totalAbs === 0 ? 0 : (incomes / totalAbs) * 360;
    chartCircle.style.background = `
      radial-gradient(circle at center, #020617 55%, transparent 56%),
      conic-gradient(#22c55e 0deg, #22c55e ${incomeAngle}deg, #1f2937 ${incomeAngle}deg, #1f2937 360deg)
    `;
    chartLabel.textContent = 'Incomes vs Expenses';
  }
}

// Form submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const description = document.getElementById('input-description').value.trim();
  const type = document.getElementById('input-type').value;
  const amountValue = parseFloat(document.getElementById('input-amount').value || '0');
  const dateValue = document.getElementById('input-date').value;

  if (!description || isNaN(amountValue) || !dateValue) {
    return;
  }

  transactions.push({
    description,
    type,
    amount: Math.abs(amountValue),
    date: dateValue
  });

  render();
  closeModal();
});

// Set default date and initial render
const dateInput = document.getElementById('input-date');
if (dateInput) {
  dateInput.value = new Date().toISOString().slice(0, 10);
}

render();
