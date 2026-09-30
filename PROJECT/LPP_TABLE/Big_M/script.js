// DOM Elements
const numVariablesInput = document.getElementById('num-variables');
const numConstraintsInput = document.getElementById('num-constraints');
const optimizationSelect = document.getElementById('optimization');
const setupProblemBtn = document.getElementById('setup-problem');
const solveProblemBtn = document.getElementById('solve-problem');
const inputSection = document.getElementById('input-section');
const solutionSection = document.getElementById('solution-section');
const objectiveInputs = document.getElementById('objective-inputs');
const constraintInputs = document.getElementById('constraint-inputs');
const solutionContainer = document.getElementById('solution-container');

// Global variables
let numVariables = 2;
let numConstraints = 2;
let isMaximization = true;
let M = 1000; // Big M value

// Event Listeners
setupProblemBtn.addEventListener('click', setupProblem);
solveProblemBtn.addEventListener('click', solveProblem);

// Setup problem inputs
function setupProblem() {
    numVariables = parseInt(numVariablesInput.value);
    numConstraints = parseInt(numConstraintsInput.value);
    isMaximization = optimizationSelect.value === 'max';
    
    if (numVariables < 2 || numVariables > 10 || numConstraints < 1 || numConstraints > 10) {
        alert('Please enter valid values (Variables: 2-10, Constraints: 1-10)');
        return;
    }
    
    // Create objective function inputs
    let objectiveHTML = '<div class="objective-inputs">';
    objectiveHTML += '<span>Z = </span>';
    for (let i = 0; i < numVariables; i++) {
        objectiveHTML += `
            <div class="coefficient-input">
                <input type="number" id="obj-${i}" value="0" step="any">
                <span>x<sub>${i + 1}</sub></span>
                ${i < numVariables - 1 ? '<span>+</span>' : ''}
            </div>
        `;
    }
    objectiveHTML += '</div>';
    objectiveInputs.innerHTML = objectiveHTML;
    
    // Create constraint inputs
    let constraintHTML = '';
    for (let i = 0; i < numConstraints; i++) {
        constraintHTML += `<div class="constraint-row">`;
        constraintHTML += `<span>C${i + 1}:</span>`;
        
        for (let j = 0; j < numVariables; j++) {
            constraintHTML += `
                <div class="coefficient-input">
                    <input type="number" id="c${i}-${j}" value="0" step="any">
                    <span>x<sub>${j + 1}</sub></span>
                    ${j < numVariables - 1 ? '<span>+</span>' : ''}
                </div>
            `;
        }
        
        constraintHTML += `
            <select class="constraint-type" id="type-${i}">
                <option value="le">≤</option>
                <option value="eq">=</option>
                <option value="ge">≥</option>
            </select>
            <div class="rhs-input">
                <input type="number" id="rhs-${i}" value="0" step="any">
            </div>
        `;
        constraintHTML += `</div>`;
    }
    constraintInputs.innerHTML = constraintHTML;
    
    inputSection.style.display = 'block';
    solutionSection.style.display = 'none';
}

// Solve the problem using Big M method
function solveProblem() {
    try {
        // Collect objective function coefficients
        const objectiveCoeffs = [];
        for (let i = 0; i < numVariables; i++) {
            const value = parseFloat(document.getElementById(`obj-${i}`).value) || 0;
            objectiveCoeffs.push(value);
        }
        
        // Collect constraints
        const constraints = [];
        for (let i = 0; i < numConstraints; i++) {
            const coeffs = [];
            for (let j = 0; j < numVariables; j++) {
                const value = parseFloat(document.getElementById(`c${i}-${j}`).value) || 0;
                coeffs.push(value);
            }
            const type = document.getElementById(`type-${i}`).value;
            const rhs = parseFloat(document.getElementById(`rhs-${i}`).value) || 0;
            constraints.push({ coeffs, type, rhs });
        }
        
        // Solve using Big M method
        const solution = bigMMethod(objectiveCoeffs, constraints, isMaximization);
        
        // Display solution
        displaySolution(solution);
        
        solutionSection.style.display = 'block';
    } catch (error) {
        alert('Error solving the problem: ' + error.message);
        console.error(error);
    }
}

// Big M Method implementation
function bigMMethod(objectiveCoeffs, constraints, isMaximization) {
    const iterations = [];
    
    // Convert minimization to maximization if needed
    const objCoeffs = isMaximization ? objectiveCoeffs.map(c => c) : objectiveCoeffs.map(c => -c);
    
    // Standardize constraints and add slack/surplus/artificial variables
    let tableau = standardizeConstraints(objCoeffs, constraints);
    
    iterations.push({
        title: 'Initial Tableau',
        tableau: JSON.parse(JSON.stringify(tableau)),
        description: 'Initial simplex tableau with artificial variables'
    });
    
    let iterationCount = 0;
    const maxIterations = 50;
    
    // Simplex iterations
    while (!isOptimal(tableau) && iterationCount < maxIterations) {
        iterationCount++;
        
        // Find pivot column (entering variable)
        const pivotCol = findPivotColumn(tableau);
        if (pivotCol === -1) break;
        
        // Find pivot row (leaving variable)
        const pivotRow = findPivotRow(tableau, pivotCol);
        if (pivotRow === -1) {
            throw new Error('Unbounded solution');
        }
        
        // Perform pivot operation
        tableau = performPivot(tableau, pivotRow, pivotCol);
        
        iterations.push({
            title: `Iteration ${iterationCount}`,
            tableau: JSON.parse(JSON.stringify(tableau)),
            description: `Pivot: Row ${pivotRow + 1}, Column ${pivotCol + 1}`,
            pivotRow: pivotRow,
            pivotCol: pivotCol
        });
    }
    
    // Extract solution
    const finalSolution = extractSolution(tableau, numVariables, isMaximization);
    
    return {
        iterations: iterations,
        solution: finalSolution
    };
}

// Standardize constraints and create initial tableau
function standardizeConstraints(objCoeffs, constraints) {
    const numRows = constraints.length;
    const numCols = numVariables;
    
    // Count slack, surplus, and artificial variables
    let slackCount = 0;
    let artificialCount = 0;
    
    constraints.forEach(c => {
        if (c.type === 'le') slackCount++;
        else if (c.type === 'ge') {
            slackCount++; // surplus variable
            artificialCount++;
        } else if (c.type === 'eq') {
            artificialCount++;
        }
    });
    
    const totalCols = numCols + slackCount + artificialCount + 1; // +1 for RHS
    
    // Initialize tableau
    const tableau = {
        data: [],
        basicVars: [],
        cj: [],
        varNames: []
    };
    
    // Create variable names
    for (let i = 0; i < numCols; i++) {
        tableau.varNames.push(`x${i + 1}`);
    }
    let slackIdx = 1;
    let artificialIdx = 1;
    
    // Build constraint rows
    let slackCounter = 0;
    let artificialCounter = 0;
    
    constraints.forEach((c, idx) => {
        const row = new Array(totalCols).fill(0);
        
        // Original variables
        for (let i = 0; i < numCols; i++) {
            row[i] = c.coeffs[i];
        }
        
        // Add slack/surplus/artificial variables
        if (c.type === 'le') {
            row[numCols + slackCounter] = 1;
            tableau.varNames.push(`s${slackIdx}`);
            tableau.basicVars.push(numCols + slackCounter);
            slackIdx++;
            slackCounter++;
        } else if (c.type === 'ge') {
            row[numCols + slackCounter] = -1; // surplus
            tableau.varNames.push(`s${slackIdx}`);
            slackCounter++;
            slackIdx++;
            
            row[numCols + slackCount + artificialCounter] = 1; // artificial
            tableau.varNames.push(`a${artificialIdx}`);
            tableau.basicVars.push(numCols + slackCount + artificialCounter);
            artificialIdx++;
            artificialCounter++;
        } else { // equality
            row[numCols + slackCount + artificialCounter] = 1;
            tableau.varNames.push(`a${artificialIdx}`);
            tableau.basicVars.push(numCols + slackCount + artificialCounter);
            artificialIdx++;
            artificialCounter++;
        }
        
        // RHS
        row[totalCols - 1] = c.rhs;
        
        tableau.data.push(row);
    });
    
    // Create Cj row (objective function coefficients)
    tableau.cj = new Array(totalCols - 1).fill(0);
    for (let i = 0; i < numCols; i++) {
        tableau.cj[i] = objCoeffs[i];
    }
    // Artificial variables have coefficient -M
    for (let i = numCols + slackCount; i < numCols + slackCount + artificialCount; i++) {
        tableau.cj[i] = -M;
    }
    
    // Add Zj and Cj-Zj rows
    tableau.zj = calculateZj(tableau);
    tableau.cjMinusZj = calculateCjMinusZj(tableau);
    
    return tableau;
}

function calculateZj(tableau) {
    const zj = [];
    const numCols = tableau.data[0].length;
    
    for (let col = 0; col < numCols; col++) {
        let sum = 0;
        for (let row = 0; row < tableau.data.length; row++) {
            const basicVarIdx = tableau.basicVars[row];
            const cValue = basicVarIdx !== undefined ? tableau.cj[basicVarIdx] : 0;
            sum += cValue * tableau.data[row][col];
        }
        zj.push(sum);
    }
    
    return zj;
}

function calculateCjMinusZj(tableau) {
    const cjMinusZj = [];
    const numCols = tableau.cj.length;
    
    for (let col = 0; col < numCols; col++) {
        cjMinusZj.push(tableau.cj[col] - tableau.zj[col]);
    }
    
    return cjMinusZj;
}

function isOptimal(tableau) {
    // Check if all Cj-Zj values are <= 0
    return tableau.cjMinusZj.every(val => val <= 0.0001);
}

function findPivotColumn(tableau) {
    let maxValue = -Infinity;
    let pivotCol = -1;
    
    for (let col = 0; col < tableau.cjMinusZj.length; col++) {
        if (tableau.cjMinusZj[col] > maxValue) {
            maxValue = tableau.cjMinusZj[col];
            pivotCol = col;
        }
    }
    
    return maxValue > 0.0001 ? pivotCol : -1;
}

function findPivotRow(tableau, pivotCol) {
    let minRatio = Infinity;
    let pivotRow = -1;
    const rhsCol = tableau.data[0].length - 1;
    
    for (let row = 0; row < tableau.data.length; row++) {
        const element = tableau.data[row][pivotCol];
        if (element > 0.0001) {
            const ratio = tableau.data[row][rhsCol] / element;
            if (ratio >= 0 && ratio < minRatio) {
                minRatio = ratio;
                pivotRow = row;
            }
        }
    }
    
    return pivotRow;
}

function performPivot(tableau, pivotRow, pivotCol) {
    const newTableau = JSON.parse(JSON.stringify(tableau));
    const pivotElement = newTableau.data[pivotRow][pivotCol];
    
    // Divide pivot row by pivot element
    for (let col = 0; col < newTableau.data[pivotRow].length; col++) {
        newTableau.data[pivotRow][col] /= pivotElement;
    }
    
    // Update other rows
    for (let row = 0; row < newTableau.data.length; row++) {
        if (row !== pivotRow) {
            const factor = newTableau.data[row][pivotCol];
            for (let col = 0; col < newTableau.data[row].length; col++) {
                newTableau.data[row][col] -= factor * newTableau.data[pivotRow][col];
            }
        }
    }
    
    // Update basic variable
    newTableau.basicVars[pivotRow] = pivotCol;
    
    // Recalculate Zj and Cj-Zj
    newTableau.zj = calculateZj(newTableau);
    newTableau.cjMinusZj = calculateCjMinusZj(newTableau);
    
    return newTableau;
}

function extractSolution(tableau, numVars, isMaximization) {
    const solution = {
        variables: new Array(numVars).fill(0),
        objectiveValue: 0
    };
    
    const rhsCol = tableau.data[0].length - 1;
    
    // Extract variable values
    tableau.basicVars.forEach((varIdx, rowIdx) => {
        if (varIdx < numVars) {
            solution.variables[varIdx] = tableau.data[rowIdx][rhsCol];
        }
    });
    
    // Calculate objective value
    solution.objectiveValue = tableau.zj[rhsCol];
    
    // Adjust for minimization
    if (!isMaximization) {
        solution.objectiveValue = -solution.objectiveValue;
    }
    
    return solution;
}

// Display solution in the UI
function displaySolution(solution) {
    let html = '';
    
    // Display each iteration
    solution.iterations.forEach((iteration, idx) => {
        html += `<div class="iteration">`;
        html += `<h3>${iteration.title}</h3>`;
        html += `<p>${iteration.description}</p>`;
        html += generateTableHTML(iteration.tableau, iteration.pivotRow, iteration.pivotCol);
        html += `</div>`;
    });
    
    // Display final solution
    html += `<div class="solution-summary">`;
    html += `<h3>Optimal Solution</h3>`;
    html += `<div class="solution-values">`;
    
    solution.solution.variables.forEach((value, idx) => {
        html += `<div class="solution-item">`;
        html += `<strong>x<sub>${idx + 1}</sub></strong> = ${value.toFixed(4)}`;
        html += `</div>`;
    });
    
    html += `<div class="solution-item">`;
    html += `<strong>Z</strong> = ${solution.solution.objectiveValue.toFixed(4)}`;
    html += `</div>`;
    
    html += `</div></div>`;
    
    solutionContainer.innerHTML = html;
}

function generateTableHTML(tableau, pivotRow = -1, pivotCol = -1) {
    let html = '<div class="simplex-table"><table>';
    
    // Header row 1: Cj values
    html += '<thead><tr>';
    html += '<th>C<sub>B</sub></th>';
    html += '<th>BV</th>';
    
    tableau.cj.forEach((cj, idx) => {
        const cjStr = formatNumber(cj);
        html += `<th>${cjStr}</th>`;
    });
    html += '<th>Sol.</th>';
    html += '</tr>';
    
    // Header row 2: Variable names
    html += '<tr>';
    html += '<th></th><th></th>';
    tableau.varNames.forEach(name => {
        html += `<th>${name}</th>`;
    });
    html += '<th></th>';
    html += '</tr></thead>';
    
    // Body: Constraint rows
    html += '<tbody>';
    tableau.data.forEach((row, rowIdx) => {
        html += '<tr>';
        
        // CB value
        const basicVarIdx = tableau.basicVars[rowIdx];
        const cbValue = formatNumber(tableau.cj[basicVarIdx]);
        html += `<th>${cbValue}</th>`;
        
        // Basic variable name
        html += `<th>${tableau.varNames[basicVarIdx]}</th>`;
        
        // Coefficients
        row.forEach((val, colIdx) => {
            let cellClass = '';
            if (rowIdx === pivotRow && colIdx === pivotCol) {
                cellClass = 'pivot-cell';
            } else if (colIdx === pivotCol) {
                cellClass = 'pivot-column';
            } else if (rowIdx === pivotRow) {
                cellClass = 'pivot-row';
            }
            
            html += `<td class="${cellClass}">${formatNumber(val)}</td>`;
        });
        
        html += '</tr>';
    });
    
    // Zj row
    html += '<tr>';
    html += '<th colspan="2">Z<sub>j</sub></th>';
    tableau.zj.forEach(val => {
        html += `<td>${formatNumber(val)}</td>`;
    });
    html += '</tr>';
    
    // Cj - Zj row
    html += '<tr>';
    html += '<th colspan="2">C<sub>j</sub> - Z<sub>j</sub></th>';
    tableau.cjMinusZj.forEach(val => {
        html += `<td>${formatNumber(val)}</td>`;
    });
    html += '<td></td>';
    html += '</tr>';
    
    html += '</tbody></table></div>';
    
    return html;
}

function formatNumber(num) {
    if (num === 0) return '0';
    if (Math.abs(num) >= M - 1) {
        // It's a Big M value
        const coefficient = num / M;
        if (Math.abs(coefficient - 1) < 0.0001) return '<span class="big-m-cell">M</span>';
        if (Math.abs(coefficient + 1) < 0.0001) return '<span class="big-m-cell">-M</span>';
        return `<span class="big-m-cell">${coefficient.toFixed(0)}M</span>`;
    }
    return num.toFixed(2);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set default example
    numVariablesInput.value = 2;
    numConstraintsInput.value = 2;
});
