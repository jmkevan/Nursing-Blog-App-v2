exports.selBlog = function () {
	nursApp.system.activityIndicator.hide();

	var btnLeft = Ti.UI.createButton({
		//backgroundImage:'white_arrow.png',
		title:'Log Out'
		//width:19,
		//height:44
	});

	var winTitle = Titanium.UI.createLabel({
		color:'white',
		text:'Blogs',
		textAlign:'center',
		font:{fontFamily:'Dakota', fontSize:'22pt'}		
	});
	
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createWindow({
		backgroundImage:'background@2x.png',
		leftNavButton:btnLeft,
		visible:true,
		layout:'vertical',
		title:'Blogs',
		barColor:'#004b2d'
	});
	self.setTitleControl(winTitle);
	
	nursApp.ui.blogSelectionView = self;

	btnLeft.addEventListener('click', function(){
		nursApp.ui.closeBlogSelectionView();
	});
	
	var tblData = [];
	Ti.API.info('The length of the blog selection loop: '+ nursApp.userData.blogList.length);
	
	for (var x=0; x < nursApp.userData.blogList.length; x++)
	{
		
		var buttonTitle;
		
		if(nursApp.userData.classes[nursApp.userData.blogList[x]].shortDescription == '' || nursApp.userData.classes[nursApp.userData.blogList[x]].shortDescription == null)
		{
			buttonTitle = nursApp.userData.classes[nursApp.userData.blogList[x]].entityId;
		} else {
			buttonTitle = nursApp.userData.classes[nursApp.userData.blogList[x]].shortDescription;
		}
		
		var row = Ti.UI.createTableViewRow({
			title:buttonTitle,
			font:{fontFamily:'Optima',fontSize:'20pt'},
			rightImage:'green_arrow.png',
			blogId:x
		});
		
		row.addEventListener('click', nursApp.ui.createBlogEntryView);
		tblData.push(row);
	}

	var blogTable = Titanium.UI.createTableView({
		data:tblData,
		rowHeight:44,
		seperatorColor:'transparent'
	});
	
	self.add(blogTable);
	nursApp.navGroup.open(self);
}
