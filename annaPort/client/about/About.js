Template.About.onCreated(function () {
	var self = this;
	self.autorun(function () {
		self.subscribe('projects');
		self.subscribe('files.images.all');
	});
});

Template.About.helpers({
  images: function () {
    return Images.find({});
  },
  percentage: function () {
    return (100/Images.find({}).count()).toString() + "%";
  }
});

Template.About.events({
  'click .background-images' : function (e) {
    var $p = $(e.target).closest(".individual-background-image-container");
    
    if ($p.hasClass("inactive")) {

      $p.removeClass("inactive")
        .addClass("active");

      $p.siblings(".project-picture-container").each(function (i, div) {
        if ($(div).hasClass("active")) {
          $(div).removeClass("active")
                .addClass("inactive");
        }
      });

    } else if ($p.hasClass("active")) {
      $p.removeClass("active")
        .addClass("in-between");
      function set () {
        var set = setTimeout(function () {
          $p.removeClass("in-between").addClass("inactive");
        }, 500);
      };
      set();

    }

  }
});