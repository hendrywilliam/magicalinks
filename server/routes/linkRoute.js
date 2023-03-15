const { Router } = require("express");
const {
  addLink,
  getAllLink,
  deleteLink,
  updateLink,
  getPubLinks,
} = require("../controllers/linkController");
const requireAuth = require("../middlewares/requireAuth");

const router = Router();

/**
 * public routes goes here hehe siu
 */
router.get("/:username", getPubLinks);

/**
 * protected routes goes here
 */
router.use(requireAuth);
router.post("/", addLink);
router.get("/", getAllLink);
router.delete("/:id", deleteLink);
router.put("/:id", updateLink);

module.exports = router;
