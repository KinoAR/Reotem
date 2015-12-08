//Load content information when rendered
  Template.homepage.onRendered(function(template) {
    template = Template.homepagecontent;
    Blaze.render(template,Template.instance().find('#content'));
  });

  Template.homepage.events({  	
  	//Check if clicked any element in the homepage navigation then renders the specific template
  	'click .homepage-nav' : function(event, template){
  		let clickedElement = event.target;
  		event.preventDefault();
  		event.stopPropagation();

  	if(clickedElement.matches('#gamepage-link')) {
  		if(!Template.instance().find('#game-area')) {
      let view = Blaze.getView(template.find('.content-information'));
      if(view.name != "Template.homepage") {
        Blaze.remove(view);
      }
		  template = Template.gamepage;
		  Blaze.render(template,Template.instance().find('#content'));
  		}
  	}
    else if(clickedElement.matches('#authorpage-link')) {
      let view = Blaze.getView(template.find('.content-information'));
      if(view.name != "Template.homepage"){
        Blaze.remove(view);
      }
      template = Template.authorpage;
      Blaze.render(template,Template.instance().find('#content'))
    }
    else if(clickedElement.matches('#signup-link')) {
      let view = Blaze.getView(template.find('.content-information'));
      if(view.name != "Template.homepage") {
        Blaze.remove(view); 
      }
      template = Template.signuppage;
      Blaze.render(template,Template.instance().find('#content'));
    }
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