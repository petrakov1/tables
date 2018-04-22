<html>
<head>
	<title>Show table</title>
	<style>
        table {
            border-collapse: collapse;
        }
        table, th, td
        {
            margin:10px 0;
            border:solid 1px #333;
            padding:2px 4px;
            font:15px Verdana;
        }
        th {
            font-weight:bold;
        }
    </style>
    <script type="text/javascript" src="converter.js"></script>

    <script src="http://code.jquery.com/jquery-latest.js"></script>
    <script type="text/javascript">
		var table_in_json;

    		$(document).ready(function($){
			 $("#form_show").on('submit', function(e) {
				 e.preventDefault();
			    var data1=$("#name_input").val();
			    $.ajax({
				    type: "POST",
				    url: "get_table_json.php",
				    data: {'name' : data1},

				    error: function(){
					    alert('failed to get table from the database');
				    },

				    success: function(response){
					    var json2 = response;
					    var obj = JSON.parse(json2);
					    alert(obj.json);
					    table_in_json = obj.json;
					    createTableFromJSON(table_in_json, 'table');
				    }
			    });
		    });
		});
	</script>
</head>

<body>
	<form  method="post" id="form_show">
		<b>Get table by name:</b>

		<p>Name:
			<input type = "text" name = "name" size="30" value="" id="name_input"</>
		</p>

		<p>
			<input type="submit" name="submit" value="Send" id="show_button"/>
		</p>
	</form>
	<div id="table"></div>

</body>
<html>
