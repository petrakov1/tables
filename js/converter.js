
function checkIfJSON(data) {
    try {
        JSON.parse(data);
        return true;
    } catch(err) {
        alert('parsing failed');
        return false;
    }
}

function createTableFromJSON(data, id) {
    if (checkIfJSON(data)) {
        currentJson = JSON.parse(data);
        buildTable(currentJson,"table-container");
        
    }
}

function changeJSON(x, y, newValue) {
    currentJson[x][y] = newValue;
}

var errorData = "{}}"
