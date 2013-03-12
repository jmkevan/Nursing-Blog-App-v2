// selfcalling function to create the UI
(function() {
	// extension of the app's namespace
	nursApp.ui = {
		loginView:undefined,
		blogEntryView:undefined,
		blogSelectionView:undefined
	};
	
	nursApp.ui.createLoginManagerView = function(){
		var LoginManager = require('ui/handheld/LoginManager');
		nursApp.ui.loginView = new LoginManager();	
	};

	nursApp.ui.closeLoginManagerView = function(){
		if(nursApp.ui.loginView != undefined)
		{
			nursApp.navGroup.close(nursApp.ui.loginView);	
		}
	};

	nursApp.ui.closeBlogEntryView = function(){
		if(nursApp.ui.blogEntryView != undefined)
		{
			nursApp.navGroup.close(nursApp.ui.blogEntryView);
			nursApp.ui.blogEntryView = undefined;
		}
	};

	nursApp.ui.closeBlogSelectionView = function(){
		if(nursApp.ui.blogSelectionView != undefined)
		{
			nursApp.system.deleteUserData();	
			nursApp.navGroup.close(nursApp.ui.blogSelectionView);
			nursApp.ui.blogSelectionView = undefined;
		}
	}

	nursApp.ui.createBlogSelectionView = function(){
		var blogSel = require('ui/handheld/blogSelection');
		blogSel.selBlog();
	};
	
	nursApp.ui.createBlogEntryView = function(e){
		var blogEntry = require('ui/handheld/blogEntry');
		blogEntry.blogEntry(e);
	};
			
	nursApp.ui.createApplicationWindow = function(){
		nursApp.ui.createLoginManagerView();

		//Here's the nav group that will hold them both...
		nursApp.navGroup = Ti.UI.iPhone.createNavigationGroup({
			window:nursApp.ui.loginView,
		});

		//create component instance
		var appWindow = Ti.UI.createWindow({
			barColor:'#004b2d'
		});
		
		appWindow.add(nursApp.navGroup);
		appWindow.add(nursApp.system.activityIndicator);

		if (nursApp.system.checkForProp == true)
		{
			Ti.API.info('Prop exists');
			nursApp.ui.createBlogSelectionView();
		} else {
			Ti.API.info('Prop doesnt exist');
		}
		
		appWindow.open();		
		
		return appWindow;
	};
	
})();


// FOR TESTING PLATFORMS WHEN READY
/*
	//determine platform and form factor and render approproate components
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	
	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	
	var Window;
	
	if (isTablet) {
		Window = require('ui/tablet/ApplicationWindow');
		alert('isTablet = true');
	}
	else {
		// Android uses platform-specific properties to create windows.
		// All other platforms follow a similar UI pattern.
		if (osname === 'android') {
			Window = require('ui/handheld/android/ApplicationWindow');
			alert('android = true');
		}
		else {
			Window = require('ui/handheld/ApplicationWindow');
			alert('iOS = true');
		}
	}
*/