if (Meteor.isServer) {
  //Publish information to the server
  Meteor.publish('users', function(){
    return Meteor.users.find();
  });
}

if(Meteor.isClient) {
  Meteor.subscribe("users");
}


