export interface RatingQuestion {
  ratingScaleLevel: number;
  iconType: RatingIconType;
}

export enum RatingIconType {
  STAR = "STAR",
  HEART = "HEART",
  THUMB_UP = "THUMB_UP",
  RATING_ICON_TYPE_UNSPECIFIED = "RATING_ICON_TYPE_UNSPECIFIED",
}
