const expenseForm = document.getElementById('expense-form');
const savingsForm = document.getElementById('savings-form');
const expenseList = document.getElementById('expense-list');
const savingsInfo = document.getElementById('savings-info');
const categorySummary = {
    Food: document.getElementById('category-food'),
    Travel: document.getElementById('category-travel'),
    Home: document.getElementById('category-home'),
    Savings: document.getElementById('category-savings'),
};

// Load data from localStorage
const loadExpenses = () => {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    displayExpenses(expenses);
    updateCategorySummary(expenses);
    updateSavingsInfo();
};

// Save data to localStorage
const saveExpenses = (expenses) => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
};

// Add a new expense
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('expense-name').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const date = new Date().toISOString().split('T')[0]; // Automatic current date
    const category = document.getElementById('expense-category').value;

    const newExpense = { name, amount, date, category };
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(newExpense);

    saveExpenses(expenses);
    loadExpenses();

    expenseForm.reset();
});

// Display expenses
const displayExpenses = (expenses) => {
    expenseList.innerHTML = expenses.map((expense, index) => `
        <div class="expense-item">
            <span>${expense.name} - ₹${expense.amount} (${expense.category}) on ${expense.date}</span>
            <button onclick="deleteExpense(${index})">Delete</button>
        </div>
    `).join('');
};

// Delete an expense
const deleteExpense = (index) => {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.splice(index, 1);
    saveExpenses(expenses);
    loadExpenses();
};

// Update category summary
const updateCategorySummary = (expenses) => {
    const categoryTotals = expenses.reduce((totals, expense) => {
        totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
        return totals;
    }, {});

    for (const [category, element] of Object.entries(categorySummary)) {
        const total = categoryTotals[category] || 0;
        element.querySelector('p').textContent = `${category}: ₹${total}`;
    }
};

// Set savings goal
savingsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const goal = parseFloat(document.getElementById('savings-goal').value);
    localStorage.setItem('savingsGoal', goal);
    updateSavingsInfo();
});

// Update savings info
const updateSavingsInfo = () => {
    const goal = parseFloat(localStorage.getItem('savingsGoal')) || 0;
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const remaining = goal - totalExpenses;

    savingsInfo.innerHTML = `
        <p>Monthly Goal: ₹${goal.toFixed(2)}</p>
        <p>Total Expenses: ₹${totalExpenses.toFixed(2)}</p>
        <p>Remaining: ₹${remaining.toFixed(2)}</p>
    `;
};

// Initial load
loadExpenses();
