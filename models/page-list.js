// 分页插件
// 当前页码，每页条数，模板, 外键, 查询参数, 排序方式
const pageQuery = async (page, pageSize, Model, populate, queryParams, fields, sortParams) => {
  let start = (page - 1) * pageSize
  let $page = {
    pageNumber: page
  }
  const count = await Model.count(queryParams, (err, count) => {
    // done(err, count)
  })
  const records = await Model.find(queryParams, fields, sortParams, (err, doc) => {
    // done(err, doc)
  }).skip(start).limit(pageSize).populate(populate)
  $page.pageCount = (count - 1) / pageSize + 1
  $page.results = records.map(item => {
    return {
      ...item._doc
    }
  })
  $page.count = count
  return $page
}

module.exports = {
  pageQuery: pageQuery
}
