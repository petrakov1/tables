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
        var myBooks = JSON.parse(data);
        //alert(id);
        // EXTRACT VALUE FOR HTML HEADER.
        // ('Book ID', 'Book Name', 'Category' and 'Price')
        var col = [];
        for (var i = 0; i < myBooks.length; i++) {
            for (var key in myBooks[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (i = 0; i < myBooks.length; i++) {

            tr = table.insertRow(-1);
            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = myBooks[i][col[j]];
            }
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        document.getElementById(id).appendChild(table);
    }
}

function changeJSON(x, y, newValue, globalData) {
    var data = JSON.parse(globalData);
    data[x][y] = newValue;
    return JSON.stringify(data);
}

var errorData = "{}}"

var datata = JSON.stringify([
    {
        "Book ID": "1",
        "Book Name": "Computer Architecture",
        "Category": "Computers",
        "Price": "125.60"
    },
    {
        "Book ID": "2",
        "Book Name": "Asp.Net 4 Blue Book",
        "Category": "Programming",
        "Price": "56.00"
    },
    {
        "Book ID": "3",
        "Book Name": "Popular Science",
        "Category": "Science",
        "Price": "210.40"
    }
]);

var newData = "lol";