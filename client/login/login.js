Template.login.helpers({
  'click .btn-google' : function(event, template) {
      event.preventDefault();

      Meteor.loginWithGoogle(function(error){
        if(error){
          console.log(error.reason);
        }
      });
    }
});