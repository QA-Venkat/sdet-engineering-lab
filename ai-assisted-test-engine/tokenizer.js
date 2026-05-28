const nlp = require("compromise");
// const natural = require("natural");
//Text
const doc =
  "As a admin user, I should be able to delete user from application.";
console.log(`The user requirement is "${doc}"`);
//compromise
const tokensVerb = nlp(doc).verbs().out("array");
const tokensNoun = nlp(doc).nouns().out("array");
console.log(`Nouns from the doc are ${tokensNoun}`);
console.log(`Verbs from the doc are ${tokensVerb}`);
