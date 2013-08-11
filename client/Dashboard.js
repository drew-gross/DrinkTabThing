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

Template.dashboard.open_tabs = function() {
  return Tabs.find({
    barId: Session.get('barId'),
    open: {$not: false}
  });
};

Template.active_drink.events({
  'click .drink_ready': function () {
    PurchasedDrinks.update(this._id, {$set:{ready: true}});
  }
});

Template.open_tab.events({
  'click .close_tab': function() {
    Tabs.update(this._id, {$set:{open: false}});
  }
});