const addSpendingButton = document.getElementById('add_spending')
const expenseField = document.getElementById('spending_profile_expenseForm_name')
const priorityField = document.getElementById('spending_profile_expenseForm_priority')
const amountField = document.getElementById('spending_profile_expenseForm_amount')
const categoryField = document.getElementById('spending_profile_expenseForm_category')

const log = console.log
addSpendingButton.addEventListener('click', (e) => {
    const expensesArr = JSON.parse(localStorage.getItem('expenses'))

    let expense =
        {
                name: expenseField.value,
                amount: amountField.value,
                category: categoryField.value,
                priority: priorityField.value
        }

    switch (true) {
        case localStorage.getItem('expenses') == null:
            localStorage.setItem('expenses', JSON.stringify([expense]))
            break;
        case expensesArr.length !== 0:
            expensesArr.push(expense)
            localStorage.setItem('expenses', JSON.stringify(expensesArr))
            break;
    }

})
