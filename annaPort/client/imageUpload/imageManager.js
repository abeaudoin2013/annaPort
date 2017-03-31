Template.ImageManager.onCreated(function () {
	var self = this;
	self.autorun(function () {
		self.subscribe('files.images.all');
	});
});

Template.ImageManager.helpers({
	images: () => {
		return Images.find({}, {sort: {date_created: -1}});
	},
	link: function (img) {
		var image = Images.findOne({_id: img._id});
		return image.link();
	}
});

Template.ImageManager.events({
	'click .image': function (e) {
	  var $img = $(e.target);
		var id = $img.attr("id");
		if ($img.find(".delete-container").is(":visible")) {
			$img.find(".delete-container").hide();
		} else {
			$img.find(".delete-container").show();
			$img.find(".delete-sub-container").unbind("click").bind("click", function () {
				Meteor.call("deleteImage", id);
			});
		}
		// if (!Session.get("delete-container-clicked")) {
		// 	Session.set("delete-container-clicked", true);
		// 	$i.find(".delete-container").show();
		// 	$(".delete-sub-container").unbind("click").bind("click", function () {
		// 		Meteor.call("deleteImage", id);
		// 	});
		// } else {
		// 	Session.set("delete-container-clicked", false);
  //     $i.find(".delete-container").hide()
		// }
	}
})