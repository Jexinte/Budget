const deleteExpense = () => {
    const  expenses = JSON.parse(localStorage.getItem('expenses'))
    if(!expenses.length !== 0){
        let buttons = Array.from(document.querySelectorAll('.all-expenses .table-dark button'))
        buttons.forEach((button,iButton) => {
            button.addEventListener('click',() => {
                checkIndexes(button,expenses)
                setInterval(() => {
                    checkEmptyNessOfLocalStorage(localStorage.getItem('expenses'))
                },700)
            })
        })
    }
}

const checkIndexes = (button,expenses) => {
    const checkIndex = (value,iLocalStorage) => iLocalStorage+1 === parseInt(button.getAttribute('data-id'))
    const indexOfExpenseToDelete = expenses.findIndex(checkIndex)
    expenses.splice(indexOfExpenseToDelete,1)
    button.closest('tbody').remove()
    localStorage.setItem('expenses',JSON.stringify(expenses))
}