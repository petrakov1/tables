function openTab(evt, tabName) {
    // Declare all variables
    evt.preventDefault();
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function createOrder()
{
    $(".modal").addClass("open");
}

function searchOrders()
{
   
        $.ajax({
            type: "GET", // Method type GET/POST
            url: "scripts/searchOrders.php?query="+$("#query").val(), //Ajax Action url
    
            beforeSend: function(){
            },
    
            error: function(){
                    alert('fail');
            },
    
            success: function(result){
                    document.getElementById("ordersList").innerHTML = result;
                    
            }
        });
}
var currentID = -1;
function save()
{
    saved = true;
    $.ajax({
        type: "POST", // Method type GET/POST
        url: "scripts/saveOrder.php", //Ajax Action url
        data: {
            id: currentID,
            order: JSON.stringify(currentJson)
        },
        error: function(){
                alert('fail');
        },

        success: function(result){
            alert(result);  
        }
    });
  
}
function concatTable()
{
    var result = [{1:"Наименование оборудования",2:"Количество"}];
    for (var i = 1; i < currentJson.length; i++) {
        if (currentJson[i][1] != undefined)
        {
            var row = currentJson[i][1]+" "+currentJson[i][2]+","+currentJson[i][3]+", Ду"+currentJson[i][4]+", Ру"+currentJson[i][5]
            +", Присоединение "+currentJson[i][6]
            +", Среда "+currentJson[i][7]
            +", Привод "+currentJson[i][8]
            +", Проход "+currentJson[i][9]
            +", производитель "+currentJson[i][10]

            result.push({1:row,2:currentJson[i][11]});

        }
        // for (var key in data[0]) {
        //     if (col.indexOf(key) === -1) {
        //         col.push(data[0][key]);
        //     }
        // }
    }
    buildTable(result,"tab2");
    return result;
}

function buildTable(data,id)
{
    var col = [];
    // for (var i = 0; i < currentJson.length; i++) {
        for (var key in data[0]) {
            if (col.indexOf(key) === -1) {
                col.push(data[0][key]);
            }
        }
    // }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
    var n = "1";

    var tr = table.insertRow(-1);  
    var th = document.createElement("th");                 // TABLE ROW.
    th.innerHTML = n;
    tr.appendChild(th);
    for (i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (i = 1; i < data.length; i++) {
        n++;
        tr = table.insertRow(-1);

        th = document.createElement("td");                 // TABLE ROW.
    th.innerHTML = n;
    tr.appendChild(th);

        for (var key in data[0]) {
            if (col.indexOf(key) === -1) {
                col.push(data[0][key]);
            
        
            var tabCell = tr.insertCell(-1);
            tabCell.dataset.row = i;
            tabCell.dataset.col = key;
            var value = data[i][key];
            if (value == undefined || value == "") 
            {
                value="";
                tabCell.classList.add("empty");
            }
            tabCell.innerHTML = value;
            }
        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    document.getElementById(id).innerHTML = "";
    document.getElementById(id).appendChild(table);
    $("td").on("click",function()
    {
        saved = false;
        if(  $(this).children("input").length <= 0)
        {
        var input = $("<input>");
        input.attr("value",  $(this).text());
        $(this).text("");
        
        
        $(this).append(input);
        $("input").on("change",() =>
        {
            var val = $(this).children("input").val();
            console.log($(this));
            $(this).html(val);
            if (val != "" && val != " ")
            {
                $(this).removeClass("empty");
            }
            else {
                $(this).addClass("empty");
                
            }
            changeJSON( $(this).attr("data-row"), $(this).attr("data-col"),val);

        })
        }
    })
}

function removeRow()
{

}

function addRow()
{
    for (let index = 0; index < parseInt($("#rows_numbers").val()); index++) {
    currentJson.push({});        
        
    }
    buildTable(currentJson,"table-container");


   
}
function openOrder(id)
{
    currentID = id;
   if (saved)
   {
        $.ajax({
            type: "GET", // Method type GET/POST
            url: "scripts/getTableJson.php?id="+id, //Ajax Action url
    
            beforeSend: function(){
            },
    
            error: function(){
                    alert('fail');
            },
    
            success: function(result){
                createTableFromJSON(result, "table-container");
                $("td").on("click",function()
                {
                    saved = false;
                    if(  $(this).children("input").length <= 0)
                    {
                    var input = $("<input>");
                    input.attr("value",  $(this).text());
                    $(this).text("");
                    
                    
                    $(this).append(input);
                    $("input").on("change",() =>
                    {
                        var val = $(this).children("input").val();
                        console.log($(this));
                        $(this).html(val);
                        changeJSON( $(this).attr("data-row"), $(this).attr("data-col"),val);

                    })
                    }
                })
                
            
                
            }
        });
    }
    else {
        alert("Сохраните изменения");
    }
}

var saved = true;



$(document).ready( function () {

  


    $("#newOrderForm").on("submit",function(e)
{
    e.preventDefault();
    $.ajax({
        type: "POST", // Method type GET/POST
        url: "scripts/createOrder.php", //Ajax Action url
        data: $(this).serialize(),

        // beforeSend: function(){
        //         alert('i am running');
        // },

        error: function(){
                alert('fail');
        },

        success: function(res){
                if (res != "")
                {
                    alert(res);        
                }    
                $(".modal").removeClass("open");
                searchOrders("");
                
        }
    });
});

});