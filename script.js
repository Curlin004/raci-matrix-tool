document.addEventListener('DOMContentLoaded', () => {
    const matrix = document.getElementById('raci-matrix');
    const addRowButton = document.getElementById('add-row');
    const addColumnButton = document.getElementById('add-column');
    const exportButton = document.getElementById('export-matrix');

    // Add a new row for a role
    addRowButton.addEventListener('click', () => {
        const tbody = matrix.querySelector('tbody');
        const newRow = document.createElement('tr');
        const numColumns = matrix.rows[0].cells.length;

        // Add editable cells for each column
        for (let i = 0; i < numColumns; i++) {
            const cell = document.createElement('td');
            cell.contentEditable = true;
            if (i === 0) cell.textContent = `Role ${tbody.rows.length + 1}`; // Default Role Name
            newRow.appendChild(cell);
        }
        tbody.appendChild(newRow);
    });

    // Add a new column for a task
    addColumnButton.addEventListener('click', () => {
        const headerRow = matrix.querySelector('thead tr');
        const taskNumber = headerRow.cells.length;
        const newHeaderCell = document.createElement('th');
        newHeaderCell.textContent = `Task ${taskNumber}`;
        headerRow.appendChild(newHeaderCell);

        // Add an editable cell to each row in the table body
        const rows = matrix.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const newCell = document.createElement('td');
            newCell.contentEditable = true;
            row.appendChild(newCell);
        });
    });

    // Export the matrix to CSV
    exportButton.addEventListener('click', () => {
        let csvContent = '';
        const rows = matrix.querySelectorAll('tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('th, td');
            const rowContent = Array.from(cells).map(cell => `"${cell.textContent}"`).join(',');
            csvContent += rowContent + '\n';
        });

        // Create a downloadable CSV file
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'raci-matrix.csv';
        a.click();
        URL.revokeObjectURL(url);
    });
});
