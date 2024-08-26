const questionObjecst = [
  { question: "What is the name of a sybirean dog breed?", answer: "husky" },
  {
    question:
      "What dog breed holds the records for the longest toung of a dog?",
    answer: "BOXER",
  },
  {
    question:
      "Name the cross breed of Yorkshire Terrier and Australian Terrier?",
    answer: "SILKY",
  },
];

export default function getQuestionObj() {
  return questionObjecst[Math.floor(Math.random() * questionObjecst.length)];
}
