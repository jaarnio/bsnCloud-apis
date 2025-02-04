require("dotenv").config();

const BSNClient = require("./api");

async function main() {
  const client = new BSNClient({
    client_id: process.env.BSN_CLIENT_ID,
    client_secret: process.env.BSN_CLIENT_SECRET,
    username: process.env.BSN_USERNAME,
    password: process.env.BSN_PASSWORD,
    network: process.env.BSN_NETWORK,
    baseUrl: process.env.BSN_BASE_URL,
  });

  try {
    // Example device serial number
    const deviceType = "player";
    const deviceSerial = "-";

    // Download firmware
    /*     const firmwareUrl =
      "https://bsncloud.s3.amazonaws.com/public/cobra-9.0.189-update.bsfw";
    const firmwareResponse = await client.rdws.downloadFirmware(
      deviceType,
      deviceSerial,
      firmwareUrl
    );
    console.log("Firmware Download Response:", firmwareResponse);
    // Response will include success and reboot flags
    if (firmwareResponse.data.result.success) {
      console.log("Firmware download successful");
      if (firmwareResponse.data.result.reboot) {
        console.log("Device will reboot to apply update");
      }
    } */

    // Get device info using RDWS
    //const deviceInfo = await client.rdws.getInfo(deviceType, deviceSerial);
    //console.log("Device Info:", deviceInfo);

    // Get device time using RDWS
    //const deviceTime = await client.rdws.getTime(deviceType, deviceSerial);
    //console.log("Device Time:", deviceTime);

    // Send custom command
    /*     const customResponse = await client.rdws.sendCustomCommand(
      deviceType,
      deviceSerial,
      "next",
      true
    );
    console.log("Custom Command Response:", customResponse); */

    // Get all devices (using existing devices API)
    const devices = await client.devices.getAllDevices();
    console.log("Devices:", devices);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
