
function getRandomInteger(lower,upper){
	
	// R = parseInt(rnd * (upper - (lower - 1)) + lower;
	var multiplier = upper - (lower - 1);
	var rnd = parseInt(Math.random() * multiplier) + lower;
	
	return rnd;
}
// function display(numdie){
//     updateStats()

// }
function deleteAllStats(){
	var x = statsTable.rows.length;
    while(x>1){
		x--;
		statsTable.deleteRow(x);

	}
	
	
}
function deleteAllCumulativeStats(){
	var x = diceTable.rows.length;
    while(x>2){
		x--;
		diceTable.deleteRow(x);

	}
}
function updateStats(numdice){
    if(numdice==1){
        deleteAllStats();
        addStat("Mean",mean);
		addStat("Median",median);
		addStat("Mode",mode);
        updateStat(numdice);
		// addStat("Doubles",doubles);
		// addStat("Triples",triples);
    }else if(numdice==2){
        deleteAllStats();
        addStat("Mean",mean);
		addStat("Median",median);
		addStat("Mode",mode);
		addStat("Doubles",doubles);
		updateStat(numdice);

    } else if(numdice==3){
        deleteAllStats();
        addStat("Mean",mean);
		addStat("Median",median);
		addStat("Mode",mode);
		addStat("Doubles",doubles);
		addStat("Triples",triples);
		updateStat(numdice);

    }
}
function addStat(statname,stat){
	
	var newrow = statsTable.insertRow();
	var newcell = newrow.insertCell();
	newcell.innerHTML = statname
	var newcell = newrow.insertCell();
	newcell.innerHTML = stat;
}
function updateStat(dice){
	var counter = dice-1;
	while(counter<dice*6){
		counter++;
		var statnamex = "Frequency: " + counter;
		addStat(statnamex,frequencies[counter]);
	}
			
		


}
function clearLog(){
	var x = document.getElementById("eventlog");
	x.innerHTML="";
}
function rollDie(dice,numRolls){
	console.log("rolled" + dice);
	var log=  document.getElementById("eventlog");
	rollNum++;
	log.innerHTML="";
	log.innerHTML+="Roll# " + rollNum+" data is currently being shown in Statistics Table"+"</br>";
	deleteAllStats();
	var totalup  =0;
	var totaldiv = 0;
	var results = [];
	var dieoneres = [];
	var dietwores = [];
	var diethreeres = [];
	var newrow = diceTable.insertRow();
	var newcell = newrow.insertCell();
	newcell.innerHTML = "Start Roll "+rollNum;
	var startRoll = newrow.insertCell();
	startRoll.innerHTML="Start Roll "+rollNum;
	var secondie = newrow.insertCell();
	var thirddie = newrow.insertCell();
	secondie.innerHTML="Start Roll "+rollNum;
	thirddie.innerHTML="Start Roll "+rollNum;
	totalrolls=0
	for(var i = 0; i<numRolls;i++){
		totalrolls++;
		var dieRoll = getRandomInteger(1,6);
		var dieRollTwo = getRandomInteger(1,6);
		var dieRollThree = getRandomInteger(1,6);
		var newrow = diceTable.insertRow()
		var newcell = newrow.insertCell();
		newcell.innerHTML = "Roll: " + (totalrolls);
		var newcell = newrow.insertCell();
		newcell.innerHTML = dieRoll;
		var secondie = newrow.insertCell();
		var thirddie = newrow.insertCell();
		totalup+=dieRoll;
		totaldiv++;
		results.push(dieRoll);
		dieoneres.push(dieRoll);
		if(dice==2){
			totalup+=dieRollTwo;
			totaldiv++;
			secondie.innerHTML = dieRollTwo;
			results.push(dieRollTwo);
			dietwores.push(dieRollTwo);
		} else if(dice==3){
			totalup+=dieRollThree;
			totaldiv++;
			secondie.innerHTML = dieRollTwo;
			thirddie.innerHTML = dieRollThree;
			results.push(dieRollTwo);
			results.push(dieRollThree);
			dietwores.push(dieRollTwo);
			diethreeres.push(dieRollThree);
		}
	}

	frequencies = freqRet(dice,dieoneres,dietwores,diethreeres);
	

	
	mode = modeget(results);
	var sortedresults = results.sort();
	median = sortedresults[Math.ceil(sortedresults.length/2)];
	mean = precise(totalup / totaldiv);

	updateStats(dice);

}
function rollDice(){
	var values = document.getElementById("inputform");
	var numdie = values.dicenum.value;
	var numrolls = values.numoftimesroll.value;
	rollDie(numdie,numrolls);

}

function modeget(numarray){
	var all = [0,0,0,0,0,0,0];
	for(var x = 0;x<numarray.length;x++){
		all[numarray[x]]++;
	}
	var prevmax = 0;
	var whichone = 0;
	for(var i = 0;i<all.length;i++){
		if(all[i] > prevmax){
			prevmax = all[i];
			whichone = i;
		}
	}
	return whichone;
}
function freqRet(dice,arrayone,arraytwo,arraythree){
	var doublesx = 0;
	var triplesy = 0 ;

	if(dice==1){
		console.log("we know dice one");
		var results = [0,0,0,0,0,0,0];

		for(var result = 0;result<arrayone.length;result++){
			results[arrayone[result]]++;
		}
	} else if(dice==2){
		var results = [0,0,0,0,0,0,0,0,0,0,0,0,0];
		for(var result = 0;result<arrayone.length;result++){
			var combined = arrayone[result] + arraytwo[result];
			if(arrayone[result] == arraytwo[result]){doublesx++;}
			results[combined]++;
			
		}
	} else if(dice==3){
		var results = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		for(var result=0;result<arrayone.length;result++){
			var combined = arrayone[result] + arraytwo[result] + arraythree[result];
			if(arrayone[result] == arraytwo[result]){doublesx++;}
			else if(arrayone[result] == arraythree[result]){doublesx++;}
			else if(arraytwo[result] == arraythree[result]){doublesx++;}
			if((arrayone[result] == arraythree[result]) && (arraytwo[result] == arraythree[result])){triplesy++;}
			results[combined]++;
		}
	}
	doubles+=doublesx;
	triples+=triplesy;
	return results
}
function precise(x) {
	return Number.parseFloat(x).toFixed(2);
  }