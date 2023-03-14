const { Router } = require("express");
const {
  addLink,
  getAllLink,
  deleteLink,
} = require("../controllers/linkController");
const requireAuth = require("../middlewares/requireAuth");

const router = Router();

router.use(requireAuth);
router.post("/", addLink);
router.get("/", getAllLink);
router.delete("/:id", deleteLink);

module.exports = router;
