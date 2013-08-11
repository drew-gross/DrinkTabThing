Tabs = new Meteor.Collection('tabs');
Drinks = new Meteor.Collection('drinks');
PurcahsedDrinks = new Meteor.Collection('purcahsed_drinks');

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
    return PurcahsedDrinks.find({tab:Session.get('tabId')});
  };

  Template.drink_from_menu.events({
    'click .buy_drink': function () {
      PurcahsedDrinks.insert({name:this.name, price:this.price, tab:Session.get('tabId')});
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
  });
}
