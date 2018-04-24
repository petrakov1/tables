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
            url: "searchOrders.php?query="+$("#query").val(), //Ajax Action url
    
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

$(document).ready( function () {

    $("#newOrderForm").on("submit",function(e)
{
    e.preventDefault();
    $.ajax({
        type: "POST", // Method type GET/POST
        url: "createOrder.php", //Ajax Action url
        data: $(this).serialize(),

        beforeSend: function(){
                alert('i am running');
        },

        error: function(){
                alert('fail');
        },

        success: function(){
                alert('success');
                $(".modal").removeClass("open");
                
        }
    });
});

});