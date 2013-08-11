Template.tab.drinks_menu = function(){
return Drinks.find({});
};

Template.tab.ordered_drinks = function () {
	return PurchasedDrinks.find({tab:Session.get('tabId')});
};

Template.tab.my_tab = function() {
	return Tabs.findOne({_id:Session.get('tabId')});
};

Template.drink_from_menu.tab_open = function() {
	var tab = Tabs.findOne({_id:Session.get('tabId')});
	return tab && (tab.open !== false);
};

Template.drink_from_tab.drink_ready = function() {
	return this.ready;
};

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