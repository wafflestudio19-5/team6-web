import { SortDto } from "./sort.dto";

export type PageableDto = {
  offset: number;
  page_number: number;
  page_size: number;
  paged: boolean;
  sort: SortDto;
  unpaged: boolean;
};
