Template.Dashboard.onCreated(function () {
	this.autorun(() => {
		this.subscribe('allUsers');
	});
});

Template.Dashboard.helpers({
	users: function () {
		return Roles.getUsersInRole('emailList');
	},
	userEmail: function () {
		return this.emails[0].address;
	}
})