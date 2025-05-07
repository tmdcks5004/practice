const form = document.getElementById('form');
const list = document.getElementById('list');
const incomeTotal = document.getElementById('incomeTotal');
const expenseTotal = document.getElementById('expenseTotal');
const balance = document.getElementById('balance');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function addTransaction(e) {
  e.preventDefault();

  const date = document.getElementById('date').value;
  const desc = document.getElementById('desc').value;
  const amount = +document.getElementById('amount').value;
  const type = document.getElementById('type').value;

  if (!date || !desc || !amount) return;

  const transaction = {
    id: Date.now(),
    date,
    desc,
    amount,
    type
  };

  transactions.push(transaction);
  updateLocalStorage();
  render();
  form.reset();
}

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  updateLocalStorage();
  render();
}

function render() {
  list.innerHTML = '';
  let income = 0;
  let expense = 0;

  transactions.forEach(t => {
    const li = document.createElement('li');
    li.className = t.type;
    li.innerHTML = `
      ${t.date} - ${t.desc}: ${t.amount.toLocaleString()}원 
      <button onclick="deleteTransaction(${t.id})">❌</button>
    `;
    list.appendChild(li);

    t.type === 'income' ? income += t.amount : expense += t.amount;
  });

  incomeTotal.textContent = income.toLocaleString();
  expenseTotal.textContent = expense.toLocaleString();
  balance.textContent = (income - expense).toLocaleString();
}

form.addEventListener('submit', addTransaction);
render();