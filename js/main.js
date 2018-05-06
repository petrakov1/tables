var last_id;
var currentID = -1;
var concat_Table;
var string;
var listsJson;
var choosenIDs = [];
var currentJson;
var currentProvidersJson;
var choosenListIds;
var currentUser;

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  
  function deleteCookie(name) {
    setCookie(name, "", {
        expires: -1
    })
  }
  
  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; path=/; " + expires;
  
  }
  

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
    $(".modal-order").addClass("open");
}

function searchOrders()
{
   
        $.ajax({
            type: "GET", // Method type GET/POST
            url: "/tables/scripts/searchOrders.php?query="+$("#query").val(), //Ajax Action url
    
            beforeSend: function(){
            },
    
            error: function(){
                console.log('fail');
            },
    
            success: function(result){
                    document.getElementById("ordersList").innerHTML = result;
                    
            }
        });
}


function loadUser(id)
{
    saved = true;
    $.ajax({
        type: "POST", // Method type GET/POST
        url: "/tables/scripts/loadUser.php", //Ajax Action url
        data: {
            id: id
        },
        error: function(){
                console.log('fail');
        },

        success: function(result){
            currentUser = JSON.parse(result);
              
        }
    });
  
}
function save()
{
    saved = true;
    $.ajax({
        type: "POST", // Method type GET/POST
        url: "/tables/scripts/saveOrder.php", //Ajax Action url
        data: {
            id: currentID,
            order: JSON.stringify(currentJson)
        },
        error: function(){
            console.log('fail');
        },

        success: function(result){
            alert("Сохранено");  
        }
    });
  
}
function saveProviders()
{
    saved = true;
    $.ajax({
        type: "POST", // Method type GET/POST
        url: "/tables/scripts/saveProviders.php", //Ajax Action url
        data: {
            providers: JSON.stringify(currentProvidersJson),
            last: last_id
        },
        error: function(){
            console.log('fail');
        },

        success: function(result){
            alert("Сохранено");  
        }
    });
  
}
function saveProviderOrder()
{
    saved = true;
    $.ajax({
        type: "POST", // Method type GET/POST
        url: "/tables/scripts/saveProviderOrder.php", //Ajax Action url
        data: {
            numbers: JSON.stringify(newNumbers),
            id: currentID
        },
        error: function(){
            console.log('fail');
        },

        success: function(result){
            alert(result);  
        }
    });
  
}
function concatTable()
{
    concat_Table = "";
    var result = [{1:"Наименование оборудования",2:"Количество"}];
    for (var i = 1; i < currentJson.length; i++) {
        var currentRow = currentJson[i];
        if (currentRow[1] != undefined)
        {
            var row = currentRow[1];
            if(currentRow[2]!=undefined) row+=" "+currentRow[2]
            if(currentRow[3]!=undefined) row+=", "+currentRow[3]
            if(currentRow[4]!=undefined) row+=", Ду"+currentRow[4]
            if(currentRow[5]!=undefined) row+=", Ру"+currentRow[5]
            if(currentRow[6]!=undefined) row+=", Присоединение "+currentRow[6]
            if(currentRow[7]!=undefined) row+=", Среда "+currentRow[7]
            if(currentRow[8]!=undefined) row+=", Привод "+currentRow[8]
            if(currentRow[9]!=undefined) row+=", Проход "+currentRow[9]
            if(currentRow[10]!=undefined) row+=", производитель "+currentRow[10]
            concat_Table+=row+"\t"+currentRow[11]+"\n";
            result.push({1:row,2:currentRow[11]});

        }
    }
    buildTable(result,"tab2-container");
    $(".btn").attr("data-clipboard-text",concat_Table);
    
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
    var n = " ";

    var tr = table.insertRow(-1);  
    var th = document.createElement("th");                 // TABLE ROW.
    th.innerHTML = n;
    n = 0;
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
        
        $(this).addClass("open");
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
            $(this).removeClass("open");
            
            changeJSON( $(this).attr("data-row"), $(this).attr("data-col"),val);
            $.ajax({
                type: "POST", // Method type GET/POST
                url: "/tables/scripts/saveOrder.php", //Ajax Action url
                data: {
                    id: currentID,
                    order: JSON.stringify(currentJson)
                },
                error: function(){
                    console.log('fail');
                },
        
                success: function(result){
                    saved = true;  
                }
            });
        })
        }
    })
}

var selectedProducts=[];
function buildTableCheckBox(data,id,provider_id)
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
    var n = " ";

    var tr = table.insertRow(-1);  
    var th = document.createElement("th");                 // TABLE ROW.
    th.innerHTML = n;
    n = 0;
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

        th = document.createElement("td");  
        var input = document.createElement("input")
        input.type="checkbox";               // TABLE ROW.
    th.appendChild(input);
    th.classList.add("checkbox");
    th.dataset.row = i;
    th.dataset.provider = provider_id;
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
        if ( $(this).hasClass("checkbox"))
                    {
                        if ($(this).find("input").is(':checked'))
                        {
                            if(selectedProducts[$(this).attr("data-provider")]==undefined) selectedProducts[$(this).attr("data-provider")] = {}
                            selectedProducts[$(this).attr("data-provider")][$(this).attr("data-row")]=responses[$(this).attr("data-provider")][$(this).attr("data-row")];
                            console.log(selectedProducts[$(this).attr("data-provider")]);
                            
                        }
                        else {
                            if(selectedProducts[$(this).attr("data-provider")]==undefined) selectedProducts[$(this).attr("data-provider")] = {}
                            selectedProducts[$(this).attr("data-provider")][$(this).attr("data-row")]=$(this).find("input").is(':checked');
                            console.log(selectedProducts[$(this).attr("data-provider")]);
                        }
                    //  currentProvidersJson[$(this).attr("data-row")][$(this).attr("data-col")] = $(this).find("input").is(':checked');
                 
                    }
    
    })
}
function buildResponse(id)
{

}
function removeRow()
{
    string = $("#delete_rows").val();
    var temp = "";
    var nextRange = "";    
    var result = [];
    var range = false;
    for (var i = 0; i < string.length; i++) {
        var current = string.charAt(i); 
        var next = string.charAt(i+1);  
        if (isNaN(parseInt(next)) && !isNaN(parseInt(current)))
        {   
            temp+= current;
            if (i+1 == string.length) {
                if(!range)  result.push(parseInt(temp));
        else {
           for (let index = nextRange; index <= parseInt(temp) ; index++) {
            result.push(parseInt(index));   
           } 
        }
            }
        }
        else  if (!isNaN(parseInt(next)) && !isNaN(parseInt(current)))            
            temp+= current;
        else if (isNaN(parseInt(current)))
        {
            if (current == ",")
            {
                if(!range)    result.push(parseInt(temp));
                else {
                range = false;
                   for (let index = nextRange; index <= parseInt(temp) ; index++) {
                        result.push(parseInt(index));    
                   } 
                }
                temp="";
            }
            else if(current == "-")
            {
                nextRange = temp;
                range = true;
                temp = "";
            }
        }
      }
      result.sort(function(a,b){return b - a});
      result.filter(function(item, pos) {
        return result.indexOf(item) == pos;
    })
      for (var i = 0; i < result.length; i++) {
          delete currentJson[result[i]];
          currentJson = JSON.stringify(currentJson);
          currentJson = currentJson.replace(',null', '');
          currentJson = currentJson.replace('null,', '');
          currentJson = currentJson.replace('null', '');
          currentJson = JSON.parse(currentJson);
      }


    buildTable(currentJson,"table-container");
    return result;
}
function removeRowProviders()
{
    string = $("#delete_rows_provider").val();
    var temp = "";
    var nextRange = "";    
    var result = [];
    var range = false;
    for (var i = 0; i < string.length; i++) {
        var current = string.charAt(i); 
        var next = string.charAt(i+1);  
        if (isNaN(parseInt(next)) && !isNaN(parseInt(current)))
        {   
            temp+= current;
            if (i+1 == string.length) {
                if(!range)  result.push(parseInt(temp));
        else {
           for (let index = nextRange; index <= parseInt(temp) ; index++) {
            result.push(parseInt(index));   
           } 
        }
            }
        }
        else  if (!isNaN(parseInt(next)) && !isNaN(parseInt(current)))            
            temp+= current;
        else if (isNaN(parseInt(current)))
        {
            if (current == ",")
            {
                if(!range)    result.push(parseInt(temp));
                else {
                range = false;
                   for (let index = nextRange; index <= parseInt(temp) ; index++) {
                        result.push(parseInt(index));    
                   } 
                }
                temp="";
            }
            else if(current == "-")
            {
                nextRange = temp;
                range = true;
                temp = "";
            }
        }
      }
      result.sort(function(a,b){return b - a});
      result.filter(function(item, pos) {
        return result.indexOf(item) == pos;
    })
      for (var i = 0; i < result.length; i++) {
          delete currentProvidersJson[result[i]];
          currentProvidersJson = JSON.stringify(currentProvidersJson);
          currentProvidersJson = currentProvidersJson.replace(',null', '');
          currentProvidersJson = currentProvidersJson.replace('null,', '');
          currentProvidersJson = currentProvidersJson.replace('null', '');
          currentProvidersJson = JSON.parse(currentProvidersJson);
      }


    buildTable(currentProvidersJson,"table-container1");
    return result;
}
function isInJson (json,n){
    n = n -1 ;
    for (var i = 0; i < json.length; i++) {
        
            if (json[i].n == n)
            {
                return true;
            }
    }
    return false;
}
function getProviderById (id){

    for (var i = 0; i < currentProvidersJson.length; i++) {
        
            if (currentProvidersJson[i].id == id)
            {
                return currentProvidersJson[i];
            }
    }
    return false;
}
function addRow()
{
    for (let index = 0; index < parseInt($("#rows_numbers").val()); index++) {
    currentJson.push({});        
        
    }
    buildTable(currentJson,"table-container");


   
}
function buildProviders()
{
    currentProvidersJson = data;
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
                var n = "";
            
                var tr = table.insertRow(-1);  
                var th = document.createElement("th");                 // TABLE ROW.
                th.innerHTML = n;
                n = 0;
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
                        if (key > 5) 
                        {
                            tabCell.classList.add("checkbox");
                            var input = document.createElement("input");
                            input.type = 'checkbox';
                            if (value == "1")
                            {
                                input.checked = true;
                            }
                            tabCell.appendChild(input);
                        }
                        else
                        {
                            tabCell.innerHTML = value;

                        }
                        }
                    }
                }
            
                // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
                document.getElementById("table-container1").innerHTML = "";
                document.getElementById("table-container1").appendChild(table);
                $("td").on("click",function()
                {
                    saved = false;
                    if ( $(this).hasClass("checkbox"))
                    {
                        // alert("!");
                     currentProvidersJson[$(this).attr("data-row")][$(this).attr("data-col")] = $(this).find("input").is(':checked');
                 
                    }
                    else if(  $(this).children("input").length <= 0)
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
                        // alert("1");
                        currentProvidersJson[$(this).attr("data-row")][$(this).attr("data-col")] = val;

                    })
                    }
                })
}
function addColProviders()
{   

    
        currentProvidersJson[0][Object.keys(currentProvidersJson[0]).length+1] = $("#newCol").val();        
       
        buildProviders();
    
 

   
}
function addRowProviders()
{   

    for (let index = 0; index < parseInt($("#rows_numbers_provider").val()); index++) {
        last_id++;
        currentProvidersJson.push({id:last_id});        
        
    }
        buildProviders();

   
}
function openOrder(id)
{
   currentID = id;
   setCookie("lastOrder",id,7);
   if (saved)
   {
        $.ajax({
            type: "GET", // Method type GET/POST
            url: "/tables/scripts/getTableJson.php?id="+id, //Ajax Action url
    
            beforeSend: function(){
            },
    
            error: function(){
                    alert('fail');
            },
    
            success: function(result){
                json = JSON.parse(result);
                createTableFromJSON(json["order"], "table-container");
                $("#name1").text(json["name"]);
                $("#name2").text(json["name"]);
                $("#link").text("https://reddleprojects.ru/tables/client/index.php?link="+json["link"]);
                $("#link").attr("href","https://reddleprojects.ru/tables/client/index.php?link="+json["link"]);
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
                openTab(event,"tab1");
            
                
            }
        });
    }
    else {
        alert("Сохраните изменения");
    }
}
var newNumbers;
function openProviderOrder(id)
{
    currentID = id;
   if (saved)
   {
        $.ajax({
            type: "GET", // Method type GET/POST
            url: "/tables/scripts/getProviderOrder.php?id="+id, //Ajax Action url
    
            beforeSend: function(){
            },
    
            error: function(){
                    alert('fail');
            },
    
            success: function(res){
                res = JSON.parse(res);
                newData = JSON.parse(res.order);
                newNumbers = JSON.parse(res.numbers);
                concat_Table = "";
                console.log(newNumbers);
                var result = [{1:"Наименование оборудования",2:"Количество",3:"Цена, шт.",4:"Сроки Поставки"}];
                for (var i = 1; i < newData.length; i++) {
                    var currentRow = newData[i];
                    if (currentRow[1] != undefined)
                    {
                        var row = currentRow[1]+" "+currentRow[2]+","+currentRow[3]
                        if(currentRow[4]!=undefined) row+=", Ду"+currentRow[4]
                        if(currentRow[5]!=undefined) row+=", Ру"+currentRow[5]
                        if(currentRow[6]!=undefined) row+=", Присоединение "+currentRow[6]
                        if(currentRow[7]!=undefined) row+=", Среда "+currentRow[7]
                        if(currentRow[8]!=undefined) row+=", Привод "+currentRow[8]
                        if(currentRow[9]!=undefined) row+=", Проход "+currentRow[9]
                        if(currentRow[10]!=undefined) row+=", производитель "+currentRow[10]
                        concat_Table+=row+"\t"+currentRow[11]+"\n";
                        if(newNumbers[i]==undefined)
                        {
                            newNumbers.push({});
                        }
                        if(newNumbers[i][1]==undefined) newNumbers[i][1] = "";
                        if(newNumbers[i][2]==undefined) newNumbers[i][2] = "";
                        result.push({1:row,2:currentRow[11],3:newNumbers[i][1],4:newNumbers[i][2]});
                        
                    }
                }
                var col = [];
    // for (var i = 0; i < currentJson.length; i++) {
        for (var key in result[0]) {
            if (col.indexOf(key) === -1) {
                col.push(result[0][key]);
            }
        }
    // }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
    var n = " ";

    var tr = table.insertRow(-1);  
    var th = document.createElement("th");                 // TABLE ROW.
    th.innerHTML = n;
    tr.appendChild(th);
    n = 0;
    for (i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON result TO THE TABLE AS ROWS.
    for (i = 1; i < result.length; i++) {
        n++;
        tr = table.insertRow(-1);

        th = document.createElement("td");                 // TABLE ROW.
    th.innerHTML = n;
    tr.appendChild(th);

        for (var key in result[0]) {
            if (col.indexOf(key) === -1) {
                col.push(result[0][key]);
            
        
            var tabCell = tr.insertCell(-1);
            tabCell.dataset.row = i;
            tabCell.dataset.col = key;
            var value = result[i][key];
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
    document.getElementById("table-container").innerHTML = "";
    document.getElementById("table-container").appendChild(table);

                $("td").on("click",function()
                {
                    saved = false;
                    if ($(this).attr("data-col") > 2){
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
                        newNumbers[$(this).attr("data-row")][$(this).attr("data-col")-2] = val;

                    })
                      }  }
                })
                
            
                
            }
        });
    }
    else {
        alert("Сохраните изменения");
    }
}

function openProviders()
{
   
   if (saved)
   {
        $.ajax({
            type: "GET", // Method type GET/POST
            url: "/tables/scripts/getProviders.php", //Ajax Action url
    
            beforeSend: function(){
            },
    
            error: function(){
                    alert('fail');
            },
    
            success: function(result){
                json = JSON.parse(result);
                data = JSON.parse(json["providers"]);
                last_id = json["last"];
                currentProvidersJson = data;
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
                var n = "";
            
                var tr = table.insertRow(-1);  
                var th = document.createElement("th");                 // TABLE ROW.
                th.innerHTML = n;
                n = 0;
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
                        if (key > 5) 
                        {
                            tabCell.classList.add("checkbox");
                            var input = document.createElement("input");
                            input.type = 'checkbox';
                            if (value == "1")
                            {
                                input.checked = true;
                            }
                            tabCell.appendChild(input);
                        }
                        else
                        {
                            tabCell.innerHTML = value;

                        }
                        }
                    }
                }
            
                // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
                document.getElementById("table-container1").innerHTML = "";
                document.getElementById("table-container1").appendChild(table);
                $("td").on("click",function()
                {
                    saved = false;
                    if ( $(this).hasClass("checkbox"))
                    {
                        // alert("!");
                     currentProvidersJson[$(this).attr("data-row")][$(this).attr("data-col")] = $(this).find("input").is(':checked');
                 
                    }
                    else if(  $(this).children("input").length <= 0)
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
                        // alert("1");
                        currentProvidersJson[$(this).attr("data-row")][$(this).attr("data-col")] = val;
                        $.ajax({
                            type: "POST", // Method type GET/POST
                            url: "/tables/scripts/saveProviders.php", //Ajax Action url
                            data: {
                                providers: JSON.stringify(currentProvidersJson),
                                last: last_id
                            },
                            error: function(){
                                console.log('fail');
                            },
                    
                            success: function(result){
                               saved = true;
                            }
                        });
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

function openProvidersLists()
{
    $.ajax({
        type: "POST", // Method type GET/POST
        url: "/tables/scripts/getLists.php", //Ajax Action url
        data: {
            name: $("#ListName").val(),
            list: JSON.stringify(choosenIDs)
        },

        error: function(){
                alert('fail');
        },

        success: function(res){
            document.getElementById("tab4-container").innerHTML = "";
                
                // alert(res);
                listsJson= JSON.parse(res);
                for (let index = 0; index < listsJson.length; index++) {
                    var id= listsJson[index].id;
                    var div = $("<div><div class='list-container'><h2><input type='radio' group='lists' name='lists' value='"+id+"'>"+listsJson[index].name+"</h2><div id='list"+id+"' data-id="+id+"></div></div></div>");
                    document.getElementById("tab4-container").innerHTML += div.html();
                    var newList =  JSON.parse(listsJson[index].provider_info);
                    var newJSON = [];
                    newJSON.push(currentProvidersJson[0]);
                    
                    for (let i = 0; i < newList.length; i++) {
                        newJSON.push(getProviderById(newList[i].id));
                        
                    }
                    buildTable(newJSON,"list"+id);
                    
                }

        }
    });

}
function createProviderLists()
{
    $.ajax({
        type: "POST", // Method type GET/POST
        url: "/tables/scripts/createList.php", //Ajax Action url
        data: $(this).serialize(),


        error: function(){
                alert('fail');
        },

        success: function(res){
            // addList(res);
            openProvidersLists();
            $(".modal-list").removeClass("open");
        }
    })

}
var newlink;
var result;
var responses = {};
function getProvidersResponse()
{
    $.ajax({
        type: "POST", // Method type GET/POST
        url: "/tables/scripts/getProvidersResponse.php?id="+currentID, //Ajax Action url
        error: function(){
            document.getElementById("tab5-container").innerHTML = "Нет отправленных запросов";            
        },
        success: function(res){
            result = res;
            result = JSON.parse(result);
            var newTable = [];     
            var col = 0;       
            var id=0;
            document.getElementById("tab5-container").innerHTML = "<div id='main-table'></div>";
            var row = {1:" ",2:" "};
            var i = 3;
            
            for(provider in result)
            {
            result[provider].numbers = JSON.parse(result[provider].numbers);
            row[i]=getProviderById(result[provider].provider_id)[2];
                    row[i+1]="";
                    i+=2;
                    
            }
            
            newTable.push(row);
            
            for (let index = 0; index < currentJson.length; index++) {
                // var row = {};
                var currentRow = currentJson[index];
                if (currentRow[1] != undefined && index!=0)
                {
                    var row = currentRow[1];
                    if(currentRow[2]!=undefined) row+=" "+currentRow[2]
                    if(currentRow[3]!=undefined) row+=", "+currentRow[3]
                    if(currentRow[4]!=undefined) row+=", Ду"+currentRow[4]
                    if(currentRow[5]!=undefined) row+=", Ру"+currentRow[5]
                    if(currentRow[6]!=undefined) row+=", Присоединение "+currentRow[6]
                    if(currentRow[7]!=undefined) row+=", Среда "+currentRow[7]
                    if(currentRow[8]!=undefined) row+=", Привод "+currentRow[8]
                    if(currentRow[9]!=undefined) row+=", Проход "+currentRow[9]
                    if(currentRow[10]!=undefined) row+=", производитель "+currentRow[10]
                    concat_Table+=row+"\t"+currentRow[11]+"\n";
                    row = {1:row,2:currentRow[11]};
        
                }
                else if (index==0){
                   row = {1:"Наименование оборудования",2:"Количество"};
                }
                else {
                    row = undefined;
                }
                i = 3;
                for(provider in result)
                {
                
                    
                    if(result[provider].numbers[index]!= undefined)
                    {
                    row[i] = result[provider].numbers[index][1];
                    i++;
                    row[i] = result[provider].numbers[index][2];
                    i++;
                    }
                }
                if(row!=undefined) newTable.push(row);
            }


            for(provider in result)
            {
                
                
                for(row in result[provider].numbers)
                {

                    var t = result[provider].numbers[row];
                    t[3]=t[1];
                    t[4]=t[2];
                    var currentRow = currentJson[row];
                    if (currentRow != undefined && row!=0)
                    {
                        var row = currentRow[1];
                        if(currentRow[2]!=undefined) row+=" "+currentRow[2]
                        if(currentRow[3]!=undefined) row+=", "+currentRow[3]
                        if(currentRow[4]!=undefined) row+=", Ду"+currentRow[4]
                        if(currentRow[5]!=undefined) row+=", Ру"+currentRow[5]
                        if(currentRow[6]!=undefined) row+=", Присоединение "+currentRow[6]
                        if(currentRow[7]!=undefined) row+=", Среда "+currentRow[7]
                        if(currentRow[8]!=undefined) row+=", Привод "+currentRow[8]
                        if(currentRow[9]!=undefined) row+=", Проход "+currentRow[9]
                        if(currentRow[10]!=undefined) row+=", производитель "+currentRow[10]
                        concat_Table+=row+"\t"+currentRow[11]+"\n";
                        t[1]= row;
                        t[2]=currentRow[11];
            
                    }
                    else {
                        t[1] = "Наименование оборудования";
                        t[2]="Количество";
                     }
                    result[provider].numbers[row] = t;
                    // console(result[provider].numbers[row]);
                }
                var div = $("<div><div class='list-container'><h2> Поставщик: "+getProviderById(result[provider].provider_id)[2]+"</h2><div id='response"+id+"' data-id="+id+"></div><p class='button' onclick='requestResponse("+result[provider].provider_id+")'>Запросить счет у поставщика "+getProviderById(result[provider].provider_id)[2]+" на выбранные товары</p></div></div>");
                    document.getElementById("tab5-container").innerHTML += div.html();
                    row[i]=getProviderById(result[provider].provider_id)[2];
                    row[i+1]="";
                    i+=2;
                    buildTableCheckBox(result[provider].numbers ,"response"+id,result[provider].provider_id);
                    responses[result[provider].provider_id] = result[provider].numbers;
                    // newTable.push(result[provider].numbers);
                id++;
            }

            var col = [];
            data = newTable;
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
    var n = " ";

    var tr = table.insertRow(-1);  
    var th = document.createElement("th");                 // TABLE ROW.
    th.innerHTML = n;
    n = -1;
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
    document.getElementById("main-table").innerHTML = "";
    document.getElementById("main-table").appendChild(table);
   
        console.log(newTable);            
            
        }
    });



}

function requestResponse(provider_id)
{
    if(selectedProducts[provider_id]!=undefined)
{
    console.log(selectedProducts[provider_id]);
    console.log(getProviderById(provider_id));
    $.ajax({
        type: "POST", // Method type GET/POST
        url: "/tables/mail_templates/responseProviders.php", //Ajax Action url
        data: {
            data: selectedProducts[provider_id],
            provider: getProviderById(provider_id),
            response: currentUser,
            table: $("#name1").val()
         },

        error: function(){
                alert('fail');
        },

        success: function(res){
            console.log(res);
        }
    })
}
else
{
    alert("Выберите продукты");
}
}

function sendClientResponse(mail,order,link)
{
    $.ajax({
        type: "POST", // Method type GET/POST
        url: "/tables/mail_templates/clientResponse.php", //Ajax Action url
        data: {
            mail : mail,
            order: order,
            link : link
        },

        error: function(){
                alert('fail');
        },

        success: function(res){
            console.log(res);
        }
    })
}
function sendProviderResponse(mail,order,link)
{
    $.ajax({
        type: "POST", // Method type GET/POST
        url: "/tables/mail_templates/providerResponse.php", //Ajax Action url
        data: {
            mail : mail,
            order: order,
            link : link
        },

        error: function(){
                alert('fail');
        },

        success: function(res){
            console.log(res);
        }
    })

}
function sendToProviders()
{
     var resJson = {result: []};
     if ($("input[type=radio]:checked").val()!=undefined)
     {
     var n = parseInt($("input[type=radio]:checked").val())
     for (let index = 0; index < listsJson.length; index++) {
        if(listsJson[index].id == n)
        {
            var newList =  JSON.parse(listsJson[index].provider_info);
            var newJSON = [];
            
            for (let i = 0; i < newList.length; i++) {
                resJson.result.push({order_id:currentID,provider_id:getProviderById(newList[i].id).id,name:"a",response:currentUser.email});
                console.log(getProviderById(newList[i].id).id); 
            }
        }
     }
        $.ajax({
            type: "POST", // Method type GET/POST
            url: "/tables/scripts/createDublicates.php", //Ajax Action url
            data: {
                data: resJson
             },
    
            error: function(){
                    alert('fail');
            },
    
            success: function(res){
                newlink = res;
                    // alert("");

    var res = [];
    newlink = JSON.parse(newlink);
    console.log(newlink);
    
    for (let index = 0; index < listsJson.length; index++) {
        if(listsJson[index].id == n)
        {
            var newList =  JSON.parse(listsJson[index].provider_info);
            var newJSON = [];
            
            for (let i = 0; i < newList.length; i++) {
                var l = newlink;
                res.push({email:getProviderById(newList[i].id)[4],name:getProviderById(newList[i].id)[1],link:newlink[newList[i].id],response:currentUser});
                
            }
        }
    }

    $.ajax({
        type: "POST", // Method type GET/POST
        url: "/tables/mail_templates/mail.php", //Ajax Action url
        data: {
            result : res
        },

        error: function(){
                alert('fail');
        },

        success: function(res){
            console.log(res);
        }
    }
    )
            }
        });
    }
    else alert("Выберите список");
}
                 
function addList(id)
{
    var div = $("<div ><h2>Name</h2><div id='list' data-id="+id+"></div></div>");
    document.getElementById("tab2-container").innerHTML = div.html();
    buildTable(currentJson,"list");
}

function chooseProviders()
{
    $(".modal-list").addClass("open");
    
    data = currentProvidersJson;
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
    var n = " ";

    var tr = table.insertRow(-1);  
    var th = document.createElement("th");                 // TABLE ROW.
    th.innerHTML = n;
    n = 0;
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

        th = document.createElement("td"); 
        var input = document.createElement("input");
        input.type = 'checkbox';
        th.classList.add("choose");
        th.dataset.id = data[i]['id'];
        th.appendChild(input);                // TABLE ROW.

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
            if (key > 5) 
            {
                tabCell.classList.add("checkbox");
                var input = document.createElement("input");
                input.type = 'checkbox';
                if (value == "1")
                {
                    input.checked = true;
                }
                tabCell.appendChild(input);
            }
            else
            {
                tabCell.innerHTML = value;

            }
            }
        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    document.getElementById("chooseProviders").innerHTML = "";
    document.getElementById("chooseProviders").appendChild(table);
    $("td").on("click",function()
    {
       
        if ( $(this).hasClass("choose"))
        {
            if($(this).children("input").is(':checked'))
            {
               
            choosenIDs.push({id:$(this).attr("data-id")});
            console.log(choosenIDs);
            }
            else {
                delete choosenIDs[$(this).attr("data-id")];
            console.log(choosenIDs);
                
            }
        }
        
    
    })


}

function createList()
{

        $.ajax({
            type: "POST", // Method type GET/POST
            url: "/tables/scripts/createList.php", //Ajax Action url
            data: {
                name: $("#ListName").val(),
                list: JSON.stringify(choosenIDs)
             },
    
            error: function(){
                    alert('fail');
            },
    
            success: function(res){
            $(".modal-list").removeClass("open");
                     
                  openProvidersLists();
            }
        });
    }


function createDublicates()
{

     var resJson = {result: []};
     for (let index = 0; index < choosenIDs.length; index++) {
         resJson.result.push({order_id:1,provider_id:choosenIDs[index].id,name:"a"});
     }
        $.ajax({
            type: "POST", // Method type GET/POST
            url: "/tables/scripts/createDublicates.php", //Ajax Action url
            data: {
                data: resJson
             },
    
            error: function(){
                    alert('fail');
            },
    
            success: function(res){
                    return res;
                    
                    // alert("");
            }
        });
    }


var saved = true;



$(document).ready( function () {

  


    $("#newOrderForm").on("submit",function(e)
{
    e.preventDefault();
    $.ajax({
        type: "POST", // Method type GET/POST
        url: "/tables/scripts/createOrder.php", //Ajax Action url
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
                    $.ajax({
                        type: "POST", // Method type GET/POST
                        url: "/tables/scripts/createLink.php?order_id="+res+"&order_type=1&email="+currentUser.email, //Ajax Action url
                       
                
                        success: function(){
                        }
                    })  
                    $(".modal").removeClass("open");
                    searchOrders("");      
                }    
                
                
        }
    });
});

});
window.onbeforeunload = function (event) {
    var message = 'Important: Please click on \'Save\' button to leave this page.';
    if (typeof event == 'undefined') {
        event = window.event;
    }
    if (event) {
        event.returnValue = message;
    }
    return message;
};
