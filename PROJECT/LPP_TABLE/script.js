// DOM Elements
const rowsInput = document.getElementById('rows');
const columnsInput = document.getElementById('columns');
const fillModeSelect = document.getElementById('fill-mode');
const sameValueInput = document.getElementById('same-value');
const generateBtn = document.getElementById('generate-table');
const makeAdjacentSameBtn = document.getElementById('make-adjacent-same');
const resetBtn = document.getElementById('reset');
const tableContainer = document.getElementById('table-container');

// Global variables
let tableData = [];

// Event Listeners
generateBtn.addEventListener('click', generateTable);
makeAdjacentSameBtn.addEventListener('click', makeAdjacentSame);
resetBtn.addEventListener('click', resetTable);

// Initial table generation
document.addEventListener('DOMContentLoaded', () => {
    generateTable();
});

// Generate the table based on user input
function generateTable() {
    const rows = parseInt(rowsInput.value) || 5;
    const columns = parseInt(columnsInput.value) || 5;
    const fillMode = fillModeSelect.value;
    const sameValue = parseInt(sameValueInput.value) || 1;
    
    // Validate inputs
    if (rows < 1 || rows > 20 || columns < 1 || columns > 20) {
        alert('Please enter values between 1 and 20 for rows and columns');
        return;
    }
    
    // Initialize table data
    tableData = [];
    
    // Create table HTML
    let tableHTML = '<table id="adjacent-table">';
    
    // Create header row
    tableHTML += '<thead><tr>';
    tableHTML += '<th></th>'; // Empty corner cell
    for (let j = 0; j < columns; j++) {
        tableHTML += `<th>Col ${j + 1}</th>`;
    }
    tableHTML += '</tr></thead>';
    
    // Create body rows
    tableHTML += '<tbody>';
    
    for (let i = 0; i < rows; i++) {
        tableHTML += '<tr>';
        tableHTML += `<th>Row ${i + 1}</th>`; // Row header
        
        // Initialize row data
        tableData[i] = [];
        
        for (let j = 0; j < columns; j++) {
            let value;
            
            // Fill based on selected mode
            switch (fillMode) {
                case 'random':
                    value = Math.floor(Math.random() * 10) + 1;
                    break;
                case 'sequential':
                    value = i * columns + j + 1;
                    break;
                case 'same':
                    value = sameValue;
                    break;
                default:
                    value = 0;
            }
            
            tableData[i][j] = value;
            tableHTML += `<td data-row="${i}" data-col="${j}">${value}</td>`;
        }
        
        tableHTML += '</tr>';
    }
    
    tableHTML += '</tbody></table>';
    
    // Insert table into container
    tableContainer.innerHTML = tableHTML;
}

// Make adjacent cells have the same values
function makeAdjacentSame() {
    const table = document.getElementById('adjacent-table');
    if (!table) {
        alert('Please generate a table first');
        return;
    }
    
    const rows = tableData.length;
    if (rows === 0) return;
    
    const columns = tableData[0].length;
    
    // Create a copy of the table data to work with
    const newData = JSON.parse(JSON.stringify(tableData));
    
    // Process each cell to make adjacent cells the same
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            // Get adjacent cells (up, down, left, right)
            const adjacentValues = [];
            
            // Up
            if (i > 0) adjacentValues.push(tableData[i - 1][j]);
            
            // Down
            if (i < rows - 1) adjacentValues.push(tableData[i + 1][j]);
            
            // Left
            if (j > 0) adjacentValues.push(tableData[i][j - 1]);
            
            // Right
            if (j < columns - 1) adjacentValues.push(tableData[i][j + 1]);
            
            // If there are adjacent cells, set current cell to average of adjacent values
            if (adjacentValues.length > 0) {
                const sum = adjacentValues.reduce((acc, val) => acc + val, 0);
                newData[i][j] = Math.round(sum / adjacentValues.length);
            }
        }
    }
    
    // Update table data
    tableData = newData;
    
    // Update table display
    updateTableDisplay();
}

// Update table display with current data
function updateTableDisplay() {
    const rows = tableData.length;
    if (rows === 0) return;
    
    const columns = tableData[0].length;
    
    // Update each cell
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const cell = document.querySelector(`td[data-row="${i}"][data-col="${j}"]`);
            if (cell) {
                cell.textContent = tableData[i][j];
                
                // Check if this cell has the same value as any adjacent cell
                const currentValue = tableData[i][j];
                let hasAdjacentSame = false;
                
                // Check up
                if (i > 0 && tableData[i - 1][j] === currentValue) {
                    hasAdjacentSame = true;
                }
                
                // Check down
                if (i < rows - 1 && tableData[i + 1][j] === currentValue) {
                    hasAdjacentSame = true;
                }
                
                // Check left
                if (j > 0 && tableData[i][j - 1] === currentValue) {
                    hasAdjacentSame = true;
                }
                
                // Check right
                if (j < columns - 1 && tableData[i][j + 1] === currentValue) {
                    hasAdjacentSame = true;
                }
                
                // Add class if adjacent cells have same value
                if (hasAdjacentSame) {
                    cell.classList.add('adjacent-same');
                } else {
                    cell.classList.remove('adjacent-same');
                }
            }
        }
    }
}

// Reset the table to initial state
function resetTable() {
    if (confirm('Are you sure you want to reset the table? All data will be lost.')) {
        generateTable();
    }
}