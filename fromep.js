function generateStyledTable(data, headers, breakAtRow) {
    // 验证输入数据
    if (!Array.isArray(data) || !Array.isArray(headers) || typeof breakAtRow !== 'number' || breakAtRow < 0) {
        return 'Invalid input';
    }

    // 初始化表格HTML
    let tableHtml = '<table class="styled-table">';
    tableHtml += '<thead><tr>';
    // 添加表头
    headers.forEach(header => {
        tableHtml += `<th>${header}</th>`;
    });
    tableHtml += '</tr></thead><tbody>';

    let rowIndex = 0;
    data.forEach(rowData => {
        // 检查是否需要换行
        if (rowData.includes('#{') && rowData.includes('}')) {
            const match = rowData.match(/#{(\d+)}/);
            if (match && match.length > 1) {
                const breakRow = parseInt(match[1], 10);
                if (rowIndex === breakRow) {
                    // 在此处可以插入逻辑来处理视距并改变布局方式
                    // 例如，可以添加一个标记来指示需要竖向排布
                    tableHtml += '<tr class="break-point"></tr>';
                }
            }
        }

        // 添加表格行
        tableHtml += '<tr>';
        // 假设数据是逗号分隔的字符串
        const cells = rowData.split(',');
        cells.forEach(cell => {
            tableHtml += `<td>${cell}</td>`;
        });
        tableHtml += '</tr>';
        rowIndex++;
    });

    tableHtml += '</tbody></table>';
    return tableHtml;
}

// 示例数据
const data = [
    'John,Doe,25',
    'Jane,Smith,30',
    '#{5}', // 假设这是换行的指示
    'Alice,Johnson,28',
    'Bob,Williams,35'
];

const headers = ['First Name', 'Last Name', 'Age'];
const breakRow = 2; // 在第3行后换行（索引从0开始）

// 生成表格HTML
const tableHtml = generateStyledTable(data, headers, breakRow);

// 将表格HTML插入到页面中
const tableContainer = document.getElementById('table-container');
tableContainer.innerHTML = tableHtml;