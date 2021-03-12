L.GeoJSON.Alloy = L.GeoJSON.extend({
    options: {
        apiKey: "",
        layerCode: "",
		styleIds:[],
		visualisation: "",
    },
    initialize: function (geojson,options) {	
		L.GeoJSON.prototype.initialize.call(this,geojson, options);
	},
	onAdd: function(map){
		this.getAlloyLayer()
		map.on('moveend', this.getAlloyLayer, this);
	},
	onRemove: function(map){
		//L.LayerGroup.prototype.onRemove.call(this, map);
		this.clearLayers()
		map.off('moveend', this.getAlloyLayer, this);
	},
	getAlloyLayer: function (){
		fetchAlloyLayers = async () =>{
			let geojson=[]
			const tiles = this.options.currentTiles
			const apiKey = this.options.apiKey
			const layerCode = this.options.layerCode
			const visualisation = this.options.visualisation
			const styleIds=this.options.styleIds
			const checkIds = (id) =>{
				return geojson.map(feature => {
					return feature.id
				}).includes(id)
			}
			for (tile of tiles){
				let url = "https://api.uk.alloyapp.io/api/layer/" + layerCode + tile + '/' + visualisation + "?token=" + apiKey
				for (styleId of styleIds){
					console.log(styleIds)
					console.log(styleId)
					
					url += "&styleIds=" + styleId
				}
				const response = await fetch(url);
				const resultsJson = await response.json()
				for (result of resultsJson.results){
					if(!checkIds(result.id)){
						geojson.push(result)
					}
				}
			}
			return geojson
		}
	
		this.computeTiles()
		fetchAlloyLayers().then((geojson)=>{
			this.clearLayers()
			this.addData(geojson)
		})
	},
	getAlloyLayerInfo: function (){
		fetchAlloyLayerInfo = async () =>{
			const layerCode = this.options.layerCode
			const apiKey = this.options.apiKey
			const url = "https://api.uk.alloyapp.io/api/layer/" + layerCode + "/?token=" + apiKey
			let layerInfo = {name: "", code:"", styles: []}
			const response = await fetch(url);
			const responseJson = await response.json()
			const layerName = responseJson.layer.name
			layerInfo.name = layerName
			layerInfo.code = layerCode
			const layerStyles = responseJson.layer.styles
			for (style of layerStyles){
				const styleId = style.id
				const styleName = style.name
				layerInfo.styles.push({name:styleName, id: styleId})
			}
			
			return layerInfo
		}
		fetchAlloyLayerInfo().then((layerInfo)=>{
			console.log(layerInfo)
		})
	},
	//compute visible XYZ levels
	computeTiles: function(){
		const mapBounds=this._map.getBounds();
        const w=mapBounds._southWest.lng;
        const s=mapBounds._southWest.lat;
        const e=mapBounds._northEast.lng;
        const n=mapBounds._northEast.lat;
        let z=this._map.getZoom()
                const merc = new SphericalMercator({size: 256});
        if (z>16){
            z=16
        }
        const xyz = merc.xyz([w,s,e,n],z);
        let x=xyz.minX
        let levels=[]
        while (x <= xyz.maxX) {
            y=xyz.minY
            while(y<=xyz.maxY){
                levels.push('/'+x+'/'+y+'/'+z)
                y+=1
            }
            x+=1
        }
		this.options.currentTiles = levels
		return levels
	},
	getLayerCode: function(){
		const layerCode = this.options.layerCode
		return layerCode
	},
	setLayerCode: function(layerCode){
		this.options.layerCode = layerCode
		this.getAlloyLayer()
		return layerCode
	},
	getStyleIds: function(){
		const styleIds = this.options.styleIds
		return styleIds
	},
	setStyleIds: function(styleIds){
		this.options.styleIds = styleIds
		this.getAlloyLayer()
		return styleIds
	},
	getVisualisation: function(){
		const visualisation = this.options.visualisation
		return visualisation
	},
	setVisualisation: function(visualisation){
		this.options.visualisation = visualisation
		this.getAlloyLayer()
		return visualisation
	},
	getApiKey: function(){
		const apiKey = this.options.apiKey
		return apiKey
	},
	setApiKey: function(apiKey){
		this.options.apiKey = apiKey
		this.getAlloyLayer()
		return apiKey
	}
}) 
L.GeoJSON.alloy = function(e) {
    return new L.geoJSON.alloy(e)
};