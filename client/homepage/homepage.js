//Load template when link is clicked & specify client / server side -- curly braces represent js object
  var counter = 0;
  Template.homepage.events({  	
  	//Check if clicked any element in the homepage navigation
  	'click .homepage-nav' : function(event, template){
  		let clickedElement = event.target;
  		event.preventDefault();
  		event.stopPropagation();

  		console.log(clickedElement);
  	//Checked if clicked gamepage link
  	if(clickedElement.matches('#gamepage-link') && counter < 1){
  		if(!Template.instance().find('#game-area')){
	  	 //Renders a template on the page & query for the specific dom element
		    template = Template.gamepage;
		    Blaze.render(template,Template.instance().find('#content'));
        counter++;
		    console.log("Loaded gamepage template");	
  		}
  	}
    //Check if clicked author link
    else if(clickedElement.matches('#authorpage-link') && counter < 1)
    {
      template = Template.authorpage;
      Blaze.render(template,Template.instance().find('#content'));
      counter++;
      console.log("Loaded author template");
    }
    else if(clickedElement.matches('#signup-link') && counter < 1)
    {
      template = Template.signuppage;
      Blaze.render(template,Template.instance().find('#content'));
      counter++;
      console.log("Loaded sign up template");
    }
    //Currently breaks if there is no content-information class selectors on the page.
    else if(clickedElement.matches('#homepage-link'))
    {
      let view = Blaze.getView(template.find('.content-information'));
      let viewData = Blaze.getView(template.find('.content-information'));
      console.log(viewData);
      if(view.name != "Template.homepage"){
        Blaze.remove(view);
        counter--;
        console.log('Removed View: ' + view);
      }   
    }
  	
  }
});