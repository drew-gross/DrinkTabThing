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

  Handlebars.registerHelper('tab_total', function() {
    var drinks = PurchasedDrinks.find({
      tab:this._id,
      cancelled: {$not: true}
    });
    return _.reduce(drinks.fetch(), function(acc, next) {
      return acc + next.price;
    }, 0);
  });

  Template.home.bars = function() {
    return Bars.find({});
  };

  Template.home.events({
    'click .view_bar': function() {
      Meteor.Router.to('/bar/' + this._id);
    }
  });

  Template.bar.bar_name = function(){
    var bar = Bars.findOne({_id:Session.get('barId')});
    return bar && bar.name;
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
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Drinks.find().count() === 0) {
      Drinks.insert({name: "Screwdriver", price: 5.00});
      Drinks.insert({name: "Rum and Coke", price: 5.50});
      Drinks.insert({name: "Kilkenny's", price: 8.00});
    }
  });
}
