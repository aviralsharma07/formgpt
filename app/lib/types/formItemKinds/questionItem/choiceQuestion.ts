import { Image } from "../common/image";

// Enum for choice types
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
  value: string; // The text or value of the option
  image?: Image; // Optional image associated with the option
  isOther: boolean; // Whether this option is an "Other" option
  goToAction?: GoToAction; // Action to go to a specific section (optional)
  goToSectionId?: string; // Section ID to go to (optional)
}

export interface ChoiceQuestion {
  type: ChoiceType; // Type of the choice question (RADIO, CHECKBOX, or DROP_DOWN)
  options: Option[]; // List of options available for the question
  shuffle: boolean; // Whether the options should be shuffled
}
