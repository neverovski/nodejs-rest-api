import { PageMetaParameters } from '@common/types';

import { PageOptionDto } from './page-option.dto';

export class PageMetaDto {
  readonly hasNextPage!: boolean;
  readonly hasPrevPage!: boolean;
  readonly itemCount!: number;
  readonly limit!: number;
  readonly page!: number;
  readonly pageCount!: number;

  constructor({ pageOption, itemCount }: PageMetaParameters<PageOptionDto>) {
    this.limit = pageOption.limit || itemCount;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.limit);

    this.page = this.transformPage(pageOption);
    this.hasPrevPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }

  private transformPage(
    pageOption: PageMetaParameters<PageOptionDto>['pageOption'],
  ) {
    return pageOption?.page > this.pageCount
      ? this.pageCount + 1
      : pageOption.page || 1;
  }
}
