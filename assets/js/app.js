// declarar un arreglo que contenga los asientos del avión con false (están vacíos
// ocupado = true

var airlineSeats = [
false,
false,
false,
false,
false,
false,
false,
false,
false,
false,
];

//contador para rastrear el número de asientos ocupados
var busySeats = 0;

var paintSeats = function(array) {
	var containerSeats = document.getElementById('seats');

	for(var i = 0; i < array.length; i++) {
		var seat = document.createElement('div');
		seat.className = 'seats';

		//del primer elemento al cuarto, en nuestro arreglo va a ser Primera Clase, que sería de color cyan
		if(i < 4) {
			seat.style.background = 'cadetblue';
		} else {
			seat.style.background = 'lightsalmon';
		}
		containerSeats.appendChild(seat);
	}

};

var reserve = function() {
	var btn = document.getElementById('btn');
	btn.addEventListener('click', chooseZone);
};

var chooseZone = function() {
	var choice = prompt('Bienvenido :) \n ¿En qué zona prefieres reservar? \n 1. Primera clase \n 2. Clase económica \n \n Por favor, ingresa el número de tu preferencia');
	if(choice == 1) {
		checkFirstClassZone();
	} else if (choice == 2) {
		checkEconomicZone();
	} else {
		alert('Por favor ingresa un número válido.')
	}
};

var checkFirstClassZone = function () {
	var zone = 'Primera Clase';
	//recorre del elemento 0 al tercer elemento y verifica su estado
	for (var j = 0; j < 4; j++) {
		if(airlineSeats[j] == false) {
			airlineSeats[j] = true;
			//al reservar un asiento, no necesita seguir recorriendo el arreglo
			reserveSeat(j);
			printTicket(j, zone);
			busySeats++;
			break;
		} else if(j === 3 && airlineSeats[j] == true) {
			reasignEconomicZone(zone);
		}
	}
};

var checkEconomicZone = function() {
	var zone = 'Clase Económica';
	for (var j = 4; j < 10; j++) {
		if(airlineSeats[j] == false) {
			airlineSeats[j] = true;
			reserveSeat(j);
			printTicket(j,zone);
			busySeats++;
			break;
		} else if(j == 9 && airlineSeats[j] == true) {
			reasignFirstClassZone(zone);
		}
	}
};

var reserveSeat = function (indexToPaint) {
	var seat = document.getElementsByClassName('seats');
	seat[indexToPaint].textContent = 'Ocupado'
}

var reasignEconomicZone = function(zone) {
	if(busySeats == 10) {
		noSeats();
		nextFlight();
	} else {
		var reasign = confirm('Ya no quedan asientos disponibles en ' + zone + ' :( \n ¿Quieres reservar en zona económica?');
		if(reasign == true) {
			checkEconomicZone();
		} else {
			nextFlight();
		}
	}
};

var reasignFirstClassZone = function(zone) {
	if(busySeats == 10) {
		noSeats();
		nextFlight();
	} else {
		var reasign = confirm('Ya no quedan asientos disponibles en ' + zone + ' :( \n ¿Quieres reservar en primera clase?');
		if(reasign == true) {
			checkFirstClassZone();
		} else {
			nextFlight();
		}
	}
};

var printTicket = function(j, zone) {
	var containerTickets = document.getElementById('tickets');
	var ticket = document.createElement('div');
	ticket.className = 'seats busy';
	var title = document.createElement('p');
	title.textContent = 'PASE DE ABORDAR';
	var reservedSeating = document.createElement('p');
	reservedSeating.textContent = 'N° de asiento: ' + (j + 1);
	var zoneClass = document.createElement('p');
	zoneClass.textContent = zone;
	ticket.appendChild(title);
	ticket.appendChild(reservedSeating);
	ticket.appendChild(zoneClass);
	containerTickets.appendChild(ticket);
};

var nextFlight = function() {
	alert('¡El próximo vuelo sale en tres horas!')
}

var noSeats = function() {
	alert('Lo sentimos :( \nYa no quedan asientos disponibles en este vuelo.')
}

paintSeats(airlineSeats);
reserve();
 