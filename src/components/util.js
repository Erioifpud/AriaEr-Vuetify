exports.multicall = function(aria2, fn) {
  var secret = aria2.secret;
  aria2.secret = "";
  aria2.send(
    "system.multicall",
    [
      {
        methodName: "aria2.tellActive",
        params: ["token:" + secret]
      },
      {
        methodName: "aria2.tellWaiting",
        params: ["token:" + secret, 0, 1000]
      },
      {
        methodName: "aria2.tellStopped",
        params: ["token:" + secret, 0, 1000]
      },
      {
        methodName: "aria2.getVersion",
        params: ["token:" + secret]
      },
      {
        methodName: "aria2.getGlobalStat",
        params: ["token:" + secret]
      },
      {
        methodName: "aria2.getGlobalOption",
        params: ["token:" + secret]
      }
    ],
    function(err, res) {
      fn(err, res);
      aria2.secret = secret;
    }
  );
};
