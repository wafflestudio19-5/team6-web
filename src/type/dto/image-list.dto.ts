import { ImageDto } from "./image.dto";

export type ImageListDto = {
  contents: ImageDto[];
  count: number;
};
