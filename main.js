const Store = require('electron-store');
const store = new Store();

var memoire;
var key = "BTC";

//Service Rest
function httpGet(theUrl) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", theUrl, false); // false for synchronous request
	xmlHttp.send(null);
	return xmlHttp.responseText;
}

//recupère memoire
function getMem() {
	//console.log(store.get(key));
	if (store.has(key)) {
		memoire = JSON.parse(store.get(key));
	} else {
		memoire = [];
	}

}


//affecte  la memoire
function setMem() {
	store.set(key, JSON.stringify(memoire));
	//console.log(store.get(key));
}


function add(value) {
	memoire[Object.keys(memoire).length] = value;
	setMem();
	genTable();
}

function del(pos) {
	memoire.splice(pos, 1);
	setMem();
	genTable();
}

function update(pos, value) {
	memoire.splice(pos, 1, value);
	setMem();
	genTable();
}

function createValue(libelle, prix, unite) {
	nVal = {
		"libelle": "",
		"prix": 0,
		"unite": 0
	};

	nVal.libelle = libelle;
	nVal.prix = prix;
	nVal.unite = unite;

	return nVal;

}

function saveNewValue() {
	iLibelle = document.getElementById('inputLibelle').value;
	iPrix = document.getElementById('inputPrix').value;
	iUnite = document.getElementById('inputUnite').value;

	nVal = createValue(iLibelle, iPrix, iUnite);

	add(nVal);

	//reset value
	document.getElementById('inputLibelle').value = null;
	document.getElementById('inputPrix').value = null;
	document.getElementById('inputUnite').value = null;
}


function inputUpdateValue(pos) {
	document.getElementById('updatePos').value = pos;
	document.getElementById('updateLibelle').value = memoire[pos].libelle;
	document.getElementById('updatePrix').value = memoire[pos].prix;
	document.getElementById('updateUnite').value = memoire[pos].unite;

	$("#modalUpdate").modal("show");
}


function saveUpdateValue() {
	pos = document.getElementById('updatePos').value;
	iLibelle = document.getElementById('updateLibelle').value;
	iPrix = document.getElementById('updatePrix').value;
	iUnite = document.getElementById('updateUnite').value;

	nVal = createValue(iLibelle, iPrix, iUnite);

	update(pos, nVal);
}

function GoBTC() {
	key = "BTC"
	getMem();
	genTable();
}

function GoETH() {
	key = "ETH"
	getMem();
	genTable();
}

function GoLTC() {
	key = "LTC"
	getMem();
	genTable();
}

function genTable() {
	dest = document.getElementById('outTable');
	valTaux = parseFloat(document.getElementById('currValue').innerHTML);

	totPAchat = 0;
	totUnite = 0;
	totVal = 0;
	totPG = 0;

	htmlTable = "<table class='table table-bordered'>";
	htmlTable = htmlTable + "	<tr>	<th>Libelle</th>	<th>P Ach</th>	<th>U obt</th>	<th>Val actu</th>	<th>P&amp;G</th>	</tr>";
	for (l in memoire) {
		vAct = memoire[l].unite * valTaux;
		perteEtGain = (memoire[l].unite * valTaux) - memoire[l].prix;

		htmlTable = htmlTable + "<tr>";
		htmlTable = htmlTable + "<td> <span onClick='del(" + l + ")'>[x] </span> <span onClick='inputUpdateValue(" + l + ")'>" + memoire[l].libelle + "</span></td>";
		htmlTable = htmlTable + "<td>" + memoire[l].prix + "</td>";
		htmlTable = htmlTable + "<td>" + memoire[l].unite + "</td>";
		if (perteEtGain > 0) {
			htmlTable = htmlTable + "<td style='color:#0F0;'>" + vAct + "</td>";
			htmlTable = htmlTable + "<td style='color:#0F0;'>" + perteEtGain + "</td>";
		} else {
			htmlTable = htmlTable + "<td style='color:#F00;'>" + vAct + "</td>";
			htmlTable = htmlTable + "<td style='color:#F00;'>" + perteEtGain + "</td>";
		}
		htmlTable = htmlTable + "</tr>";

		//calcul pour total
		totPAchat = totPAchat + parseFloat(memoire[l].prix);
		totUnite = totUnite + parseFloat(memoire[l].unite);
		totVal = totVal + parseFloat(vAct);
		totPG = totPG + parseFloat(perteEtGain);

	}

	//ligne total
	htmlTable = htmlTable + "<tr>";

	htmlTable = htmlTable + "<th>TOTAL :</th>";
	htmlTable = htmlTable + "<th>" + totPAchat + "</th>";
	htmlTable = htmlTable + "<th>" + totUnite + "</th>";
	if (totPG > 0) {
		htmlTable = htmlTable + "<th style='color:#0F0;'>" + totVal + "</th>";
		htmlTable = htmlTable + "<th style='color:#0F0;'>" + totPG + "</th>";
	} else {
		htmlTable = htmlTable + "<th style='color:#F00;'>" + totVal + "</th>";
		htmlTable = htmlTable + "<th style='color:#F00;'>" + totPG + "</th>";
	}


	htmlTable = htmlTable + "</tr>";

	htmlTable = htmlTable + "</table>";
	dest.innerHTML = htmlTable;
}

//-----------------RUN-----------------

getMem();
genTable();
