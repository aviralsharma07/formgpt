export interface FileUploadQuestion {
  folderId: string;
  types: FileType[];
  maxFiles: number;
  maxFileSize: number;
}

// Enum for File Types
export enum FileType {
  FILE_TYPE_UNSPECIFIED = "FILE_TYPE_UNSPECIFIED", // Default value, unused
  ANY = "ANY", // No restrictions on file type
  DOCUMENT = "DOCUMENT", // Google Docs document
  PRESENTATION = "PRESENTATION", // Google Slides presentation
  SPREADSHEET = "SPREADSHEET", // Google Sheets spreadsheet
  DRAWING = "DRAWING", // Google drawing
  PDF = "PDF", // PDF file
  IMAGE = "IMAGE", // Image file
  VIDEO = "VIDEO", // Video file
  AUDIO = "AUDIO", // Audio file
}
