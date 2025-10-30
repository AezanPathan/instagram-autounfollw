const selectors = {
  login: {
    usernameInput: "input[name=\"username\"]",
    passwordInput: "input[name=\"password\"]",
    submitButton: "button[type=\"submit\"]"
  },
  following: {
    link: "a[href*=\"/following\"]",
    dialog: "div[role=\"dialog\"]",
    dialogScrollable: "div[role=\"dialog\"] ._aano, div[role=\"dialog\"] .isgrP"
  },
  unfollow: {
    buttonsInDialog: "div[role=\"dialog\"] button",
    confirmButton: "button._a9--"
  }
};

module.exports = selectors;
