import { UserSimpleDto } from "../user-simple.dto";
import { PageableDto } from "../pageable.dto";
import { SortDto } from "../sort.dto";

export type GetUsersDto = {
  content: UserSimpleDto[];
  pageable: PageableDto;
  last: boolean;
  number: number;
  number_of_elements: number;
  size: number;
  sort: SortDto;
  total_elements: number;
  total_pages: number;
};
