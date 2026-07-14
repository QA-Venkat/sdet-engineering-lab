const requirementParser = require("../../parser");
const words = requirementParser.wordsExtractor();
const text = requirementParser.testElement();
const entities = [];

//Static extractor values:
const fileTypes = ["PDF", "PNG", "CSV", "XLSX"];
const modalities = ["SMS", "Email", "Phone call"];
const messageType = ["Outreach", "Emergency", "Attendance"];
const durations = ["second", "minute", "hour", "day", "week", "month", "year"];

//File type extractors
function extractFileType(fileTypes) {
  let extracted = [];
  for (word of words) {
    if (fileTypes.includes(word)) {
      extracted.push({
        text: word,
        type: "FileType",
        extractor: "FileTypeExtractor",
      });
    }
  }
  return extracted;
}

//Modalities extractor:
function extractModalities(modalities) {
  let extracted = [];
  for (word of words) {
    if (modalities.includes(word)) {
      extracted.push({
        text: word,
        type: "Modality Type",
        extractor: "Modalities extractor",
      });
    }
  }
  return extracted;
}

//Message type extractor
function extractMessageType(messageType) {
  let extracted = [];
  for (word of words) {
    if (messageType.includes(word)) {
      extracted.push({
        text: word,
        type: "Message type",
        extractor: "Message extractor",
      });
    }
  }
  return extracted;
}

//Extract duration
const sentence =
  "As a user, I should be able to send Emergency Email notification with adding PDF and CSV attachment in 10 minute.";
function extractDuration(sentence) {
  let extracted = [];
  const durations = [
    "second",
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "year",
  ];
  const unitsPattern = durations.join("|");
  const durationPattern = new RegExp(
    String.raw`\b\d+(?:\.\d+)?\s*(${unitsPattern})s?\b`,
    "gi",
  );
  extracted = [...sentence.matchAll(durationPattern)];
  return extracted.map((match) => ({
    text: match[0],
    type: "Duration",
    extractor: "DurationExtractor",
  }));
}

extractDuration(sentence);

entities.push(...extractFileType(fileTypes));
entities.push(...extractModalities(modalities));
entities.push(...extractMessageType(messageType));
entities.push(...extractDuration(sentence));
console.log(entities);
