import { MetricType } from 'src/constants';

interface IQuery {
  page?: number;
  limit?: number;
  sortType?: number;
  sortBy?: string;
  unit?: string;
  type?: string;
}

interface ISearch {
  unit?: string;
  type?: string;
}

export const initialOptions = (query: IQuery) => {
  const page = query.page || 1;
  const limit = query.limit || 10;
  const skip = limit * (page - 1);
  const sortType = Number(query.sortType) || -1;
  const sortBy = query.sortBy || 'createdAt';
  const search: ISearch = {};

  if (query.type && (<any>Object).values(MetricType).includes(query.type)) {
    search.type = query.type;
  }

  return {
    page,
    limit,
    skip,
    sort: { [sortBy]: sortType },
    sortType,
    sortBy,
    search,
  };
};
