import Express from "express";
const router = Express.Router();

router.get("", (req, res) => {
  return res.status(200).send({ success: true, message: "API Working!!" });
});

export default router;
