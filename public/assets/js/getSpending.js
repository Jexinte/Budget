const spendingBox = document.querySelector('#create_spending_profile .add_spending_box')
const table = document.querySelector('#create_spending_profile .all-expenses .table')
const h2 = document.getElementById('h2')
const watchLocalStorage = async () => {

    let previousState = JSON.stringify(localStorage);

    if (typeof localStorage.getItem('expenses') == null) {
        table.style.display = "none"
        return null
    }

    setInterval(() => {
        let currentState = JSON.stringify(localStorage);

        if (currentState !== previousState) {

            previousState = currentState
            if (previousState.length !== 2) {
                const allSpendings = document.querySelectorAll(".all-expenses .table .tbody ")
                let expensesArr = JSON.parse(JSON.parse(previousState).expenses)
                upDateExpensesDisplay(expensesArr, allSpendings)
            }
        }
    }, 100);
}

watchLocalStorage()


const showExpenses = () => {
    let allExpenses = JSON.parse(localStorage.getItem('expenses'))

    switch (true) {
        case allExpenses === null:
            h2.textContent = "Aucune dépense en cours"
            break;
        default:
            h2.textContent = "Résumé des dépenses"
            allExpenses.forEach((expense, i) => {
                const tBody = document.createElement('tbody')
                tBody.className = "tbody text-center"
                tBody.innerHTML = `
             <tr class="table-dark text-center">
            <th>${expense.name}</th>
            <th>${expense.category}</th>
            <th>${expense.amount}</th>
            <th>${expense.priority}</th>
            <th><button type="button" data-id=${i}>X</button></th>
            </tr>
            `
                table.append(tBody)
            })
            break;
    }

}
showExpenses()


const upDateExpensesDisplay = (expenses, expensesDisplay) => {
    switch (true) {
        case expensesDisplay.length === 0:
            h2.textContent = "Résumé des dépenses"
            return document.querySelector('.all-expenses .table').insertAdjacentHTML('beforeend', `<tbody class="tbody text-center"> <tr class="table-dark text-center"><th>${expenses.at(-1).name}</th><th>${expenses.at(-1).category}</th><th>${expenses.at(-1).amount}</th><th>${expenses.at(-1).priority}</th><th> <button type="button" data-id="${expenses.length}">X</button></th></tr>`)
        case expenses.length > expensesDisplay.length:
            return document.querySelector('.all-expenses .table').insertAdjacentHTML('beforeend',
                `
            <tbody class="tbody text-center"> <tr class="table-dark text-center"><th>${expenses.at(-1).name}</th><th>${expenses.at(-1).category}</th><th>${expenses.at(-1).amount}</th><th>${expenses.at(-1).priority}</th><th> <button type="button" data-id="${expenses.length}">X</button></th></tr>
            `)
    }

}
