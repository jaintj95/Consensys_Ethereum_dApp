var AdminPanel = artifacts.require("AdminPanel");
var BountyHub = artifacts.require("BountyHub");

module.exports = function(deployer) {
  deployer.deploy(AdminPanel).then(function() {
  	return deployer.deploy(BountyHub, AdminPanel.address);
  });
};
