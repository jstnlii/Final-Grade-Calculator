function calculateFinalGrade() {
    const rows = document.querySelectorAll('#gradeTableBody tr');
    let totalWeight = 0;
    let weightedSum = 0;

    rows.forEach(row => {
        const grade = parseFloat(row.querySelector('.assignment-grade').value) || 0;
        const weight = parseFloat(row.querySelector('.assignment-weight').value) || 0;

        totalWeight += weight;
        weightedSum += (grade * weight);
    });

    const remainingWeight = (100 - totalWeight).toFixed(2);
    const finalGrade = (totalWeight > 0) ? (weightedSum / totalWeight).toFixed(2) : 0;

    document.getElementById('result').innerHTML = `<h2><span style="color: white;">Your Final Grade is:</span> <span class="${finalGrade >= 60 ? 'passing' : 'overweight'}">${finalGrade}%</span></h2>`;
    updateRemainingWeightColor(remainingWeight);
}

function addRows() {
    const tableBody = document.getElementById('gradeTableBody');

    for (let i = 0; i < 3; i++) {
        const newRow = tableBody.insertRow();
        newRow.innerHTML = `
            <td><input type="text" class="assignment-name"></td>
            <td><input type="number" class="assignment-grade" ></td>
            <td><input type="number" class="assignment-weight" oninput="updateRemainingWeight()"></td>
        `;
    }
}

function clearFields() {
    const tableBody = document.getElementById('gradeTableBody');
    const inputFields = document.querySelectorAll('.assignment-name, .assignment-grade, .assignment-weight');

    inputFields.forEach(field => {
        field.value = '';
    });

    // Remove dynamically added rows
    while (tableBody.rows.length > 5) {
        tableBody.deleteRow(tableBody.rows.length - 1);
    }

    document.getElementById('result').innerHTML = '';
    document.getElementById('remainingWeight').innerText = 'Remaining Weight: 100%';
    document.getElementById('remainingWeight').classList.remove('overweight');
}

function updateRemainingWeight() {
    const rows = document.querySelectorAll('#gradeTableBody tr');
    let totalWeight = 0;

    rows.forEach(row => {
        const weight = parseFloat(row.querySelector('.assignment-weight').value) || 0;
        totalWeight += weight;
    });

    const remainingWeight = (100 - totalWeight).toFixed(2);
    document.getElementById('remainingWeight').innerText = `Remaining Weight: ${remainingWeight}%`;

    updateRemainingWeightColor(remainingWeight);
}

function updateRemainingWeightColor(remainingWeight) {
    const remainingWeightElement = document.getElementById('remainingWeight');
    remainingWeightElement.classList.toggle('overweight', remainingWeight < 0);
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        calculateFinalGrade();
    }
});