import { Image } from "../common/image";
import { Question } from "../questionItem";
import { ChoiceQuestion } from "../questionItem/choiceQuestion";

export interface Grid {
  columns: ChoiceQuestion[];
  shuffleQuestions?: boolean;
}

export interface QuestionGroupItem {
  questions: Question[];
  image: Image;
  grid: Grid;
}
