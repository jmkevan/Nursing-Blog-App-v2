function loginError()
{
	nursApp.system.activityIndicator.hide();
	alert('Incorrect username or password');
}

function restError()
{
	nursApp.system.activityIndicator.hide();
	alert('Poor internet conection. Could not connect to Laulima.');
	nursApp.system.deleteUserData();
}

function classError()
{
	alert('No classes listed in Laulima!!');
	nursApp.system.deleteUserData();
}

function blogError()
{
	nursApp.system.activityIndicator.hide();
	alert('You have no classes with blogs!');
	nursApp.system.deleteUserData();
}

function incCount ()
{
	Ti.API.info('incrementing');
	nursApp.system.initCounter = nursApp.system.initCounter + 1;
}

function decCount()
{
	Ti.API.info('decrementing');
	nursApp.system.initCounter = nursApp.system.initCounter - 1;
	
	if(nursApp.system.initCounter === 0)
	{
		Ti.API.info('nursApp.system.initCounter === 0');
		nursApp.system.storeUserData();
		nursApp.ui.createBlogSelectionView();
	}
}

exports.getLaulimaData = function(un, pw)
{
	Ti.API.info('in getLaulimaData');
	// send RESTful request
	var restCall = require('postRequest');
	nursApp.system.activityIndicator.show();
	
	var url = 'https://laulima.hawaii.edu/direct/session/new/?_username=' + un + '&_password=' + pw;
	
	restCall.RESTfulCall('POST', url, postLoginProcess, loginError);
}


function postLoginProcess(rawData)
{
	Ti.API.info('in postLoginProcess');
	var restCall = require('postRequest');
	
    nursApp.userData.sessionID = rawData;
    
    // Get the user's Id, this will be used later for submitting blog entries
    var url = "https://laulima.hawaii.edu/direct/user/" + nursApp.userData.username + ".json?sakai.session=" + rawData;
    restCall.RESTfulCall('GET', url, storeUserId, restError);
    
    // Start blog search
    var surl = "https://laulima.hawaii.edu/direct/site.json?sakai.session=" + nursApp.userData.sessionID;
    restCall.RESTfulCall('GET', surl, storeBlogSearch, restError);
}

function storeUserId(rawData)
{
	Ti.API.info('in storeUserId');
	var parsedData = JSON.parse(rawData);
	nursApp.userData.userId = parsedData.id;
	Ti.API.info("UserID = " + nursApp.userData.userId);
}


function storeBlogSearch(rawData)
{
	Ti.API.info('in storeBlogSearch');
	var parsedData = JSON.parse(rawData);
	getClassList(parsedData);
}

function getClassList(parsedData)
{	
	Ti.API.info('in getClassList');
	var url = '';
	var restCall = require('postRequest');
	
	if(parsedData.site_collection.length > 0)
	{
		// Store class information entityReference and entityURL in an associative array using entityID as the key
		// This object should probably be initialized in app.js. Start w/ everything undefined or false. Change later
		for (var i = 0; i < parsedData.site_collection.length; i++)
		{
			nursApp.userData.classes[parsedData.site_collection[i].entityId] = {
				entityReference: parsedData.site_collection[i].entityReference,
				entityURL : parsedData.site_collection[i].entityURL,
				title : parsedData.site_collection[i].title,
				entityId : parsedData.site_collection[i].entityId,
				shortDescription : parsedData.site_collection[i].shortDescription,
				doesBlogExist : false,
				blogId : undefined
			};
			
			url = "https://laulima.hawaii.edu/direct" + parsedData.site_collection[i].entityReference + "/pages.json?sakai.session=" + nursApp.userData.sessionID;
			Ti.API.info('about to call: ' + url);
			restCall.RESTfulCall('GET', url, checkForBlog, restError);
		}		
	} else {
		classError();
	}

}

function checkForBlog(rawData)
{	
	Ti.API.info('In check for blog')
	var parsedData = JSON.parse(rawData);
	var y = 0;
	var url = '';
	var restCall = require('postRequest');
	
	if (parsedData.length > 0)
	{
		// Go through class info one section at a time
		for (y=0; y < parsedData.length; y++)
		{
			// Go through each class info sections tool list
			for(z=0; z < parsedData[y].tools.length; z++)
			{
				// Look for sakai.blogwow in the tool list
				if(parsedData[y].tools[z].toolId == 'sakai.blogwow')
				{
					incCount();
					// If the class has a blog then save the siteId so we can find the blogId
					nursApp.userData.blogList.push(parsedData[y].tools[z].siteId);
					
					// Save a spot for the blogId
					nursApp.userData.blogId.push('');
					
					// Gather Blog Info
					url = "https://laulima.hawaii.edu/direct/blog-blog.json?sakai.session=" + nursApp.userData.sessionID + "&location=" + nursApp.userData.classes[parsedData[y].tools[z].siteId].entityReference;
					Ti.API.info('Blog Entity Reference = ' + nursApp.userData.classes[parsedData[y].tools[z].siteId].entityReference);
					restCall.RESTfulCall('GET', url, extractBlogId, restError);
				}					
			}
		}
	} else {
		blogError();
	}
}

// Extract our users blog from the full list of course blogs
// We are looking to match the userId with the blog's owner.Id
function extractBlogId(rawData)
{	
	Ti.API.info('in blog ID');
	var parsedData = JSON.parse(rawData);
	// Check all the details on every blog in the class
	for (var blog in parsedData['blog-blog_collection'])
	{	
		// If any of those blogs belong to our user
		if(parsedData['blog-blog_collection'][blog].ownerId == nursApp.userData.userId)
		{
			// Grab the entity reference and separate it so we can find the siteId.
			var bigString = parsedData['blog-blog_collection'][blog].location;
			var littleStrings = bigString.split('/');
			Ti.API.info('The bigString = ' + bigString);

			Ti.API.info('parsing the blogs entity reference, last item in split: ' + littleStrings[littleStrings.length-1]);
			// Go through the blogs we have saved and find the one that matches this blog
			for (var listItem in nursApp.userData.blogList)
			{
				Ti.API.info('Checking if ' + nursApp.userData.blogList[listItem] + ' is = ' + littleStrings[littleStrings.length-1]);
				// Save the blogId with its match in the blogList
				if(nursApp.userData.blogList[listItem] == littleStrings[littleStrings.length-1])
				{
					Ti.API.info('BlogList item and last item in split match. Storing id; ' + parsedData['blog-blog_collection'][blog].id)
					nursApp.userData.blogId[listItem] = parsedData['blog-blog_collection'][blog].id;
				}
			}
		}
	}
	decCount();
}





