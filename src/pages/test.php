<!doctype html>
<html>
<head>
	<title>Lucky Ball</title>
	<meta charset="utf-8">
	<?php
		//$config['path'] = 'http://localhost:8080/src';
		$config['path'] = 'http://localhost:8080/build';
	?>
	<script type="text/javascript">
	window.HEALTH = {
		cdnPath : "<?php echo $config['path'] ?>"
	}
	</script>
	<link rel="stylesheet" type="text/css" href="../styles/app.css">
	<script type="text/javascript" src="<?php echo $config['path'] ?>/lib/sea/sea.js"></script>
	
</head>
<body>
<script type="text/javascript">
seajs.use("<?php echo $config['path'] ?>/lib/config/config",function(s){
	seajs.use("<?php echo $config['path'] ?>/scripts/test/test",function(s){
		
	});
})
</script>
</body>
</html>