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
        apiKey:'d9d654bb-7275-4914-8afe-a9c6680f0fc6',
		layerCode: 'layers_hidrants_606dc3fe2a27ba000abe22b0',
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
        apiKey:'d9d654bb-7275-4914-8afe-a9c6680f0fc6',
		layerCode: 'layers_eixosValncia_606dc3ce14780b000b8449c2',
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