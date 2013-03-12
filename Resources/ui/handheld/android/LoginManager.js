//FirstView Component Constructor
function LoginManager() {

	var winTitle = Titanium.UI.createLabel({
		color:'white',
		text:'Laulima',
		textAlign:'center',
		font:{fontFamily:'Dakota', fontSize:'26pt'}		
	});

	var self = Ti.UI.createWindow({
		backgroundImage:'background@2x.png',
		visible:true,
		title:'Laulima',
		barColor:'#004b2d'
	});
	self.setTitleControl(winTitle);

	var txtUsername = Ti.UI.createTextField({
		color:'black',
		hintText:'USERNAME',
		backgroundColor:'white',
		autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
		autocorrect: false,
		top:0,
		width:'100%',
		paddingLeft:9,
		height:44,
		font:{fontFamily:'Optima',fontSize:'19pt'},
	})
	self.add(txtUsername);
	
	var txtPassword = Ti.UI.createTextField({
		color:'black',
		hintText:'PASSWORD',
		backgroundColor:'white',
		autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
		autocorrect: false,
		top:59,
		width:'100%',
		paddingLeft:9,
		height:44,
		font:{fontFamily:'Optima',fontSize:'19pt'},
		passwordMask:true
	})
	self.add(txtPassword);
	
	var sondhLogo = Ti.UI.createImageView({
		image:'UHM_Nursing_mobile_banner.png',
		top:311
	})
	self.add(sondhLogo);

	// Switch to store user data
	var switchLabel = Ti.UI.createLabel({
		top:122,
		left:100,
		text:'Save Login',
		color:'white',
		font:{fontFamily:'Optima',fontSize:'18pt'}
	});
	self.add(switchLabel);
	
	var basicSwitch = Ti.UI.createSwitch({
		value:true, // mandatory property for iOS
		left:15, 
		top:121
	});
	self.add(basicSwitch);
	
	basicSwitch.addEventListener('change',function(e){
		Ti.API.info('Switch value: ' + basicSwitch.value);
	});
	
	// submit credentials
	var btnSubmitCreds = Ti.UI.createButton({
		backgroundColor:'white',
		color:'#0d4e32',
		right:15,
		top: 118,
		width: 90,
		height:34,
		title:'SIGN IN',
		font:{fontFamily:'Optima',fontSize:'16pt'},
		style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
	})
	self.add(btnSubmitCreds);
	
	//Add behavior for UI
	btnSubmitCreds.addEventListener('click', function() {
	
		// Hide keyboard if it's still up
		txtUsername.blur();
		txtPassword.blur();

		// create module to gather and store data on demand
		var dataInit = require('dataInitialization');
		nursApp.system.activityIndicator.show();
		
		// store the UN & PW for future requests
	    Ti.API.info('Store UN & PW');
	    nursApp.userData.username = txtUsername.value;
	    nursApp.userData.password = txtPassword.value;
		
		dataInit.getLaulimaData(txtUsername.value, txtPassword.value);
		
		// Store values if remember is toggled to yes, otherwise clear.
		if(basicSwitch.value != true)
		{
			nursApp.userData.storeUserId = basicSwitch.value;
			txtUsername.value = '';
			txtPassword.value = '';			
		} else {
			nursApp.userData.storeUserId = basicSwitch.value;
		}
		
		btnSubmitCreds.backgroundColor = 'white';
		btnSubmitCreds.color = '#0d4e32';
	});
	
	btnSubmitCreds.addEventListener('touchstart', function() {
		btnSubmitCreds.backgroundColor = '#e6e7e8';
		btnSubmitCreds.color = '#a7a9ac';
	});

	return self;
}
module.exports = LoginManager;





