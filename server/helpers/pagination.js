export const getPagination = (pagination) => {
  let { page, size } = pagination;
  const limit = Number(size) ? +Number(size) : 50;
  if (Number(page) > 0) {
    Number(page--);
  }
  const offset = Number(page) ? Number(page) * Number(limit) : 0;

  return { limit, offset };
};
export const getPagingData = (pagingData) => {
  const { data, limit } = pagingData;
  const { count, rows } = data;
  const pages = Math.ceil(count / limit);

  return { count, rows, pages };
};
