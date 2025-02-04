const request = require("request");

class BsnAuthManager {
  constructor(config) {
    this.config = {
      client_id: config.client_id,
      client_secret: config.client_secret,
      username: config.username,
      password: config.password,
      network: config.network,
      baseUrl: config.baseUrl || "https://api.bsn.cloud/2022/06/REST",
    };
    this.currentToken = null;
    this.refreshToken = null;
  }

  async authenticate() {
    // First get self token
    const selfToken = await this._getSelfToken();
    // Then get user token using self token
    return await this._getUserToken(selfToken);
  }

  async _getSelfToken() {
    const tokenOpt = {
      method: "POST",
      url: `${this.config.baseUrl}/Token/`,
      headers: {
        "Accept-Encoding": "gzip,deflate",
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      form: {
        grant_type: "password",
        client_id: this.config.client_id,
        client_secret: this.config.client_secret,
        username: this.config.username,
        password: this.config.password,
      },
    };

    try {
      const response = await this._makeRequest(tokenOpt);
      return response.access_token;
    } catch (error) {
      throw new Error(`Self token authentication failed: ${error.message}`);
    }
  }

  async _getUserToken(selfToken) {
    const tokenOpt = {
      method: "POST",
      url: `${this.config.baseUrl}/Token/`,
      headers: {
        "Accept-Encoding": "gzip,deflate",
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        Authorization: `Bearer ${selfToken}`,
      },
      form: {
        grant_type: "password",
        client_id: this.config.client_id,
        client_secret: this.config.client_secret,
        username: `${this.config.network}/${this.config.username}`,
        password: this.config.password,
      },
    };

    try {
      const response = await this._makeRequest(tokenOpt);
      this.currentToken = response.access_token;
      this.refreshToken = response.refresh_token;
      return this.currentToken;
    } catch (error) {
      throw new Error(`User token authentication failed: ${error.message}`);
    }
  }

  async refreshAccessToken() {
    if (!this.refreshToken) {
      throw new Error("No refresh token available");
    }

    const refreshOpt = {
      method: "POST",
      url: `${this.config.baseUrl}/Token/`,
      headers: {
        "Accept-Encoding": "gzip,deflate",
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      form: {
        grant_type: "refresh_token",
        refresh_token: this.refreshToken,
        client_id: this.config.client_id,
        client_secret: this.config.client_secret,
      },
    };

    try {
      const response = await this._makeRequest(refreshOpt);
      this.currentToken = response.access_token;
      this.refreshToken = response.refresh_token;
      return this.currentToken;
    } catch (error) {
      // If refresh fails, try full authentication again
      return await this.authenticate();
    }
  }

  async makeAuthenticatedRequest(options) {
    if (!this.currentToken) {
      await this.authenticate();
    }

    const authenticatedOptions = {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${this.currentToken}`,
      },
    };

    try {
      return await this._makeRequest(authenticatedOptions);
    } catch (error) {
      if (error.statusCode === 401 || error.statusCode === 403) {
        // Token expired, try to refresh and retry the request
        await this.refreshAccessToken();
        authenticatedOptions.headers.Authorization = `Bearer ${this.currentToken}`;
        return await this._makeRequest(authenticatedOptions);
      }
      throw error;
    }
  }

  _makeRequest(options) {
    return new Promise((resolve, reject) => {
      request(options, (error, response) => {
        if (error) {
          reject(error);
          return;
        }
        if (response.statusCode >= 400) {
          reject({
            statusCode: response.statusCode,
            message: response.body,
          });
          return;
        }
        try {
          resolve(JSON.parse(response.body));
        } catch (e) {
          reject(new Error("Invalid JSON response"));
        }
      });
    });
  }
}

module.exports = BsnAuthManager;
