<!doctype html>
<html>
<head>
	<title>Lucky Ball</title>
	<meta charset="utf-8">
	<?php
		$config['path'] = 'http://localhost:8080/web-grunt-seajs/src';
	?>
	<script type="text/javascript">
	window.HEALTH = {
		cdnPath : "<?php echo $config['path'] ?>"
	}
	</script>
	<link rel="stylesheet" type="text/css" href="../styles/app.css">
	<script type="text/javascript" src="<?php echo $config['path'] ?>/lib/sea/sea.js"></script>
	<script type="text/javascript" src="<?php echo $config['path'] ?>/lib/seajs-combo/seajs-combo.js"></script>
</head>
<body>
<script type="text/javascript">
seajs.use("<?php echo $config['path'] ?>/lib/config/config",function(s){
	seajs.use("<?php echo $config['path'] ?>/scripts/test/test",function(s){
		console.log(s);
	});
})
</script>
</body>
</html>