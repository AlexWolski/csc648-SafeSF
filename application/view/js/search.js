var categories;
var locations;

function getCategories() {
    var xmlReq = new XMLHttpRequest();

    xmlReq.onload = function() {
        if (xmlReq.status == 200) {
            categories = xmlReq.response
            populateDropdown(categories, "category");
        }
    }

    xmlReq.open('GET', '/categories', true);
    xmlReq.responseType = "json";
    xmlReq.send();
}

function getLocations() {
    var xmlReq = new XMLHttpRequest();

    xmlReq.onload = function() {
        if (xmlReq.status == 200) {
            locations = xmlReq.response
            populateDropdown(locations, "location");
        }
    }

    xmlReq.open('GET', '/locations', true);
    xmlReq.responseType = "json";
    xmlReq.send();
}

function populateDropdown(jsonData, field) {
    if(field === "category")
        var dropDown = document.getElementById("categoryDropDown");
    else if(field === "location")
        var dropDown = document.getElementById("locationDropDown");

    var div = document.createElement("div");
    div.innerHTML = "<a href='javascript:void(0);' onclick=\"selectDropdown('None', '" + field + "')\">None</a>";
    dropDown.appendChild(div);

    for(var i = 0; i < jsonData.length; i++) {
        if(field === "category")
            var selection = jsonData[i].category;
        else if(field === "location")
            var selection = jsonData[i].location;

        div = document.createElement("div");
        div.innerHTML = "<a href='javascript:void(0);' onclick=\"selectDropdown('" + selection + "', '" + field + "')\">" + selection + "</a>";
        dropDown.appendChild(div);
    }
}

function selectDropdown(selection, field) {
    if(field === "category")
        var dropDownButton = "categoryButton";
    else if(field === "location")
        var dropDownButton = "locationButton";

    var button = document.getElementById(dropDownButton);

    if(selection === "None") {
        if(field === "category")
            button.innerHTML = "Categories";
        else if(field === "location")
            button.innerHTML = "Locations";
    }
    else
        button.innerHTML = selection;
}

function search() {
	var xmlReq = new XMLHttpRequest();

	xmlReq.onload = function() {
		if (xmlReq.status == 200)
            createTable(xmlReq.response);
	}

	xmlReq.open('GET', '/search' + getSearchParams(), true);
	xmlReq.responseType = "json";
	xmlReq.send(null);
}

function getSearchParams() {
	var category = document.getElementById("categoryButton").innerHTML;
	var category_id = getIdOfValue(categories, "category", category);

	var location = document.getElementById("locationButton").innerHTML;
	var location_id = getIdOfValue(locations, "location", location);

	var user_entry = document.getElementById("searchBox").value;

	var requestParam = "?"
	var firstParam = true;

	if(category != "Categories") {
		requestParam += "category_id=" + category_id;
		firstParam = false;
	}

	if(location != "Locations") {
		if(!firstParam)
			requestParam += "&";

		requestParam += "location_id=" + location_id;
		firstParam = false;
	}

	if(user_entry != "") {
		if(!firstParam)
			requestParam += "&";
		
		requestParam += "user_entry=" + user_entry;
	}

	return requestParam;
}

function getIdOfValue(jsonData, field, value) {
	for(var i = 0; i < jsonData.length; i++) {
		if(field === "category") {
			if(jsonData[i].category === value)
				return jsonData[i].category_id;
		}
		else if(field === "location") {
			if(jsonData[i].location === value)
				return jsonData[i].location_id;
		}
	}
}

function getValueOfId(jsonData, field, id) {
    for(var i = 0; i < jsonData.length; i++) {
        if(field === "category_id") {
            if(jsonData[i].category_id === id)
                return jsonData[i].category;
        }
        else if(field === "location_id") {
            if(jsonData[i].location_id === id)
                return jsonData[i].location;
        }
    }
}

function createTable(searchResults) {
    var table = document.createElement("table");

    for(var i = 0; i < Math.ceil(searchResults.length); i++)
    {
        var row = table.insertRow(-1);

        var cell = row.insertCell(-1);

                var report = searchResults[i];
                var category = getValueOfId(categories, "category_id", report.category_id);
                var image = "report_images/" + report.report_id + ".jpg";

                if(locations[parseInt(report.location_id) - 1] == null)
                	var location = "";
                else
                    var location = getValueOfId(locations, "location_id", report.location_id);

                cell.innerHTML = "<div onclick=\"viewReports('" + report.report_id + "')\" class='card' style='height=180px'><div class= 'split_right_card'>" +
                                  "<img class='cardImage' style='height:160px' src='" + image + "'></div><div class='split_left_card'><div>" +
                                  category + "</div><div>" +
                                  report.details + "</div><div>" +
                                  location + "</div><div>" +
                                  report.insert_date + "</div><div>" +
                                  report.status + "</div></div>";
    }

    var tableContainer = document.getElementById("table");
    tableContainer.innerHTML = "";
    tableContainer.appendChild(table);
}

function viewReports(report_id) {
    window.location.href = "/reportDetails?report_id=" + report_id;
}