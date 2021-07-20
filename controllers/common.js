exports.paging = (page, _limit, totalPost) => {
  const limit = _limit;
  const max_page = 10;
  let current_page = page ? parseInt(page) : 1;
  const hide_post = page === 1 ? 0 : (page - 1) * limit;
  const total_page = Math.ceil(totalPost / limit);

  if (current_page > total_page) {
    current_page = total_page;
  }

  const start_page = Math.floor((current_page - 1) / max_page) * max_page + 1;
  let end_page = start_page + max_page - 1;

  if (end_page > total_page) {
    end_page = total_page;
  }

  return {
    start_page,
    end_page,
    hide_post,
    limit,
    total_page,
    current_page,
  };
};

exports.searchKeyword = (Keyword) => {
  const search = new RegExp(Keyword, 'i');
  return search;
};
