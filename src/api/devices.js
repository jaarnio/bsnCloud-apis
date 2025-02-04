class DevicesAPI {
  constructor(authManager) {
    this.authManager = authManager;
    this.baseUrl = "https://api.bsn.cloud/2022/06/REST/Devices";
  }

  async getAllDevices() {
    const options = {
      method: "GET",
      url: this.baseUrl,
      headers: {
        Accept: "application/json",
      },
    };
    return this.authManager.makeAuthenticatedRequest(options);
  }

  async getDeviceById(deviceId) {
    const options = {
      method: "GET",
      url: `${this.baseUrl}/${deviceId}`,
      headers: {
        Accept: "application/json",
      },
    };
    return this.authManager.makeAuthenticatedRequest(options);
  }
}

module.exports = DevicesAPI;
