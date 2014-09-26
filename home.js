//JSON representing the gym leader's data
var data;
	var url = "http://www.evolvecraft.com/ajax.php?s=minecraft&f=players-online-avatars&preset_id=18527811&server=combined&format=json?callback=?";
	url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="' + url + '"') + '&format=xml';

  function ajaxGetNames(wrapper, regionClass, regionText, gymClass, gymText){
  var cities = initializeCities(wrapper, regionClass, regionText, gymClass, gymText);
  $.ajax({
	dataType: "text",
	url: url,
	success: function(text){
			var xmldoc = $.parseXML(text);
			var names = $(xmldoc).find('body');
			console.log("done");

			for (index = 0; index < names.children().length; index++){
				var nameImage = names.children()[index].innerHTML;
				var nameString = nameImage.split('/')[4];
				nameImage = nameImage.replace('alt=""', 'title=' + nameString);
				
				if (cities.hasOwnProperty(nameString)){

          for (var i = 0; i < cities[nameString].length; i++) {
           var city = "#" + cities[nameString][i];

            $(city).append(nameImage);
            $(city).show();
          };
				}

				
			}
		}
	});
};

  var interval = 1000 * 60 * 5; //5 minutes
  function start(jsonFile, wrapper, regionClass, regionText, gymClass, gymText){
  $.getJSON(jsonFile, function( rawData){
  data = rawData;
ajaxGetNames(wrapper, regionClass, regionText, gymClass, gymText);

});
	  setInterval(function(){ajaxGetNames(wrapper, regionClass, regionText, gymClass, gymText);}, interval);
  }

	function initializeCities(wrapper, regionClass, regionText, gymClass, gymText){
		var wrapper = wrapper || "#wrapper";
		var regionClass = regionClass || "col-md-4";
		var regionText = regionText || " Gym Leaders";
		var gymClass = gymClass || '';
		var gymText = gymText || " Gym: ";

    $(wrapper).html("");
		var cities = new Object();
		for (regionName in data.regions){

			$(wrapper).append('<div class="'+ regionClass +'" id="'+regionName+'"><h3>'+regionName+ regionText+'</h3></div>')

			for (n = 0; n < data.regions[regionName].cities.length; n++){
				for (key in data.regions[regionName].cities[n]){

			$("#" + regionName).append('<div class="' + gymClass +'" id="'+key+'">'+ "#"+ (n+1) +  key+ gymText + '<p></p></div>')
			$('#' + key).hide();

					for (i =0 ; i < data.regions[regionName].cities[n][key].leaders.length; i++){
						var name = data.regions[regionName].cities[n][key].leaders[i];

			            if (cities[name] == undefined){
			              cities[name] = [key];
			            }
			            else{
			              cities[name].push(key);
			            }
					}

					var format   = data.regions[regionName].cities[n][key].format || "(none)";
					var levelCap = data.regions[regionName].cities[n][key].levelCap || "(none)";

					clickAction("#" + key, "p", "Format: " + format + " Level Cap:" + levelCap);


				}
			}
		}

    return cities;
    };


    function clickAction(id, sub, text){
    	$(id).click(function(){
    		if ($(this).find(sub).text().length == 0)
    			$(id).find(sub).text(text);
    		else
    			$(id).find(sub).text('');
    	});
    }