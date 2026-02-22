const nlp = require("compromise");

/* ─────────────────────────────────────────────
   1️⃣ Noise & Stopwords (opinionated)
───────────────────────────────────────────── */

// const STOP_VERBS = ["will", "should", "be", "have", "get", "do", "able"];
const STOP_VERBS = ["will", "should", "be", "have", "get", "do", "able"];

const STOP_NOUNS = ["user", "system", "application", "app"];

/* ─────────────────────────────────────────────
   2️⃣ Universal Signal Regex (feature-agnostic)
───────────────────────────────────────────── */

const SIGNAL_REGEX = {
  negative: /invalid|incorrect|failed|error|wrong|unable/i,
  prohibition: /should not|must not|cannot|can't|not allowed/i,
  stateChange:
    /lock|locked|unlock|unlocked|enable|disable|delete|create|update/i,
  resend: /resend|retry|again/i,
};

/* ─────────────────────────────────────────────
   3️⃣ Constraint Extractors (facts, not meaning)
───────────────────────────────────────────── */

function extractConstraints(sentence) {
  return {
    count: sentence.match(
      /\b(\d+)\s*(?:\w+\s+)?(times?|attempts?|tries?)\b/i,
    )?.[1]
      ? Number(
          sentence.match(
            /\b(\d+)\s*(?:\w+\s+)?(times?|attempts?|tries?)\b/i,
          )[1],
        )
      : null,

    time:
      sentence.match(/\b(\d+)\s*(seconds?|minutes?|hours?)\b/i)?.[0] || null,
  };
}

/* ─────────────────────────────────────────────
   4️⃣ Action & Entity Extraction (light NLP)
───────────────────────────────────────────── */

function extractActionAndEntity(sentence) {
  const d = nlp(sentence);

  const verbs = d.verbs().out("array");
  const nouns = d.nouns().out("array");

  const action =
    [...verbs].reverse().find((v) => !STOP_VERBS.includes(v.toLowerCase())) ||
    null;

  const entity =
    nouns.find((n) => !STOP_NOUNS.includes(n.toLowerCase())) || null;

  return { action, entity };
}

/* ─────────────────────────────────────────────
   5️⃣ Simple Rule Classifier
───────────────────────────────────────────── */

function classifyFlow(sentence, signals) {
  if (signals.negative || signals.prohibition) return "negative";
  if (/success|successfully|dashboard|completed/i.test(sentence))
    return "positive";
  return "neutral";
}

/* ─────────────────────────────────────────────
   6️⃣ Signal Aggregator (THE CORE)
───────────────────────────────────────────── */

function extractSignals(text) {
  const doc = nlp(text);
  const sentences = doc.sentences().out("array");

  return sentences.map((sentence) => {
    const constraints = extractConstraints(sentence);
    const { action, entity } = extractActionAndEntity(sentence);
    const signals = {
      negative: SIGNAL_REGEX.negative.test(sentence),
      prohibition: SIGNAL_REGEX.prohibition.test(sentence),
      stateChange: SIGNAL_REGEX.stateChange.test(sentence),
      resend: SIGNAL_REGEX.resend.test(sentence),
    };

    return {
      raw: sentence,

      action,
      entity,

      flow: classifyFlow(sentence, signals),

      constraints,
    };
  });
}

module.exports = { extractSignals };
