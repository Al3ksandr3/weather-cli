const { createInterface } = require("readline");

console.log(createInterface)(async function () {
  const rl = createInterface({ input: process.stdin, output: process.stdout });

  const answer = await rl.question("What do you think of Node.js? ");

  console.log(`Thank you for your valuable feedback: ${answer}`);

  rl.close();
})();
