const express = require("express");
const router = express.Router();
const {
  validationRules,
  validate,
} = require("../../validations/comment-validator");
const commentController = require("./comment-controller");
const ensuredAuthenticated = require("../../middleware/verifyJWT");

router
  //:blogId/add Truyền thêm blogId vào URL để qua bên controller lấy ra blogId
  .route("/add")
  .post(
    validationRules(),
    validate,
    ensuredAuthenticated,
    commentController.addOne
  );

router
  .route("/delete/:id")
  .delete(ensuredAuthenticated, commentController.removeOne);

module.exports = router;
