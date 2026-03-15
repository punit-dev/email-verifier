const net = require("net");

const checkMailbox = (receiverEmail, mx) => {
  return new Promise((resolve) => {
    const socket = net.createConnection(25, mx);

    let step = 0;

    // socket.on("connect", () => {
    //   socket.write("HELO example.com\r\n");
    //   socket.write("MAIL FROM:<text@example.com>\r\n");
    //   socket.write(`RCPT TO:<${receiverEmail}>\r\n`);
    // });

    socket.on("data", (data) => {
      const msg = data.toString();

      if (step === 0) {
        socket.write("HELO example.com\r\n");
        step++;
        return;
      }

      if (step === 1) {
        socket.write("MAIL FROM:<text@example.com>\r\n");
        step++;
        return;
      }

      if (step === 2) {
        socket.write(`RCPT TO:<${receiverEmail}>\r\n`);
        step++;
        return;
      }

      if (step === 3) {
        if (msg.includes("250")) {
          resolve({ result: "valid", subresult: "mailbox_exists" });
        }

        if (msg.includes("550")) {
          resolve({ result: "invalid", subresult: "mailbox_does_not_exist" });
        }

        if (msg.includes("450")) {
          resolve({ result: "unknown", subresult: "greylisted" });
        }

        socket.end();
      }
    });

    socket.on("error", () => {
      resolve({ result: "unknown", subresult: "connection_error" });
    });

    socket.setTimeout(8000);
    socket.on("timeout", () => {
      socket.destroy();
      resolve({
        result: "unknown",
        subresult: "timeout",
      });
    });
  });
};

module.exports = checkMailbox;
