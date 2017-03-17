Template.Dashboard.onCreated(function () {
	this.autorun(() => {
		this.subscribe('newsletters');
	});
});

Template.Dashboard.helpers({
	users: function () {
		return Newsletters.find();
	},
	userEmail: function () {
		return this.email;
	}
})