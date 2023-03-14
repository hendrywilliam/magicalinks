const { Router } = require("express");
const { addLink } = require("../controllers/linkController");
const requireAuth = require("../middlewares/requireAuth");

const router = Router();

router.use(requireAuth);
router.post("/", addLink);

module.exports = router;
