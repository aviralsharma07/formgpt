import { ChoiceQuestion } from "./formItemKinds/questionItem/choiceQuestion";
import { DateQuestion } from "./formItemKinds/questionItem/dateQuestion";
import { RatingQuestion } from "./formItemKinds/questionItem/ratingQuestion";
import { ScaleQuestion } from "./formItemKinds/questionItem/scaleQuestion";
import { TextQuestion } from "./formItemKinds/questionItem/textQuestion";
import { TimeQuestion } from "./formItemKinds/questionItem/timeQuestion";

// Question structure with discriminated union
type QuestionType = {
  required: boolean;
} & ({ choiceQuestion: ChoiceQuestion } | { textQuestion: TextQuestion } | { scaleQuestion: ScaleQuestion } | { dateQuestion: DateQuestion } | { timeQuestion: TimeQuestion } | { ratingQuestion: RatingQuestion });

// Form item structure
interface FormItem {
  createItem: {
    item: {
      title: string;
      questionItem: {
        question: QuestionType;
      };
    };
    location: {
      index: number;
    };
  };
}

export interface FormGeneratorResponse {
  initialForm: {
    info: {
      title: string;
      description: string;
    };
  };
  batchUpdate: {
    requests: FormItem[];
    includeFormInResponse: true;
  };
}

// Type guard functions to validate response
function isValidQuestionType(question: QuestionType): boolean {
  const questionTypes = ["choiceQuestion", "textQuestion", "scaleQuestion", "dateQuestion", "timeQuestion", "ratingQuestion"];

  return questionTypes.some((type) => type in question);
}

export function validateFormResponse(response: FormGeneratorResponse): boolean {
  try {
    // Check initial form structure
    if (!response.initialForm?.info?.title) return false;

    // Check batch update structure
    if (!Array.isArray(response.batchUpdate?.requests)) return false;

    // Validate each request
    return response.batchUpdate.requests.every((item, index) => {
      const formItem = item as FormItem;

      // Check basic structure
      if (!formItem.createItem?.item?.title) return false;
      if (!formItem.createItem?.item?.questionItem?.question) return false;

      // Validate index sequence
      if (formItem.createItem.location.index !== index) return false;

      // Validate question type
      return isValidQuestionType(formItem.createItem.item.questionItem.question);
    });
  } catch {
    return false;
  }
}

// Usage example:
const processFormResponse = (response: unknown): FormGeneratorResponse => {
  const typedResponse = response as FormGeneratorResponse;

  if (!validateFormResponse(typedResponse)) {
    throw new Error("Invalid form response structure");
  }

  return typedResponse;
};
