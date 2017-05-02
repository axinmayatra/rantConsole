// console.log('Testing rantConsole');
// fetch('//thoughtsoncoding.com/api/1.0/random.json')
var api
if(typeof chrome != 'undefined')
 api = chrome;
if(typeof browser != 'undefined')
	api = browser

api.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // console.log("from the extension",request);
		if(request.command === 'getRant')
			getRant();
		if(request.command === 'resetRant')
			resetRant();
		sendResponse('Recived!');
  });

function resetRant() {
	localStorage.setItem("rantSkip", '0');	
}

function getRant() {
	var a = localStorage.getItem("rantSkip");
	console.log('skiping '+(a?a:0)+' rant...');
	fetch('https://www.devrant.io/api/devrant/rants?app=3&limit=1&skip='+a)
	.then(x=>x.json())
	.then((x)=>{
		console.log(x.rants[0].text);
		if(a){
			a++;
			localStorage.setItem("rantSkip", a);
		}
		else{
			localStorage.setItem("rantSkip", "1");
		}
	})
	.catch((e)=>{
		console.log('error in fetching rant',e);
	});
}