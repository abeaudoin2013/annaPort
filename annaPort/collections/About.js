About = new Mongo.Collection('about');

AboutSchema = new SimpleSchema({
	about: {
		type: String,
		label: "Description",
		autoform: {
      afFieldInput: {
        type: 'textarea'
      }
    }
	}
});
About.allow({
	// who is allowed to insert into this recipes function
	// if user Id exists
	insert: function (userId, doc) {
		return !!userId;
	},
	update: function (userId, doc) {
		return !!userId
	}
});
About.attachSchema(AboutSchema);