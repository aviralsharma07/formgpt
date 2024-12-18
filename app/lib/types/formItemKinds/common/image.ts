// Enum for Image Alignment
export enum Alignment {
  ALIGNMENT_UNSPECIFIED = "ALIGNMENT_UNSPECIFIED", // Default value, not used
  LEFT = "LEFT", // Left-aligned image
  RIGHT = "RIGHT", // Right-aligned image
  CENTER = "CENTER", // Center-aligned image
}

// Interface for Media Properties of the image
export interface MediaProperties {
  alignment: Alignment; // Alignment of the image
  width: number; // Width of the image (in pixels or percentage depending on context)
}

// Interface for the Image object
export interface Image {
  contentUri: string; // URI to the image content
  altText: string; // Alternative text for the image
  properties: MediaProperties; // Media properties (alignment, width, etc.)
  sourceUri?: string; // Optional field for image source URI (alternative source)
}
