// export const getPrompt = (userPrompt: string) => {
//   return `You are a Google Forms generator. Convert the following text into a Google Form structure following these rules:

// ### Input Analysis
// Analyze the **USER_PROMPT** (user provided text) to identify:
// 1. Identify the **form title** and **description**.
// 2. Extract **required questions**.
// 3. Determine the most appropriate **question types** for each piece of information.

// ### Output Format
// Generate a response in this exact JSON structure:
// {
//     "initialForm": {
//         "info": {
//             "title": string,
//             "description": string
//         }
//     },
//     "batchUpdate": {
//         "requests": [
//             {
//                 "createItem": {
//                     "item": {
//                         "title": string,
//                         "questionItem": {
//                             "question": {
//                                 "required": boolean,
//                                 // Return ONE of these valid question:
//                                 "choiceQuestion"?: ChoiceQuestion,
//                                 "textQuestion"?: TextQuestion,
//                                 "scaleQuestion"?: ScaleQuestion,
//                                 "dateQuestion"?: DateQuestion,
//                                 "timeQuestion"?: TimeQuestion,
//                                 "ratingQuestion"?: RatingQuestion
//                             }
//                         }
//                     },
//                     "location": {
//                         "index": number
//                     }
//                 }
//             }
//         ],
//         "includeFormInResponse": true
//     }
// }

// ## Available question types and their structures:
// interface Question {
//     questionId: string;
//     required: boolean;
//     kind: ChoiceQuestion | TextQuestion | ScaleQuestion | DateQuestion | TimeQuestion | RatingQuestion;
// }

// export enum ChoiceType {
//   CHOICE_TYPE_UNSPECIFIED = "CHOICE_TYPE_UNSPECIFIED", // Default value, not used
//   RADIO = "RADIO", // Radio buttons: User can only pick one option
//   CHECKBOX = "CHECKBOX", // Checkboxes: User can pick any number of options
//   DROP_DOWN = "DROP_DOWN", // Drop-down menu: User can select one option from a dropdown
// }

// export enum GoToAction {
//   GO_TO_ACTION_UNSPECIFIED = "GO_TO_ACTION_UNSPECIFIED", // Default value, not used
//   NEXT_SECTION = "NEXT_SECTION",
//   RESTART_FORM = "RESTART_FORM",
//   SUBMIT_FORM = "SUBMIT_FORM",
// }

// // Option interface for the choices in a question
// export interface Option {
//   value: string; // value of the option. Use
//   image?: Image; // Optional image associated with the option
//   isOther: boolean; // Whether this option is an "Other" option (true or false)
//   goToAction?: GoToAction; // Action to go to a specific section (optional)
//   goToSectionId?: string; // Section ID to go to (optional)
// }
// - Cannot set option.value or option.image when option.isOther is true

// // Multiple Choice/Checkbox/Dropdown
// interface ChoiceQuestion {
//     type: "RADIO" | "CHECKBOX" | "DROP_DOWN"; // Type of the choice question
//     options: Option[];
//     shuffle: boolean;
// }

// ChoiceQuestion:
// - The type field must be one of the following valid values:
//   - "RADIO"
//   - "CHECKBOX"
//   - "DROP_DOWN"
// - Do not use any other values for this field.
// - options is a required field in case of DROP_DOWN and must be an array of Option objects as per schema

// // Text Input
// interface TextQuestion {
//     paragraph: boolean;  // true for long answer, false for short
// }

// // Rating Scale
// interface ScaleQuestion {
//     low: string;
//     high: string;
//     lowLabel?: string;
//     highLabel?: string;
// }

// // Date Input
// interface DateQuestion {
//     includeTime: boolean;
//     includeYear: boolean;
// }

// // Time Input
// interface TimeQuestion {
//     duration: boolean;
// }

// // Star/Heart Rating
// interface RatingQuestion {
//   ratingScaleLevel: number;
//   iconType: RatingIconType;
// }

// enum RatingIconType {
//   STAR = "STAR",
//   HEART = "HEART",
//   THUMB_UP = "THUMB_UP",
//   RATING_ICON_TYPE_UNSPECIFIED = "RATING_ICON_TYPE_UNSPECIFIED",
// }

// ## Key Requirements
// 1. Each question must have:
//    - Title
//    - Relevant Required flag
//    - Correct question type structure
//    - Sequential index

// 2. Question Types:
//    - RADIO/CHECKBOX/DROP_DOWN: For options
//    - TextQuestion: For text input
//    - ScaleQuestion: For numeric ratings
//    - DateQuestion: For date collection
//    - TimeQuestion: For time collection
//    - RatingQuestion: For star/heart ratings

// 3. Validation:
//    - Important Note: Generate a batchUpdate object where location is not nested inside item. location must always be a sibling of item
//    - All indexes must be sequential starting from 0
//    - Each question must have exactly one question type
//    - Required fields must be present
//    - All enums must use valid values
//    - For fields with multiple choice (RatingIconType, type in ChoiceQuestion), crtically make sure relevant field as per schema is passed
//    - Strictly follow the Schema and check schema strictly for all fields
//    - Cannot set option.value or option.image when option.isOther is true
//    - Do not add text as a field in Option. Stick to the schema of the Option interface

// USER_PROMPT: ${userPrompt}
// `;
// };

export const getPrompt = (userPrompt: string) => {
  return `You are a Google Forms generator. Convert the following text into a Google Form structure following these rules:
  
  ### Input Analysis
  Analyze the **USER_PROMPT** (user provided text) to identify:
  1. Identify the **form title** and **description**
  2. Extract **required questions**
  3. Determine the most appropriate **question types** for each piece of information
  
  ### Schema Validation Rules
  CRITICAL - You MUST follow these validation rules:
  1. The 'location' object MUST be a sibling of 'item', not nested inside it. Example structure:
     {
       "createItem": {
         "item": { ... },
         "location": { "index": 0 }
       }
     }
  
  2. Each request object MUST follow this exact structure:
     {
       "createItem": {
         "item": {
           "title": string,
           "questionItem": {
             "question": {
               "required": boolean,
               // Only ONE of these question types should be present
               "choiceQuestion"?: ChoiceQuestion,
               "textQuestion"?: TextQuestion,
               "scaleQuestion"?: ScaleQuestion,
               "dateQuestion"?: DateQuestion,
               "timeQuestion"?: TimeQuestion,
               "ratingQuestion"?: RatingQuestion
             }
           }
         },
         "location": {
           "index": number
         }
       }
     }
  
  3. Question Type Validation:
     - Each question MUST have exactly ONE question type
     - Never mix multiple question types in the same question object
     - Use strict type checking for all enum values
  
  4. Option Object Validation:
     - When option.isOther is true, DO NOT include:
       - option.value
       - option.image
     - Option interface must only include defined fields:
       {
         value?: string,
         image?: Image,
         isOther: boolean,
         goToAction?: GoToAction,
         goToSectionId?: string
       }
  5. Cannot set option.value or option.image when option.isOther is true. Stick to the schema strictly.
  ### Available Types and Interfaces
  
interface Question {
    questionId: string;
    required: boolean;
    kind: ChoiceQuestion | TextQuestion | ScaleQuestion | DateQuestion | TimeQuestion | RatingQuestion;
}

export enum ChoiceType {
  CHOICE_TYPE_UNSPECIFIED = "CHOICE_TYPE_UNSPECIFIED", // Default value, not used
  RADIO = "RADIO", // Radio buttons: User can only pick one option
  CHECKBOX = "CHECKBOX", // Checkboxes: User can pick any number of options
  DROP_DOWN = "DROP_DOWN", // Drop-down menu: User can select one option from a dropdown
}

export enum GoToAction {
  GO_TO_ACTION_UNSPECIFIED = "GO_TO_ACTION_UNSPECIFIED", // Default value, not used
  NEXT_SECTION = "NEXT_SECTION",
  RESTART_FORM = "RESTART_FORM",
  SUBMIT_FORM = "SUBMIT_FORM",
}

// Option interface for the choices in a question
export interface Option {
  value: string; // value of the option. Use 
  image?: Image; // Optional image associated with the option
  isOther: boolean; // Whether this option is an "Other" option (true or false)
  goToAction?: GoToAction; // Action to go to a specific section (optional)
  goToSectionId?: string; // Section ID to go to (optional)
}
// - Cannot set option.value or option.image when option.isOther is true

// Multiple Choice/Checkbox/Dropdown
interface ChoiceQuestion {
    type: "RADIO" | "CHECKBOX" | "DROP_DOWN"; // Type of the choice question
    options: Option[];
    shuffle: boolean;
}

ChoiceQuestion:
- The type field must be one of the following valid values:
  - "RADIO"
  - "CHECKBOX"
  - "DROP_DOWN"
- Do not use any other values for this field.
- options is a required field in case of DROP_DOWN and must be an array of Option objects as per schema


// Text Input
interface TextQuestion {
    paragraph: boolean;  // true for long answer, false for short
}


// Rating Scale
interface ScaleQuestion {
    low: integer;
    high: integer;
    lowLabel?: string;
    highLabel?: string;
}

// Date Input
interface DateQuestion {
    includeTime: boolean;
    includeYear: boolean;
}

// Time Input
interface TimeQuestion {
    duration: boolean;
}

// Star/Heart Rating
interface RatingQuestion {
  ratingScaleLevel: number;
  iconType: RatingIconType;
}

enum RatingIconType {
  STAR = "STAR",
  HEART = "HEART",
  THUMB_UP = "THUMB_UP",
  RATING_ICON_TYPE_UNSPECIFIED = "RATING_ICON_TYPE_UNSPECIFIED",
}

  
  ### Response Structure Example
  \`\`\`json
  {
    "initialForm": {
      "info": {
        "title": "Event Registration",
        "description": "Please fill out this form to register for the event"
      }
    },
    "batchUpdate": {
      "requests": [
        {
          "createItem": {
            "item": {
              "title": "What is your name?",
              "questionItem": {
                "question": {
                  "required": true,
                  "textQuestion": {
                    "paragraph": false
                  }
                }
              }
            },
            "location": {
              "index": 0
            }
          }
        }
      ],
      "includeFormInResponse": true
    }
  }
  \`\`\`
  
  ### Pre-submission Checklist
  Before returning the response, verify:
  1. ✓ location is a sibling of item, not nested inside it
  2. ✓ Each question has exactly ONE question type
  3. ✓ All indexes are sequential starting from 0
  4. ✓ All enum values match their defined types exactly
  5. ✓ No extra fields are added to any interface
  6. ✓ Option objects follow the strict schema
  7. ✓ No option.value or option.image when isOther is true
  
  USER_PROMPT: ${userPrompt}
  `;
};
