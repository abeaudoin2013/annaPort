Template.Contact.onRendered(function () {
	$("#newsletter-email").focus();
})
Template.Contact.helpers({

});
Template.Contact.events({
	"submit #newsletter": function (e) {
		e.preventDefault();
		var $form = $(e.target);
		var email = $form.find("#newsletter-email").val();
		Meteor.call("insertEmail", email);
		$form.find("#newsletter-email").val("");
		var $thanks = $form.closest(".contact-container").siblings("#thankyou");
		$thanks.addClass("active-thankyou");
		function setThanks () {
				var setThanks = setTimeout(function () {
				$thanks.removeClass("active-thankyou");
			}, 2000);
		};
		setThanks();

	}
});