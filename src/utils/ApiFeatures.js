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
    filterObj = JSON.stringify(filterObj);
    filterObj = filterObj.replace(/(gt|gte|lt|lte)/g, (value) => `$${value}`);
    filterObj = JSON.parse(filterObj);
    const excludeFields = ["page", "sort", "fields", "search"];
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

  fields() {
    if (this.searchQuery.fields) {
      let selectedFields = this.searchQuery.fields.split(",").join(" ");
      this.mongooseQuery.select(selectedFields);
    }
    return this;
  }

  search() {
    if (this.searchQuery.search) {
      this.mongooseQuery.find({
        $or: [
          { title: { $regex: this.searchQuery.search, $option: "i" } },
          {
            description: { $regex: this.searchQuery.search, $option: "i" },
          },
        ],
      });
    }
    return this;
  }
}
