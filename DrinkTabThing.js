Tabs = new Meteor.Collection('tabs');
Drinks = new Meteor.Collection('drinks');

if (Meteor.isClient) {
  Meteor.Router.add({
    '/': 'home',

    '/tabs/:id':  function (id) {
      Session.set('tabId', id);
      return 'tab';
    }
  });

  Template.tab.drinks_menu = function(){
    return Drinks.find({});
  };

  Template.tab.ordered_drinks = function () {
    var tab = Tabs.findOne(Session.get('tabId'));
    return tab && tab.ordered_drinks;
  };

  Template.drink_from_menu.events({
    'click .buy_drink': function () {
      Tabs.update({_id:Session.get('tabId')}, {$push: {ordered_drinks: this}});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.Router.add({
      '/tabs/:id.xml': function(id) {
        return Tabs.findOne(id).owner;
      }
    });

    if (Drinks.find().count() === 0) {
      Drinks.insert({name: "Screwdriver", price: "5.00"});
      Drinks.insert({name: "Rum and Coke", price: "5.50"});
      Drinks.insert({name: "Kilkenny's", price: "8.00"});
    }
  });
}
