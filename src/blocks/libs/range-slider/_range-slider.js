require('../../../../node_modules/jquery-ui/ui/widgets/slider')

$("#range-slider").slider({
	animate: "slow",
	range: true,
	min: 0,
	max: 17000,
	values: [ 5000, 10000 ],
	
	slide : function(event, ui) {    
		$("#range-legend").text(ui.values[0].toLocaleString() + "₽ - " + ui.values[ 1 ].toLocaleString() + "₽");        
	}
});
$( "#range-legend" ).text($("#range-slider").slider("values", 0).toLocaleString() + "₽ - " + $("#range-slider").slider("values", 1).toLocaleString() + "₽");