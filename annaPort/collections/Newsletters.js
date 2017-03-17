Newsletters = new Mongo.Collection('newsletters');

NewsletterSchema = new SimpleSchema({
	email: {
		type: String,
		label: "Email"
	}
});

Meteor.methods({
	insertEmail: function (email) {
		Newsletters.insert({email: email});
	}
});

Newsletters.attachSchema(NewsletterSchema);