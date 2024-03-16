const addExpenseButton = document.getElementById('add_spending')
const expenseFieldName = document.getElementById('spending_profile_expenseForm_name')
const priorityField = document.getElementById('spending_profile_expenseForm_priority')
const amountField = document.getElementById('spending_profile_expenseForm_amount')
const categoryField = document.getElementById('spending_profile_expenseForm_category')
const expenseNameError = document.getElementById('error-name')
const expenseAmountError = document.getElementById('error-amount')
const expenseCategoryError = document.getElementById('error-category')
const expensePriorityError = document.getElementById('error-priority')
const log = console.log
addExpenseButton.addEventListener('click', (e) => {
    const expensesArr = JSON.parse(localStorage.getItem('expenses'))
    let expense =
        {
                name: expenseFieldName.value,
                amount: amountField.value,
                category: categoryField.value,
                priority: priorityField.value
        }
    const nameErrorResult = checkExpenseNameField(expense)
    const nameTypeOfResult = checkNameTypeOf(expense)
    const amountErrorResult = checkExpenseAmountField(expense)
    const amountTypeOfResult = checkExpenseAmountTypeOf(expense)
    const categoryErrorResult = checkExpenseCategoryField(expense)
    const priorityErrorResult = checkExpensePriorityField(expense)
    const errors = [nameErrorResult,nameTypeOfResult,amountErrorResult,categoryErrorResult,priorityErrorResult,amountTypeOfResult]
    const isFalse = (currentValue) => currentValue === false
    switch (true) {
        case localStorage.getItem('expenses') == null:
            if(errors.every(isFalse)){
                localStorage.setItem('expenses', JSON.stringify([expense]))
            }
            break;
        case expensesArr.length !== 0:
            const expenseNameAlreadyExistResult = checkNameOfExpensesNotAlreadyExist(expense)
            log(expenseNameAlreadyExistResult)
            if(errors.every(isFalse) && !expenseNameAlreadyExistResult){
                expensesArr.push(expense)
                localStorage.setItem('expenses', JSON.stringify(expensesArr))
            }
            break;
    }

})

const checkExpenseNameField = (expense) => {
    if(expense.name === "")
    {
        expenseNameError.textContent =  "Ce champ ne peut être vide !"
        expenseNameError.style.color =  "indianred"
        return true
    }
    expenseNameError.textContent = ""
    return false
}
const checkNameTypeOf = (expense) => {
    const regex = /[\d]/g

    if(regex.test(expense.name)){
        expenseNameError.textContent =  "Ce champ ne peut inclure que des lettres !"
        expenseNameError.style.color =  "indianred"
        return true
    }
    return false
}

const checkExpenseAmountField = (expense) => {
    if(expense.amount === "" )
    {
        expenseAmountError.textContent =  "Ce champ ne peut être vide !"
        expenseAmountError.style.color =  "indianred"
        return true
    }
    expenseAmountError.textContent = ""
    return false
}

const checkExpenseAmountTypeOf = (expense) => {
    const regex = /[A-Za-z]/g

    if(regex.test(expense.amount)){
        expenseAmountError.textContent =  "Ce champ ne peut inclure de lettres !"
        expenseAmountError.style.color =  "indianred"
        return true
    }
    return false
}

const checkExpenseCategoryField = (expense) => {
    if(expense.category === "")
    {
        expenseCategoryError.textContent =  "Ce champ ne peut être vide !"
        expenseCategoryError.style.color =  "indianred"
        return true
    }
    expenseCategoryError.textContent = ""
    return false
}

const checkExpensePriorityField = (expense) => {
    if(expense.priority === "")
    {
        expensePriorityError.textContent =  "Ce champ ne peut être vide !"
        expensePriorityError.style.color =  "indianred"
        return true
    }
    expensePriorityError.textContent = ""
    return false
}

const checkNameOfExpensesNotAlreadyExist = (expense) => {
    const expenses = JSON.parse(localStorage.getItem('expenses'))
    const isNotEqual = (currentValue) => currentValue.name !== expense.name
    if(!expenses.every((isNotEqual))){
        expenseNameError.textContent = "Le nom de la dépense ajoutée n'est pas disponible, veuillez en définir un autre"
        expenseNameError.style.color = "indianred"
        return true
    }
    return false

}
