const fs = require("fs");
const nlp = require("compromise");
const data = fs.readFileSync("./requirement.txt", "utf-8");
const doc = nlp(data);
let words = [];

function wordsExtractor() {
  const terms = doc.json()[0].terms;
  for (term of terms) {
    words.push(term.text);
  }
  return words;
}

//Return data
function testElement() {
  return data;
}

module.exports = { wordsExtractor, testElement };
