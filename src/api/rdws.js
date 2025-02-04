class RdwsAPI {
  constructor(authManager) {
    this.authManager = authManager;
    this.baseUrl = "https://ws.bsn.cloud/rest/v1";
  }

  async getInfo(destinationType, destinationName) {
    if (destinationType !== "player") {
      throw new Error('destinationType must be "player"');
    }

    const options = {
      method: "GET",
      url: `${this.baseUrl}/info`,
      headers: {
        Accept: "application/json, application/vnd.bsn.error+json",
        "Content-Type": "application/json",
      },
      qs: {
        destinationType,
        destinationName,
      },
    };

    return this.authManager.makeAuthenticatedRequest(options);
  }

  async getTime(destinationType, destinationName) {
    if (destinationType !== "player") {
      throw new Error('destinationType must be "player"');
    }

    const options = {
      method: "GET",
      url: `${this.baseUrl}/time`,
      headers: {
        Accept: "application/json, application/vnd.bsn.error+json",
        "Content-Type": "application/json",
      },
      qs: {
        destinationType,
        destinationName,
      },
    };

    return this.authManager.makeAuthenticatedRequest(options);
  }

  async sendCustomCommand(destinationType, destinationName, command, returnImmediately) {
    if (destinationType !== "player") {
      throw new Error('destinationType must be "player"');
    }

    const options = {
      method: "PUT",
      url: `${this.baseUrl}/custom`,
      headers: {
        Accept: "application/json, application/vnd.bsn.error+json",
        "Content-Type": "application/json",
      },
      qs: {
        destinationType,
        destinationName,
      },
      body: JSON.stringify({
        data: {
          command: command,
          returnImmediately: returnImmediately,
        },
      }),
    };

    return this.authManager.makeAuthenticatedRequest(options);
  }
}

module.exports = RdwsAPI;
