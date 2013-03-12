/*
 * Single Window Application Template:
 * A basic starting point for your application.  Mostly a blank canvas.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *  
 */


//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');	  	
}

// create an object literal to be the app's namespace
var nursApp = {
	navGroup : undefined
};

nursApp.userData = {
	sessionID: undefined,
	blogId: [],
	blogPrivacySetting: 'group',
	classList: [],
	blogList: [],
	username: undefined,
	password: undefined,
	userId: undefined,
	appWindow: undefined,
	storeUserId: undefined
};

nursApp.system = {
	storeUserData : function()
	{
		Ti.API.info('storing user data');
		Ti.App.Properties.setString("userData", JSON.stringify(nursApp.userData));
	},
	
	retrieveUserData : function()
	{
		Ti.API.info('retrieving user data');
		nursApp.userData = JSON.parse(Ti.App.Properties.getString('userData'));
	},
	
	deleteUserData : function()
	{
		Ti.API.info('deleting user data');
		
		nursApp.userData.sessionID = undefined;
		nursApp.userData.blogId = [];
		nursApp.userData.blogPrivacySetting = 'group';
		nursApp.userData.classList = [];
		nursApp.userData.blogList = [];
		nursApp.userData.username = undefined;
		nursApp.userData.password = undefined;
		nursApp.userData.userId = undefined;
	
		Ti.App.Properties.removeProperty('userData');
	},
	
	checkForProp : function()
	{
		if(Ti.App.Properties.hasProperty('userData'))
		{
			Ti.API.info('The property exists');
			alert('User data exists');
			return true;
		} else {
			Ti.API.info('The property doesnt exist');
			alert('User data doesnt exist');
			return false;
		}
	},
	
	activityIndicator : Ti.UI.createActivityIndicator({
		color: 'white',
		font: {fontFamily:'Helvetica Neue', fontSize:20, fontWeight:'bold'},
		style:Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
		height:'auto',
		width:'auto'
	}),
	
	lastAccess : null,
	
	isSessionActive : function()
	{
		Ti.API.info('checking isSessionActive');
		if(nursApp.system.lastAccess != null)
		{
			var timeStamp = new Date();
			var sessionDifference = timeStamp.getTime() - nursApp.system.lastAccess
			
			// If the last session was never stored, or greater than 9 minutes ago, get a new sessionId
			if(sessionDifference > 540000)	
			{
				Ti.API.info('isSessionActive = false');
				return false;
			} 
				else // Use the current sessionId 
			{
				Ti.API.info('isSessionActive = true');
				return true;
			}
		} else {
			Ti.API.info('isSessionActive = false');
			return false;
		}
	},

	updateSessionTime : function()
	{
		Ti.API.info('updating the session time');
		// Store the last time Laulima was accessed successfully
		var timeStamp = new Date();
		nursApp.system.lastAccess = timeStamp.getTime();
	},
	
	initCounter : 0
};

nursApp.userData.classes = {};

// include libraries
Ti.include('ui/handheld/ui.js');

// Hide the status bar
Titanium.UI.iPhone.hideStatusBar();

// instantiate and open the main UI component of our app
nursApp.mainWindow = nursApp.ui.createApplicationWindow();


