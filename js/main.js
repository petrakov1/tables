var last_id;
var currentID = -1;
var concat_Table;
var string;
var listsJson;
var choosenIDs = [];
var currentJson;
var currentProvidersJson;
var choosenListIds;



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

function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
  
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
  
    document.body.removeChild(textArea);
  }

function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
      return;
    }
    navigator.clipboard.writeText(text).then(function() {
      console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
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
                    alert('fail');
            },
    
            success: function(result){
                    document.getElementById("ordersList").innerHTML = result;
                    
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
                alert('fail');
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
                alert('fail');
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
                alert('fail');
        },

        success: function(result){
            alert(result);  
        }
    });
  
}
function copyTable()
{
    

    copyTextToClipboard(res);
}
function concatTable()
{
    concat_Table = "";
    var result = [{1:"Наименование оборудования",2:"Количество"}];
    for (var i = 1; i < currentJson.length; i++) {
        var currentRow = currentJson[i];
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
            result.push({1:row,2:currentRow[11]});

        }
    }
    buildTable(result,"tab2-container");
    
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
                if(!range)  result.push({"n":parseInt(temp)});
        else {
           for (let index = nextRange; index <= parseInt(temp) ; index++) {
                result.push({"n":parseInt(index)});    
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
                if(!range)  result.push({"n":parseInt(temp)});
                else {
                range = false;
                   for (let index = nextRange; index <= parseInt(temp) ; index++) {
                        result.push({"n":parseInt(index)});    
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
      for (var i = 0; i < currentJson.length; i++) {
        if (isInJson(result, i)) {
          delete currentJson[i];
          currentJson = JSON.stringify(currentJson);
          currentJson = currentJson.replace(',null', '');
          currentJson = currentJson.replace('null,', '');
          currentJson = currentJson.replace('null', '');
          currentJson = JSON.parse(currentJson);
          console.log(i+" removed");
        }
      }
    buildTable(currentJson,"table-container");
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
function addRowProviders()
{   

    for (let index = 0; index < parseInt($("#rows_numbers").val()); index++) {
        last_id++;
        currentJson.push({id:last_id});        
        
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
function sendToProviders()
{
     var resJson = {result: []};
     
     var n = parseInt($("input[type=radio]:checked").val())
     for (let index = 0; index < listsJson.length; index++) {
        if(listsJson[index].id == n)
        {
            var newList =  JSON.parse(listsJson[index].provider_info);
            var newJSON = [];
            
            for (let i = 0; i < newList.length; i++) {
                resJson.result.push({order_id:currentID,provider_id:getProviderById(newList[i].id),name:"a"});
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
            }
        });

    var res = [];
    console.log(newlink);
    
    for (let index = 0; index < listsJson.length; index++) {
        if(listsJson[index].id == n)
        {
            var newList =  JSON.parse(listsJson[index].provider_info);
            var newJSON = [];
            
            for (let i = 0; i < newList.length; i++) {
                var l = newlink;
                res.push({email:getProviderById(newList[i].id)[4],name:getProviderById(newList[i].id)[1],link:newlink});
                
            }
        }
    }

    $.ajax({
        type: "POST", // Method type GET/POST
        url: "/mail_templates/mail.php", //Ajax Action url
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
                        url: "/tables/scripts/createLink.php?order_id="+res+"&order_type=1", //Ajax Action url
                       
                
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
