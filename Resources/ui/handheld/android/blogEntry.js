function restError()
{
	alert('Could not connect to Laulima');
}

function blogResponse(rawData)
{
	Ti.API.info('Blog Post Response: ' + rawData);
}
//FirstView Component Constructor
exports.blogEntry = function(e) {
	
	Ti.API.info('in blogResponse');
	
	var btnLeft = Ti.UI.createButton({
		backgroundImage:'white_arrow.png',
		title:' ',
		width:19,
		height:44
	});

	var winTitle = Titanium.UI.createLabel({
		color:'white',
		text:e.source.title,
		textAlign:'center',
		font:{fontFamily:'Dakota', fontSize:'22pt'}		
	});
	
	var self = Ti.UI.createWindow({
		backgroundImage:'background@2x.png',
		barColor:'#004b2d',
		leftNavButton:btnLeft,
		visible:true,
		layout:'vertical'
	});
	self.setTitleControl(winTitle);
	
	btnLeft.addEventListener('click', function(){
		nursApp.ui.closeBlogEntryView();
		txtBlogTextArea.value = '';
		txtBlogTitle.value = '';
	});
	
	var wrapper = Ti.UI.createScrollView({
		top:0,
		contentHeight:'auto',
		layout: 'vertical',
		height:352
	});

	var flexSpace = Titanium.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});

	var btnDone = Ti.UI.createButton({
		title:'Done',
		style:Ti.UI.iPhone.SystemButtonStyle.BORDERED
	});
	
	var toolbar = Ti.UI.iOS.createToolbar({
		items:[flexSpace, btnDone],
		bottom:0,
		borderTop:true,
		borderBottom:false,
		height:Ti.UI.SIZE,
		barColor : '#004b2d'
	});
	
	btnDone.addEventListener('click', function(e){
		txtBlogTextArea.blur();
		txtBlogTitle.blur();
	});
	
	var txtBlogTitle = Ti.UI.createTextField({
		color:'black',
		backgroundColor:'white',
		autocorrect: false,
		top:0,
		width:Ti.UI.FILL,
		paddingLeft:8,
		height:44,
		font:{fontFamily:'Optima',fontSize:'17pt'},
		keyboardToolbar : toolbar
	})
	wrapper.add(txtBlogTitle);
	
	var txtBlogTextArea = Ti.UI.createTextArea({
		color:'black',
		backgroundColor:'white',
		autocorrect: false,
		top: 15,
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		paddingLeft:8,
		font:{fontFamily:'Optima',fontSize:'17pt'},
		suppressReturn:false,
		keyboardToolbar : toolbar
	})
	wrapper.add(txtBlogTextArea);
	self.add(wrapper);
	
	if(e.source.title == "Nurs 450 - Fall '12")
	{
		Ti.API.info('Put in example text');
		txtBlogTitle.value = 'ex: Chow Project - 2 hours';
		txtBlogTextArea.value = 'ex: Spent time with 4 clients \nLearned about needle exchange program \nMy reflective lesson is not to judge other people';	
	}

	
	var buttonWrapper = Ti.UI.createView({
		title:''
	});
	
	// submit credentials
	var btnClear = Ti.UI.createButton({
		backgroundColor:'white',
		color:'#0d4e32',
		left:15,
		top: 15,
		width: 90,
		height: 34,
		title:'CLEAR',
		font:{fontFamily:'Optima',fontSize:'14pt'},
		style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
	})
	buttonWrapper.add(btnClear);
	
	btnClear.addEventListener('click', function() {
		txtBlogTextArea.value = '';
		txtBlogTitle.value = '';
		btnClear.backgroundColor = 'white';
		btnClear.color = '#0d4e32';
	});
	
	btnClear.addEventListener('touchstart', function() {
		btnClear.backgroundColor = '#e6e7e8';
		btnClear.color = '#a7a9ac';
	});
	
	// submit credentials
	var btnSubmitBlog = Ti.UI.createButton({
		backgroundColor:'white',
		color:'#0d4e32',
		right:15,
		top: 15,
		width: 90,
		height:34,
		title:'POST',
		font:{fontFamily:'Optima',fontSize:'14pt'},
		style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
	})
	buttonWrapper.add(btnSubmitBlog);

	btnSubmitBlog.addEventListener('touchstart', function() {
		btnSubmitBlog.backgroundColor = '#e6e7e8';
		btnSubmitBlog.color = '#a7a9ac';
	});
	self.add(buttonWrapper);
	//Add behavior for UI
	btnSubmitBlog.addEventListener('click', function() {
		// send RESTful request
		var restCall = require('postRequest');
		
		var url = 'https://laulima.hawaii.edu/direct/blog-entry?sakai.sessionId=' + nursApp.userData.sessionID + 
		"&blog.id=" + nursApp.userData.blogId[e.source.blogId] + "&text=" + txtBlogTextArea.value + 
		"&title=" + txtBlogTitle.value + "&privacySetting=" + nursApp.userData.blogPrivacySetting;
		
		Ti.API.info('URL being sent: ' + url);
		
		Ti.API.info('Checking is session is active before ending blog post');
		if(nursApp.system.isSessionActive())
		{
			Ti.API.info('Session is active, send post');
			restCall.RESTfulCall('POST', url, restResponse, restError);
		} else {
			// Call the session update and pass in the previously listed function
			Ti.API.info('Session is not active, get new session then send post');
			restCall.newLaulimaSession(restCall.RESTfulCall('POST', url, restResponse, restError));
		}

		btnSubmitBlog.backgroundColor = 'white';
		btnSubmitBlog.color = '#0d4e32';
	});

	nursApp.ui.blogEntryView = self;
	nursApp.navGroup.open(self);
}

function restResponse(rawData)
{
	// Create window/view so it closes on exit
	var buttonLabel = Titanium.UI.createLabel({
		text:'OKAY',
		color:'white',
		font:{fontFamily:'Optima',fontSize:'14pt'}
	});
	
	var button = Titanium.UI.createButton({
		Title:'OKAY',
		color:'white',
		font:{fontFamily:'Optima',fontSize:'14pt'},
		backgroundColor:'#0a5738',
		width:90,
		height:34,
		top:182,
		style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN
	});
	button.add(buttonLabel);

	var alertLabel = Titanium.UI.createLabel({
		text:'SUCCESSFULLY UPLOADED!',
		font:{fontFamily:'Optima',fontSize:'16pt'},
		color:'white',
		top:150
	});

	var alertView = Titanium.UI.createView({
	  backgroundColor:'#337359',
	  width:289,
	  height:322,
	  top:59
	});
	alertView.add(alertLabel);
	alertView.add(button);
	
	var transWin = Titanium.UI.createWindow({
		background:'transparent',
		width:Titanium.UI.FILL,
		height:Titanium.UI.FILL,
		exitOnClose: true
	})
	transWin.add(alertView);
	

	button.addEventListener('touchstart', function() {
		button.backgroundColor = 'white';
		buttonLabel.color = '#0a5738';
	});
	
	button.addEventListener('click', function() {
		transWin.remove(alertView);
		transWin.close();
	});	
	
	// attach to main window and show
	nursApp.mainWindow.add(transWin);
	transWin.open();
	
}
//module.exports = blogEntry;
