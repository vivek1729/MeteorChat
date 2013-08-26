Messages = new Meteor.Collection("messages");
if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to chat.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });

  Template.message.messages = function () {
    return Messages.find({}, {sort: {time: -1}});
  };


  Template.send.username = function () {
    return Session.get("username");
  };

  Template.send.events({
    'click input.btn' : function(){
     var name = document.getElementById("username").value;
     Session.set("username", name);
     return false;
    }
  });

  Template.send.events({
    'keypress, click button' : function(event){
     var body = document.getElementById("messagebody");
     var d = new Date();
     if(body.value !== "" && event.which == 13)
     {
      Messages.insert({time: d.getTime(), text: body.value, name: Session.get("username")});
      body.value = "";
      event.preventDefault();
     }
    }
  });

  Template.send.events({
    'click button' : function(){
     var body = document.getElementById("messagebody");
     var d = new Date();
     if(body.value !== "")
      Messages.insert({time: d.getTime(), text: body.value, name: Session.get("username")});
      body.value = "";
      return false;
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    /*if (Messages.find().count() === 0) {
      var names = ["Ada Lovelace",
                   "Nikola Tesla",
                   "Claude Shannon"];
      for (var i = 0; i < names.length; i++)
        Messages.insert({time: Math.floor(Random.fraction()*10)*5,text: names[i]});
    }*/
  });
}
