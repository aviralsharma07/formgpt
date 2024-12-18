// types/form.ts

import { QuestionItem } from "./formItemKinds/questionItem";

// Base form interface
interface IForm {
  formId: string;
  info: IFormInfo;
  settings: IFormSettings;
  items: IFormItem[];
  revisionId: string;
  responderUri: string;
  linkedSheetId?: string; // Optional as not all forms will have linked sheets
}

// We'll expand these interfaces as we get their detailed structures
interface IFormInfo {
  title: string;
  documentTitle: string;
  description?: string;
}

interface IFormSettings {
  // Placeholder - will be expanded when we see the FormSettings object structure
}

interface IFormItem {
  itemId: string;
  title: string;
  description?: string;

  kind: FormItemKind;
}

// Enum for the different types of form items
export type FormItemKind = { questionItem: QuestionItem } | { questionGroupItem: QuestionGroupItem } | { pageBreakItem: PageBreakItem } | { textItem: TextItem } | { imageItem: ImageItem } | { videoItem: VideoItem };
