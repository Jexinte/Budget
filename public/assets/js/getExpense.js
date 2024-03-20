const table = document.querySelector('#create_spending_profile .all-expenses .table')
const h2 = document.getElementById('h2')
const watchLocalStorage = async () => {

    let previousState = JSON.stringify(localStorage);
    if (typeof localStorage.getItem('expenses') == null) {
        return null
    }

    setInterval(() => {
        let currentState = JSON.stringify(localStorage);

        if (currentState !== previousState) {
            previousState = currentState
            if (!previousState.includes("{}")) {
                const expensesDisplay = document.querySelectorAll(".all-expenses .table .tbody:nth-child(n) ")
                let expensesArr = JSON.parse(JSON.parse(previousState).expenses)
                upDateExpensesDisplay(expensesArr, expensesDisplay)
            }
        }
    }, 100);
}

watchLocalStorage()


const showExpenses = () => {
    let allExpenses = JSON.parse(localStorage.getItem('expenses'))

         if(allExpenses === null){
             return null
         }

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
            <th><button type="button" data-id=${i+1}>X</button></th>
            </tr>
            `
                table.append(tBody)
            })

}
showExpenses()


const upDateExpensesDisplay = (expensesInLocalStorage,expensesDisplay) => {
        if(expensesInLocalStorage.length > expensesDisplay.length){
            h2.textContent = "Résumé des dépenses"
            document.querySelector('.all-expenses .table').insertAdjacentHTML('beforeend', `<tbody class="tbody text-center"> <tr class="table-dark text-center"><th>${expensesInLocalStorage.at(-1).name}</th><th>${expensesInLocalStorage.at(-1).category}</th><th>${expensesInLocalStorage.at(-1).amount}</th><th>${expensesInLocalStorage.at(-1).priority}</th><th> <button type="button" data-id="${expensesInLocalStorage.length}">X</button></th></tr>`)
            deleteExpense()
    }
}

const allowClickOnExpensesAlreadySaved = () => {
    let previousStateOfExpenses = JSON.parse(localStorage.getItem('expenses'))
    if(previousStateOfExpenses !== null)
    {
       document.querySelectorAll('.all-expenses .table-dark button').forEach((button,iButton) => {
            button.addEventListener('click',() => {
                checkIndexes(button,previousStateOfExpenses)
            })
           setInterval(() => {
               const currentStateOfExpenses = checkEmptyNessOfLocalStorage(localStorage.getItem('expenses'))
               if(currentStateOfExpenses !== null){
                    deleteExpense(currentStateOfExpenses)
               }
                checkEmptyNessOfLocalStorage(localStorage.getItem('expenses'))
           },100)

        })
    }
  return null
}

const checkEmptyNessOfLocalStorage = (expenses) => {
    if(expenses === "[]")
    {
        localStorage.removeItem('expenses')
        h2.textContent = ""
    }
    return null
}

allowClickOnExpensesAlreadySaved()

