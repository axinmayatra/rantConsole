var api
if(typeof chrome != 'undefined')
 api = chrome;
if(typeof browser != 'undefined')
	api = browser

console.log('running worker...');

api.commands.onCommand.addListener(function(command) {
	console.log('Command:', command);
	api.tabs.query({active: true, currentWindow: true}, function(tabs) {
		api.tabs.sendMessage(tabs[0].id, {command: command}, function(response) {
			console.log(response);
		});
	});
});