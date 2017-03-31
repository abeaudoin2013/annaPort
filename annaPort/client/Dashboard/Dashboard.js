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
});

Template.Dashboard.events({
  'click .delete-user': function (e) {

  	var email = $(e.target).siblings(".newsletter-email").html();
  	var email_obj = Newsletters.findOne({email: email});
  	console.log(email_obj._id);
  	$("#delete-user-modal").show();
  	$("#delete-user-yes").unbind("click").bind("click", function () {
  		Meteor.call("deleteNewsletter", email_obj._id)
  		$("#delete-user-modal").hide();
  	});
  	$("#delete-user-no").unbind("click").bind("click", function () {
  		$("#delete-user-modal").hide();
  	});
  }
});