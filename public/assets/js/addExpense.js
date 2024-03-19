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



const isSpendingProfileNameValueContainsOnlyNumbersOrEmpty = (expense) => {
    const regexNumbers = /[\d]/g
    spendingProfileNameError.style.color = "indianred"

    switch (true) {
        case regexNumbers.test(spendingProfileFieldName.value):
            spendingProfileNameError.textContent = "Ce champ ne doit contenir que des lettres !"
            return true
        case spendingProfileFieldName.value === "":
            spendingProfileNameError.textContent = "Ce champ ne peut être vide !"
            return true
        default:
            spendingProfileNameError.textContent = ""
            return false
    }

}



const isSpendingProfileBudgetValueContainsOnlyLettersOrIsEmpty = () => {
    const regexLetters = /[A-Za-z]/g
    
    spendingProfileBudgetError.style.color = "indianred"
    
    switch (true)
    {
        case regexLetters.test(spendingProfileFieldBudget.value):
            spendingProfileBudgetError.textContent = "Ce champ ne doit contenir que des chiffres !"
            return true
        case spendingProfileFieldBudget.value === "":
            spendingProfileBudgetError.textContent = "Ce champ ne peut être vide !"
            return true
        default:
            spendingProfileBudgetError.textContent = ""
            return false
    }

}


spendingForm.addEventListener('submit',(e) => {
    e.preventDefault()
    const isBudgetContainsOnlyNumbersResult = isSpendingProfileBudgetValueContainsOnlyLettersOrIsEmpty()
    const isNameContainsOnlyLettersResult = isSpendingProfileNameValueContainsOnlyNumbersOrEmpty()
    const expenses = JSON.parse(localStorage.getItem('expenses'))


    if(expenses !== null){
        expenses.push({spendingProfilename: spendingProfileFieldName.value,budget:spendingProfileFieldBudget.value})
        return sendData(expenses,[isBudgetContainsOnlyNumbersResult,isNameContainsOnlyLettersResult])
    }
    // alert('Ajoutez une dépense pour créer votre profil !')

    isSpendingProfileBudgetValueContainsOnlyLettersOrIsEmpty()
    isSpendingProfileNameValueContainsOnlyNumbersOrEmpty()
})

const sendData = (expenses,errorsCheck) => {
    const isFalse = (currentValue) => currentValue === false
    const log = console.log
    if(errorsCheck.every(isFalse) && expenses.length !== 0) {
        confirmSendOfData(expenses)
    }
}

const confirmSendOfData = (expenses) => {
    if(window.confirm('Êtes-vous d\'envoyer ses dépenses ? Vous ne pourrez plus les modifier par la suite !')){
        fetch('/créer-un-profil-de-dépense', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(expenses)
        })
            .then((everything) => {
                if (everything.ok) {
                    localStorage.clear()
                    window.location = "/"
                }
            })
    }
}
