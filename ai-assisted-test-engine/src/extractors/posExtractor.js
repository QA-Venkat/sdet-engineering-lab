const nlp = require("compromise");
const doc = nlp("User should log in with valid credentials successfully.");
//compromise
const sentenceArray = doc.sentences().out("array");
console.log(`The sentence Array is ${sentenceArray}`);
const [sentence] = sentenceArray;
console.log(`Ths sentence is ${sentence}`);
const allTerms = doc.json().map((sentence) =>
  sentence.terms.map((term) => ({
    text: term.text,
    tag: term.tags,
  })),
);
// console.log(JSON.stringify(allTerms, null, 2));
const pos = allTerms.flat();
console.log(`pos is ${pos}`);

// Extracted:
const extracted = {
  sentence: sentence,
  actor: findActor(pos),
  action: findAction(pos),
  requirementIndicator: findRequirementIndicator(pos),
  object: findObject(pos),
  qualifiers: findQualifiers(pos),
  behaviour: findBehavior(pos),
  relationship: findRelationship(pos),
};

console.log(extracted);

//Find actor
function findActor(pos) {
  for (const obj of pos) {
    if (obj.tag.includes("Noun") || obj.tag.includes("Actor")) {
      return obj.text;
    }
  }
  return null;
}
//Finding action
function findAction(pos) {
  const actions = [];
  for (const obj of pos) {
    if (obj.tag.includes("Verb") && !obj.tag.includes("Modal")) {
      actions.push(obj.text);
    }
  }
  return actions;
}
//Find verb index
function findVerbIndex(pos) {
  var index;
  for (const obj of pos) {
    if (obj.tag.includes("Verb") && !obj.tag.includes("Modal")) {
      const index = pos.indexOf(obj);
      return index;
    }
  }
}
//Find noun index
function findNounIndex(pos) {
  var index;
  for (const obj of pos) {
    if (obj.tag.includes("Noun") && !obj.tag.includes("Modal")) {
      const index = pos.indexOf(obj);
      return index;
    }
  }
}
//Finding Object:
function findObject(pos) {
  const verbIndex = findVerbIndex(pos);
  const object = [];
  // console.log(`Verb index from object function is ${verbIndex}`);
  for (const obj of pos) {
    if (obj.tag.includes("Noun") && pos.indexOf(obj) > verbIndex) {
      object.push(obj.text);
    }
  }
  return object;
}
//Finding requirement indicator
function findRequirementIndicator(pos) {
  const requirementIndicator = [];
  for (const obj of pos) {
    if (obj.tag.includes("Modal")) {
      requirementIndicator.push(obj.text);
    }
  }
  return requirementIndicator;
}
//Finding qualifiers
function findQualifiers(pos) {
  const qualifiers = [];
  for (const obj of pos) {
    if (
      obj.tag.includes("Adjective") &&
      pos[pos.indexOf(obj) + 1].tag.includes("Noun")
    ) {
      qualifiers.push(obj.text);
    }
  }
  return qualifiers;
}
//Finding behaviors:
function findBehavior(pos) {
  const behaviors = [];
  for (const obj of pos) {
    if (obj.tag.includes("Adverb")) {
      behaviors.push(obj.text);
    }
  }
  return behaviors;
}
// Finding relationships
function findRelationship(pos) {
  const relationship = [];
  for (const obj of pos) {
    if (obj.tag.includes("Preposition")) {
      relationship.push(obj.text);
    }
  }
  return relationship;
}

//NER
//System logs out inactive users after 15 minutes. //Duration
// System locks account after 5 failed login attempts. //count
// User uploads PDF files. //File type
// System sends OTP to email. //Communucatioh channel & Authentication

//System must lock the account after 5 failed login attempts.
//User can upload PDF files up to 20 MB.
// Application supports Chrome and Firefox browsers. // browsers
