function getInputValues() {
    return {
        num1: parseFloat(document.getElementById('first_num').value),
        num2: parseFloat(document.getElementById('second_num').value),
        operator: document.getElementById('operator').value
    };
}

function validateInputs(num1, num2) {
    let valid = true;
    document.getElementById('first_num').classList.remove('error');
    document.getElementById('second_num').classList.remove('error');

    if (isNaN(num1) && isNaN(num2)) {
        document.getElementById('first_num').classList.add('error');
        document.getElementById('second_num').classList.add('error');
        alert("Error: Both input values are invalid!");
        valid = false;
    } else if (isNaN(num1)) {
        document.getElementById('first_num').classList.add('error');
        alert("Error: The first number is invalid!");
        valid = false;
    } else if (isNaN(num2)) {
        document.getElementById('second_num').classList.add('error');
        alert("Error: The second number is invalid!");
        valid = false;
    }
    return valid;
}

function performCalculation(num1, num2, operator) {
    switch (operator) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '/': 
            if (Math.abs(num2) < Number.EPSILON) {
                alert("Error: Division by zero is not allowed!");
                document.getElementById('second_num').classList.add('error');
                return null;
            }
            return num1 / num2;
        default:
            alert("Error: Unknown operator!");
            return null;
    }
}

function History(expression, result) {
    const history = document.getElementById('history');
    const newEntry = document.createElement('p');
    newEntry.classList.add('latest');
    newEntry.textContent = `${expression} = ${result}`;
    if (history.children.length >= 10) {
        history.removeChild(history.firstChild);
    }
    history.appendChild(newEntry);
    newEntry.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

function calculate() {
    const { num1, num2, operator } = getInputValues();
    if (!validateInputs(num1, num2)) return;
    
    const result = performCalculation(num1, num2, operator);
    if (result !== null) {
        History(`${num1} ${operator} ${num2}`, result);
    }
}

document.getElementById('first_num').addEventListener('input', function () {
    if (!isNaN(parseFloat(this.value)) && this.value.trim() !== '') {
        this.classList.remove('error');
    }
});

document.getElementById('second_num').addEventListener('input', function () {
    if (!isNaN(parseFloat(this.value)) && this.value.trim() !== '') {
        this.classList.remove('error');
    }
});