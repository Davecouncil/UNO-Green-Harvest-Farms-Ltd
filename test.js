const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

console.log("Servers:", dns.getServers());

dns.resolveSrv("_mongodb._tcp.cluster0.7qwlzyv.mongodb.net", (err, records) => {
    console.log(err);
    console.log(records);
});