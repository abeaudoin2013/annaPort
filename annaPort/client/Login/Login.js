Template.Login.helpers({
	redirect: () => {
		function go () {
				var go = setTimeout(function () {
					FlowRouter.go('/')
				}, 500);
			};
			go();
	}
})