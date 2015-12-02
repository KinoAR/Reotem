//Load content information when rendered
  Template.homepage.onRendered(function(template) {
    template = Template.homepagecontent;
    Blaze.render(template,Template.instance().find('#content'));
  });

  Template.homepage.events({  	
  	//Check if clicked any element in the homepage navigation
  	'click .homepage-nav' : function(event, template){
  		let clickedElement = event.target;
  		event.preventDefault();
  		event.stopPropagation();

  	//Checked if clicked gamepage link
  	if(clickedElement.matches('#gamepage-link')) {
  		if(!Template.instance().find('#game-area')) {
	  	 //Renders a template on the page & query for the specific dom element
      let view = Blaze.getView(template.find('.content-information'));
      if(view.name != "Template.homepage") {
        Blaze.remove(view);
      }
		  template = Template.gamepage;
		  Blaze.render(template,Template.instance().find('#content'));
  		}
  	}
    //Check if clicked author link
    else if(clickedElement.matches('#authorpage-link')) {
      let view = Blaze.getView(template.find('.content-information'));
      if(view.name != "Template.homepage"){
        Blaze.remove(view);
      }
      template = Template.authorpage;
      Blaze.render(template,Template.instance().find('#content'))
      console.log("Loaded author template");
    }
    else if(clickedElement.matches('#signup-link')) {
      let view = Blaze.getView(template.find('.content-information'));
      if(view.name != "Template.homepage") {
        Blaze.remove(view); 
      }
      template = Template.signuppage;
      Blaze.render(template,Template.instance().find('#content'));
      console.log("Loaded sign up template");
    }
    //Currently breaks if there is no content-information class selectors on the page.
    else if(clickedElement.matches('#homepage-link')) {
      let view = Blaze.getView(template.find('.content-information'));
      if(view.name != "Template.homepage"){
        Blaze.remove(view);
      }
      template = Template.homepagecontent;
      Blaze.render(template,Template.instance().find('#content'));   
    } 	
  }
});