const authMiddleware = require("../middleware/authMiddleware");

router.get(
  "/dashboard",
  authMiddleware,
  (req, res) => {
    res.json({
      message: "Access granted"
    });
  }
);