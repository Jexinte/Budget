const spendingProfileFieldName = document.getElementById('spending_profile_name')
const spendingProfileNameError = document.getElementById('error-name-spending')
const spendingProfileFieldBudget = document.getElementById('spending_profile_budget')
const spendingProfileBudgetError = document.getElementById('error-budget')
const expenseFieldName = document.getElementById('spending_profile_expenseForm_name')
const priorityField = document.getElementById('spending_profile_expenseForm_priority')
const amountField = document.getElementById('spending_profile_expenseForm_amount')
const categoryField = document.getElementById('spending_profile_expenseForm_category')
const expenseNameError = document.getElementById('error-name')
const expenseAmountError = document.getElementById('error-amount')
const expenseCategoryError = document.getElementById('error-category')
const expensePriorityError = document.getElementById('error-priority')
const addExpenseButton = document.getElementById('add_spending')
const spendingForm = document.getElementById('spending_form')
const submitButton = document.getElementById('spending_profile_save')
addExpenseButton.addEventListener('click', (e) => {
    const expensesArr = JSON.parse(localStorage.getItem('expenses'))
    let expense =
        {
                name: expenseFieldName.value,
                amount: amountField.value,
                category: categoryField.value,
                priority: priorityField.value
        }
    const nameErrorResult = isExpenseNameFieldEmpty(expense)
    const nameTypeOfResult = checkNameTypeOf(expense)
    const amountErrorResult = isExpenseAmountFieldEmpty(expense)
    const amountTypeOfResult = checkExpenseAmountTypeOf(expense)
    const categoryErrorResult = isExpenseCategoryFieldEmpty(expense)
    const priorityErrorResult = isExpensePriorityFieldEmpty(expense)
    const errors = [nameErrorResult,nameTypeOfResult,amountErrorResult,categoryErrorResult,priorityErrorResult,amountTypeOfResult]
    const isFalse = (currentValue) => currentValue === false
    switch (true) {
        case localStorage.getItem('expenses') == null:
            if(errors.every(isFalse)){
                localStorage.setItem('expenses', JSON.stringify([expense]))
            }
            break;
        case expensesArr.length !== 0:
            const expenseNameAlreadyExistResult = isNameOfExpensesNotAlreadyExist(expense)
            if(errors.every(isFalse) && !expenseNameAlreadyExistResult){
                expensesArr.push(expense)
                localStorage.setItem('expenses', JSON.stringify(expensesArr))
            }
            break;
    }

})

const isExpenseNameFieldEmpty = (expense) => {
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

const isExpenseAmountFieldEmpty = (expense) => {
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

const isExpenseCategoryFieldEmpty = (expense) => {
    if(expense.category === "")
    {
        expenseCategoryError.textContent =  "Ce champ ne peut être vide !"
        expenseCategoryError.style.color =  "indianred"
        return true
    }
    expenseCategoryError.textContent = ""
    return false
}

const isExpensePriorityFieldEmpty = (expense) => {
    if(expense.priority === "")
    {
        expensePriorityError.textContent =  "Ce champ ne peut être vide !"
        expensePriorityError.style.color =  "indianred"
        return true
    }
    expensePriorityError.textContent = ""
    return false
}

const isNameOfExpensesNotAlreadyExist = (expense) => {
    const expenses = JSON.parse(localStorage.getItem('expenses'))
    const isNotEqual = (currentValue) => currentValue.name !== expense.name
    if(!expenses.every((isNotEqual))){
        expenseNameError.textContent = "Le nom de la dépense ajoutée n'est pas disponible, veuillez en définir un autre"
        expenseNameError.style.color = "indianred"
        return true
    }
    return false

}

const isSpendingProfileNameFieldEmpty = () => {
    if(spendingProfileFieldName.value === ""){
        spendingProfileNameError.textContent = "Ce champ ne peut être vide !"
        spendingProfileNameError.style.color = "indianred"
        return true
    }
    return false
}

const isSpendingProfileNameValueContainsOnlyLetters = (expense) => {
    const regex = /[A-Za-z]/g

    if(!regex.test(spendingProfileFieldName.value)){
        spendingProfileNameError.textContent = "Ce champ ne doit contenir que des lettres !"
        spendingProfileNameError.style.color = "indianred"
        return true
    }

    return false
}

const isSpendingProfileBudgetFieldEmpty = () => {
    if(spendingProfileFieldBudget.value === ""){
        spendingProfileBudgetError.textContent = "Ce champ ne peut être vide !"
        spendingProfileBudgetError.style.color = "indianred"
        return true
    }
    return false
}

const isSpendingProfileBudgetValueContainsOnlyNumbers = () => {
    const regex = /[\d]/g

    if(!regex.test(spendingProfileFieldBudget.value)){
        spendingProfileNameError.textContent = "Ce champ ne doit contenir que des chiffres !"
        spendingProfileNameError.style.color = "indianred"
        return true
    }
    
    return false
}


spendingForm.addEventListener('submit',(e) => {
    e.preventDefault()
    const isBudgetEmptyResult = isSpendingProfileBudgetFieldEmpty()
    const isBudgetContainsOnlyNumbersResult = isSpendingProfileBudgetValueContainsOnlyNumbers()
    const isNameEmptyResult = isSpendingProfileNameFieldEmpty()
    const isNameContainsOnlyLettersResult = isSpendingProfileNameValueContainsOnlyLetters()
    const expenses = JSON.parse(localStorage.getItem('expenses'))
    expenses.push({spendingProfilename: spendingProfileFieldName.value,budget:spendingProfileFieldBudget.value})
    const noErrors = [isNameEmptyResult,isBudgetEmptyResult,isBudgetContainsOnlyNumbersResult,isNameContainsOnlyLettersResult]
    const isFalse = (currentValue) => currentValue === false
    if(noErrors.every(isFalse) && expenses.length !== 0) {

        fetch('/spending-profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(expenses)
        })
            .then(response => {
                response.json().then(resJson => {
                })

            })

    }

})