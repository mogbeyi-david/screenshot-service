import express from 'express';
const router = express.Router();
import * as ScreenShotController from '../controller/screenshot';
import * as ScreenShotMiddleware from '../middlewares/screenshot';
import * as ScreenShotValidation from '../validations/screenshot';

// snap website
router.post(
  '/snap',
  ScreenShotValidation.validateSnapScreenshot,
  ScreenShotMiddleware.checkInRedis,
  ScreenShotController.snapWebsite,
);

//Get screenshot by Identifier
router.get('/:identifier', ScreenShotController.getByIdentifier);

export default router;
