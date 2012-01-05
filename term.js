
var snd;
var blink_cursor_state = false;
function blink_cursor() {

	$('#term-cursor').html((blink_cursor_state?' ':'_'))
	blink_cursor_state = !blink_cursor_state;
	setTimeout('blink_cursor();', 250);
}
function term_append(text) {
	$('#term-content').append(text);
	$('#term').scrollTop($('#term').height());
}
var type_text_pos = [0,0];
var type_text_str = [
	['LulzBIOS version 1.3.3.7 build &gt;9000\n', 0],
	['Copyleft 1970-2012 Telecomix News Agency International\n', 0],
	['All rights reversed.\n\n', 0],
	['', 1000],
	['Windows not found -- not removing anything.\n', 0],
	['\n', 1600],
	['PXE error: IP over Avian Carriers: protocol not available on this platform!', 0], ['\n', 850],
	['Booting from fax0.\n', 0], ['\n', 1000],
	['Loading kernel', 0],
	['.........................', 80],
	['Done\n', 0],
	['Initializing cryptography subsystems...', 0],
	['\n * public-key crypto', 0], ['', 500],
	['\n * shared-key crypto', 0], ['', 500],
	['\n * i2p', 0], ['', 500],
	['\n * tor', 0], ['', 500],
	['\nInitializing Cipherspace', 0], ['.......\n', 80],
	['node identification probability: 2^-4', 0], [' ... ', 200],
	['2^-16', 0], [' ... ', 200], ['2^-256', 0], [' ... ', 200], ['2^-320', 0], [' ... ', 200], ['2^-512\n\n', 0],
	['', 1000],
	['\nPRESS "I" TO INITIALIZE COMMUNICATION UPLINK VIA IRC\n', 0],
	['\nSystem booted, have a lot of fun.\n', 0], ['\n', 2000],
	
	['\nTelecomix GNU/TCMB server0.1tbps.org tty1\n\n', 0],
	['cipherspace login: ', 0],
	['', 800],
	['Cameron\n', 100],
	['Cameron@cipherspace password: ', 0],
	['\n', 1300],
	['\n\nCameron@cipherspace:~$ ', 0], ['', 1000], ['cd /var/www/telecomix.pl\n', 100],
	['Cameron@cipherspace:/var/www/telecomix.pl$ ', 0], ['make datalove', 100],
];
function type_text() {
	if (type_text_pos[0]>=type_text_str.length) return;
	if (type_text_str[type_text_pos[0]][0]!='') {
		if (type_text_str[type_text_pos[0]][1]>0) {
			ch = type_text_str[type_text_pos[0]][0].charAt(type_text_pos[1]);
			if (ch=='\n') term_append('<br />'); else term_append(ch);
			type_text_pos[1]++;
		} else {
			term_append(type_text_str[type_text_pos[0]][0].replace(/\n/g, '<br />'));
			type_text_pos[1] += type_text_str[type_text_pos[0]][0].length;
		}
		
		if (type_text_pos[1]>=type_text_str[type_text_pos[0]][0].length) {
			type_text_pos[0]++;
			type_text_pos[1] = 0;
			
		}
		setTimeout('type_text();', type_text_str[type_text_pos[0]][1]);
	} else {
		setTimeout('type_text();', type_text_str[type_text_pos[0]][1]);
		type_text_pos[0]++;
	}
}
function play_sound() {
	snd.play();
}
function check_sound_loaded() {
	if ((snd.readyState==4)/* && ($('#bootup').get(0).networkState==4)*/) start_everything();
	else setTimeout(check_sound_loaded, 500);
}

$(document).ready(function() {
	snd = document.createElement('audio');
	snd.autoplay = false;
	snd.preload = 'auto';
	snd.src = './bootup.oga';
	snd.load();
	$('body').append(snd);
	check_sound_loaded();
});

function start_everything() {
	setTimeout('$("#term").addClass("termbootlogo");', 1200);
	setTimeout('$("#term").removeClass("termbootlogo");', 2200);
	setTimeout('blink_cursor();', 2400);
	setTimeout('type_text();', 2900);
	setTimeout('play_sound();', 10);
}
$(window).keypress(function(event) {
	if (event.charCode=='i'.charCodeAt(0)) window.open('http://chat.werebuild.eu/?channels=telecomix,Polska', 'tcx-irc', '');
	/*event.charCode-48;*/
	//event.preventDefault();
});

