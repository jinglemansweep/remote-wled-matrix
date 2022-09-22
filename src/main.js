#!/usr/bin/env node

const dgram = require("dgram");

const WLED_PROTOCOL_RGB = 2;
const WLED_TIMEOUT = 5;

const sendWledUdp = (
  host,
  port,
  pixels = [],
  timeout = WLED_TIMEOUT,
  protocol = WLED_PROTOCOL_RGB
) => {
  const client = dgram.createSocket("udp4");
  const message = [protocol, timeout];
  pixels.forEach((pixel) => {
    message.push(...hex2rgb(pixel));
  });
  const buffer = Buffer.from(message);
  console.log(`Sending ${message} [len: ${buffer.length}] to ${host}:${port}`);
  client.send(buffer, 0, buffer.length, port, host, (err, bytes) => {
    console.log(err, bytes);
    client.close();
  });
};

const hex2rgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : [0, 0, 0];
};

WLED_HOST = "10.0.2.88";
WLED_PORT = 21324;

sendWledUdp(WLED_HOST, WLED_PORT, [
  "#ff0000",
  "#ff0000",
  "#ff0000",
  "#ff0000",
  "#ff0000",
  "#ff0000",
  "#ff0000",
  "#ff0000",
  "#ff0000",
  "#ff0000",
  "#ff0000",
  "#ff0000",
  "#ff0000",
  "#ff0000",
  "#ff0000",
  "#ff0000",
  "#ff0000",
  "#ff0000",
  "#ff0000",
  "#ff0000",  
]);
