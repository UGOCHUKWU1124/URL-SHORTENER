import * as controller from "../controller/url.controller";
import { Router } from "express";
import { validate } from "../../packages/middleware/validate";
import {
    createShortUrlSchema,
    updateShortUrlSchema,
    shortCodeParamSchema
} from "../utils/validator/url.schema";


const router = Router();

router.get("/:shortCode", validate(shortCodeParamSchema), controller.redirectToOriginalUrl);
router.get("/stats/:shortCode", validate(shortCodeParamSchema), controller.getUrlStats);
router.post("/shorten", validate(createShortUrlSchema), controller.shortenUrl);
router.put("/shorten/:shortCode", validate(updateShortUrlSchema), controller.updateUrl);
router.delete("/shorten/:shortCode", validate(shortCodeParamSchema), controller.deleteUrl);


export default router;