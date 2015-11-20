//Load template when link is clicked & specify client / server side -- curly braces represent js object
  Template.homepage.events({  	
  	//Check if clicked any element in the homepage navigation
  	'click .homepage-nav' : function(event, template){
  		let clickedElement = event.target;
  		event.preventDefault();
  		event.stopPropagation();

  		console.log(clickedElement);
  	//Checked if clicked gamepage link
  	if(clickedElement.matches('#gamepage-link')){
  		if(!Template.instance().find('#game-area')){
	  	 //Renders a template on the page & query for the specific dom element
		    template = Template.gamepage;
		    Blaze.render(template,Template.instance().find('#content'));
		    console.log("Loaded gamepage template");	
  		}
  	}
    //Check if clicked author link
    else if(clickedElement.matches('#authorpage-link'))
    {
      template = Template.authorpage;
      Blaze.render(template,Template.instance().find('#content'))
      console.log("Loaded author page");
    }
    //Currently breaks if there is no content-information class selectors on the page.
    else
    {
      var view = Blaze.getView($('.content-information')[0]);
      console.log('Removed View: ' + view);
      Blaze.remove(view);  
    }
  	
  }
});