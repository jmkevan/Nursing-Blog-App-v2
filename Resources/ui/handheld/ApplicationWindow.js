//Application Window Component Constructor
function ApplicationWindow() {
	//load component dependencies
	var LoginManager = require('ui/common/LoginManager');
		
	//create component instance
	var self = Ti.UI.createWindow({
		title:'Clinical Reports'
	});
		
	//construct UI
	var loginManager = new LoginManager();
	self.add(loginManager);
	
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
