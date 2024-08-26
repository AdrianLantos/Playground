import getQuestionObj from "../wordgame/questionsService.js";

export const ROUNDS = 5;
export const QUESTION_OBJ = getQuestionObj();
export const QUESTION = QUESTION_OBJ.question;
export const ANSWER = QUESTION_OBJ.answer.toUpperCase();
export const ANSWER_LENGTH = ANSWER.length;
