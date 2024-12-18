export interface Feedback {
  text: string; // Feedback text
  material?: ExtraMaterial[]; // Additional material for the feedback
}

export interface ExtraMaterial {
  link?: TextLink;
  video?: VideoLink;
}

export interface TextLink {
  uri: string;
  dispalyText: string;
}

export interface VideoLink {
  youtubeUri: string;
  dispalyText: string;
}

export interface CorrectAnswers {
  answers: CorrectAnswer[]; // Array of correct answers
}

// CorrectAnswer interface
export interface CorrectAnswer {
  value: string; // Correct answer
}

export interface Grading {
  pointValue: number; // Points assigned to the question
  correctAnswers: CorrectAnswers; // Correct answers for the question
  whenRight?: Feedback; // Feedback when the answer is correct
  whenWrong?: Feedback; // Feedback when the answer is incorrect
  generalFeedback?: Feedback; // General feedback, regardless of the correctness
}
