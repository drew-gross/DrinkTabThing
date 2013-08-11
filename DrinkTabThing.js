Tabs = new Meteor.Collection('tabs');
Drinks = new Meteor.Collection('drinks');
PurcahsedDrinks = new Meteor.Collection('purcahsed_drinks');
Bars = new Meteor.Collection('bars');

if (Meteor.isClient) {
  Meteor.Router.add({
    '/': 'home',

    '/bar/:id': function (id) {
      Session.set('barId', id);
      return 'bar';
    },

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

  Template.bar.bar_name = function(){
    var bar = Bars.findOne({_id:Session.get('barId')});
    return bar && bar.name;
  };

  Template.bar.events({
    'click .open_tab': function () {
      var new_tab_id = Tabs.insert({owner:"Drew Gross"});
      Meteor.Router.to('/tabs/' + new_tab_id);
    }
  });

  Template.drink_from_menu.events({
    'click .buy_drink': function () {
      PurcahsedDrinks.insert({name:this.name, price:this.price, tab:Session.get('tabId')});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}
