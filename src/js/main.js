var viewModel = {
    allMessages: ko.observableArray([]),
    message: ko.observable(null),
    MESSAGE_KEY: "allMessages",
    getInfo: function () {
        if (localStorage[viewModel.MESSAGE_KEY]) {
            viewModel.allMessages(JSON.parse(localStorage[viewModel.MESSAGE_KEY]));
        }
    },
    writeInfo: function () {
        if (viewModel.message()) {
            viewModel.allMessages.push(viewModel.message());
            viewModel.message(null);
            viewModel.updateStorage();
            viewModel.getInfo();
        }
    },
    removeMessage: function (msg) {
        var index = viewModel.allMessages().indexOf(msg);

        if (index > -1) {
            viewModel.allMessages().splice(index, 1);
            viewModel.updateStorage();
            viewModel.getInfo();
        }
    },
    updateStorage: function () {
        localStorage[viewModel.MESSAGE_KEY] = JSON.stringify(viewModel.allMessages());
    },
    clearStorage: function () {
        var ask = alert("Are you sure you want to clear history?");
            localStorage.clear();
            location.reload();
    }
};

ko.applyBindings(viewModel);

viewModel.getInfo();

window.addEventListener("storage", function (e) {
    if (e.key === viewModel.MESSAGE_KEY) {
        viewModel.getInfo();
    }
});