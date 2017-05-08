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
	},
	createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    }
  },
  // Force value to be current date (on server) upon update
  // and don't allow it to be set upon insert.
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  },
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