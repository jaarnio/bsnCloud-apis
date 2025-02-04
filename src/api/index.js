const DevicesAPI = require("./devices");
const RdwsAPI = require("./rdws");
// Import other API modules as needed

class BSNClient {
  constructor(config) {
    const BsnAuthManager = require("../auth/authManager");
    this.authManager = new BsnAuthManager(config);

    // Initialize API modules
    this.devices = new DevicesAPI(this.authManager);
    this.rdws = new RdwsAPI(this.authManager);
    // Add other API modules as needed
  }
}

module.exports = BSNClient;
