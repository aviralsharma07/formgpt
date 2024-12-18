import { Image } from "../common/image";
import { ChoiceQuestion } from "./choiceQuestion";
import { DateQuestion } from "./dateQuestion";
import { FileUploadQuestion } from "./fileUploadQuestion";
import { Grading } from "./grading";
import { RatingQuestion } from "./ratingQuestion";
import { RowQuestion } from "./rowQuestion";
import { ScaleQuestion } from "./scaleQuestion";
import { TextQuestion } from "./textQuestion";
import { TimeQuestion } from "./timeQuestion";

export interface QuestionItem {
  question: Question;
  image?: Image;
}

export interface Question {
  questionId: string;
  required: boolean;
  grading?: Grading;

  // Union field kind: One of the following question types
  kind: ChoiceQuestion | TextQuestion | ScaleQuestion | DateQuestion | TimeQuestion | FileUploadQuestion | RowQuestion | RatingQuestion;
}
