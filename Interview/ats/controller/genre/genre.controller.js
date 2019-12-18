const Genre = require("../../model/genre.model");
let allCategoryName = [];
let allDesignationList = [];
module.exports = {
  allCategory: (req, res) => {
    Genre.find({}, (err, data) => {
      if (err) throw err;
      else {
        allCategoryName = data;
        res.status(200).send(allCategoryName);
      }
    });
  },
  allDesignation: (req, res) => {
    Genre.findById(req.params.category, (err, categoryData) => {
      if (err) throw err;
      allDesignationList = categoryData.designation;
      res.status(200).send(allDesignationList);
    });
  }
};
