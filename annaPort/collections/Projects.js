Images = new FilesCollection({
  collectionName: 'Images',
  allowClientCode: true // Required to let you remove uploaded file
});

Projects = new Mongo.Collection('projects');

Projects.allow({
	// who is allowed to insert into this recipes function
	// if user Id exists
	insert: function (userId, doc) {
		return !!userId;
	}
});

ProjectSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Name"
	},
	desc: {
		type: String,
		label: "Description"
	},
	author: {
		type: String,
		label: "Author",
		autoValue: function () {
			return this.userId
		},
		autoform: {
			type: "hidden"
		}
	},
	pictures: {
    type: [String],
    label: 'Add Pictures'
  },
  "pictures.$": {
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Images'
      }
    }
  }
});

Projects.attachSchema(ProjectSchema);