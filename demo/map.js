$(function(){
	
	const options = {
        center: [39.466206760343404,-0.3780709979705011],
        zoom: 13
	}
	
	const map = L.map('map',options);    
    const voyager = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 21,
        minZoom: 1
    })
    voyager.addTo(map)
	
	const hydrantsCluster = new L.GeoJSON.Alloy(null,{
        onEachFeature: function (feature, layer) {
            layer.bindPopup('<p>Item Id: '+feature.id+'<p>')
        },
        apiKey:'2eb73a23-3210-4165-bd38-2eec252193af',
		layerCode: 'layers_hidrantesEstado_5ee24e989f0570005bfd66f8',
		visualisation: 'cluster',
    }).addTo(map)
	
	const roadNetworkStyle  = {
		"color": "#000000",
		"weight": 1,
		"opacity": 0.65
	};
	
	const roadNetwork = new L.GeoJSON.Alloy(null,{
        onEachFeature: function (feature, layer) {
            layer.bindPopup('<p>Item Id: '+feature.id+'<p>')
        },
		style: roadNetworkStyle,
        apiKey:'2eb73a23-3210-4165-bd38-2eec252193af',
		layerCode: 'layers_calzadas_5ee78e87899b410058f3012b',
		visualisation: 'network',
    }).addTo(map)
	
	const baseLayers = {
		"Carto Voyager": voyager
	}

	const overlays = {
		"Hydrants (cluster)": hydrantsCluster,
		"Roads (network)": roadNetwork
	}

	L.control.layers(baseLayers, overlays).addTo(map);
	
})