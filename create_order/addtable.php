<html>
<head>
	<title>Add Table</title>
	<script src="http://code.jquery.com/jquery-latest.js"></script>
        <script type="text/javascript">
            $(document).ready(function($){
			  $("#form1").on('submit', function(e) {
				var data1=$("#name_input").val();
  		  		var data2=$("#json_input").val();
               	$.ajax({
                    	type: "POST",
                    	url: "tableadded.php",
                    	data: {'name' : data1, 'json' : data2},

                    	error: function(){
                        		alert('failed to add table to the database');
                    	},

                    	success: function(){
                        		alert('table has been added to the database');
                    	}
                	});
			});
            });
        </script>
</head>
<body>

<form /*action="http://localhost/tableadded.php"*/ method="post" id="form1">
	<b>Add a New Table</b>

	<p>Name:
		<input type = "text" name = "name" size="30" value="" id="name_input"</>
	</p>

	<p>Json text:
		<input type = "text" name = "json" size="30" value="" id="json_input"</>
	</p>

	<p>
		<input type="submit" name="submit" value="Send" id="submitButton"/>
	</p>
</form>



</body>
</html>
