// types/form.ts

import { Image, MediaProperties } from "./formItemKinds/common/image";
import { QuestionGroupItem } from "./formItemKinds/questionGroupItem";
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

interface QuizSettings {
  isQuiz: boolean;
}
interface IFormSettings {
  quizSettings?: QuizSettings;
}

interface IFormItem {
  itemId: string;
  title: string;
  description?: string;

  kind: FormItemKind;
}

// Enum for the different types of form items
export type FormItemKind = { questionItem: QuestionItem } | { questionGroupItem: QuestionGroupItem } | { pageBreakItem: {} } | { textItem: {} } | { imageItem: ImageItem } | { videoItem: VideoItem };

interface ImageItem {
  image: Image;
}

export interface Video {
  youtubeUri: string;
  properties: MediaProperties;
}

interface VideoItem {
  video: Video;
  caption: string;
}
