// Code in this file is informed by
// https://www.gorkahernandez.com/blog/request-header-parser-microservice-node/

// note in IPv6 localhost port addresses will appear as ::1, not 127.0.0.1.  This
// is the loopback address.  If we have this, substitute 127.0.0.1.  Otherwise
// delete the ::ffff: prefix if any.

const parseIp = (addrString) => {
  let result;
  if (addrString == '::1') {
    result = '127.0.0.1'
  } else if (addrString.indexOf(':') > -1) {
    result = addrString.split(':').reverse()[0];
  } else {
    result = addrString;
  }
  return result;
};

// The old definition of this project may have been more stringent, but
// the new 2018 version seems to only require plucking the language and
// user agent strings out of the header and sticking them in an object.
// The exception is the third element, the IP address, which requires
// special handling

const mapHeaderInfoToJSON = (req) => {
  return {
    "ipaddress": parseIp(req.connection.remoteAddress),
    "language": req.headers["accept-language"],
    "software": req.headers["user-agent"]
  }
};

module.exports.mapHeaderInfoToJSON = mapHeaderInfoToJSON;

// Unit tests for the IPaddress parser
// console.log(parseIp('::1')); // 127.0.0.1
// console.log(parseIp('::ffff:123.456.789.001')); // 123.456.789.001
// console.log(parseIp('002.147.483.647')); // 002.147.483.647
