export class ApiFeature {
  constructor(mongooseQuery, searchQuery) {
    this.mongooseQuery = mongooseQuery;
    this.searchQuery = searchQuery;
  }

  pagination() {
    let pageNumber = this.searchQuery.page * 1 || 1;
    if (this.searchQuery.page < 0) pageNumber = 1;
    const limit = 5;
    let skip = (pageNumber - 1) * limit;
    this.pageNumber = pageNumber;

    this.limit = limit;

    this.mongooseQuery.skip(skip).limit(limit);

    return this;
  }

  filter() {
    let filterObj = structuredClone(this.searchQuery);
    const excludeFields = ["page", "sort"];
    excludeFields.forEach((field) => delete filterObj[field]);
    this.mongooseQuery.find(filterObj);
    return this;
  }

  sort() {
    if (this.searchQuery.sort) {
      let sortedBy = this.searchQuery.sort.split(",").join(" ");
      this.mongooseQuery.sort(sortedBy);
    }
    return this;
  }
}
