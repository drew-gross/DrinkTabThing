Tabs = new Meteor.Collection('tabs');
Drinks = new Meteor.Collection('drinks');
PurchasedDrinks = new Meteor.Collection('purcahsed_drinks');
Bars = new Meteor.Collection('bars');

if (Meteor.isClient) {
  Meteor.Router.add({
    '/': 'home',

    '/bar/:id': function (id) {
      Session.set('barId', id);
      return 'bar';
    },

    '/dashboard/:id': function (id) {
      Session.set('barId', id);
      return 'dashboard';
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
    return PurchasedDrinks.find({tab:Session.get('tabId')});
  };

  Template.bar.bar_name = function(){
    var bar = Bars.findOne({_id:Session.get('barId')});
    return bar && bar.name;
  };

  Template.dashboard.active_drinks = function() { 
    var bar = Bars.findOne({_id:Session.get('barId')});
    if (bar) {
      return PurchasedDrinks.find({
        bar: Session.get('barId'),
        ready:{$not: true}
      });
    } else {
      return bar;
    }
  };

  Template.dashboard.finished_drinks = function() {
    var bar = Bars.findOne({_id:Session.get('barId')});
    if (bar) {
      return PurchasedDrinks.find({
        bar: Session.get('barId'),
        ready: true
      });
    } else {
      return bar;
    }
  };

  Template.bar.events({
    'click .open_tab': function () {
      var new_tab_id = Tabs.insert({
        owner: "Drew Gross", 
        barId: Session.get('barId')
      });
      Meteor.Router.to('/tabs/' + new_tab_id);
    }
  });

  Template.drink_from_menu.events({
    'click .buy_drink': function () {
      var tab = Tabs.findOne({_id:Session.get('tabId')});
      PurchasedDrinks.insert({
        name: this.name, 
        price: this.price, 
        tab: Session.get('tabId'),
        bar: tab.barId
      });
    }
  });

  Template.drink_from_tab.drink_ready = function() {
    return this.ready;
  };

  Template.active_drink.events({
    'click .drink_ready': function () {
      PurchasedDrinks.update(this._id, {$set:{ready: true}});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Drinks.find().count() === 0) {
      Drinks.insert({name: "Screwdriver", price: "5.00"});
      Drinks.insert({name: "Rum and Coke", price: "5.50"});
      Drinks.insert({name: "Kilkenny's", price: "8.00"});
    }
  });
}
