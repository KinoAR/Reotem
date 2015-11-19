//Load template when link is clicked & specify client / server side -- curly braces represent js object
if(Meteor.isClient){
  Template.homepage.events({
	  'click #gamepage-link' : function(){
	  	//Renders a template on the page & query for the specific dom element
		  Blaze.render(Template.gamepage,document.querySelector('#content'));
		  console.log("Loaded gamepage template");
  	  }
  });
}