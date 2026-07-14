const nlp = require("compromise");
const natural = require("natural");
//Sentence that needs to be processed
const doc = nlp(
  "Customer adds a product to the cart. Customer proceeds to checkout. Payment is processed successfully. Order confirmation is displayed.",
);
const text =
  "Customer adds a product to the cart. Customer proceeds to checkout. Payment is processed successfully. Order confirmation is displayed.";
//compromise
const sentencesCompromise = doc.sentences().out("array");
sentencesCompromise.forEach((sentence, index) => {
  console.log(`${index + 1}: ${sentence}`);
});

//natural
const sentenceTokenizer = new natural.SentenceTokenizer();
const tokens = sentenceTokenizer.tokenize(text);
console.log(tokens);
