const { extractSignals } = require("./tokenizer");
const fs = require("fs");

//Content that need to be tokenized and analyzed
const text = `
User enters invalid credentials and click on login witll throw authentication error. The error should be thrown in Red colour text in UI. User is allowed to enter three invalid credentials and lock account on 4th invalid attempt.
`;

fs.writeFileSync(
  "output.json",
  JSON.stringify(
    {
      text,
      signals: extractSignals(text),
    },
    null,
    2,
  ),
);
