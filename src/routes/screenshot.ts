import express from 'express';
const router = express.Router();
import * as ScreenShotController from '../controller/screenshot';
import * as ScreenShotMiddleware from '../middlewares/screenshot';

// snap website
router.post(
  '/snap',
  ScreenShotMiddleware.checkInRedis,
  ScreenShotController.snapWebsite,
);


//Get screenshot by Identifier
router.get('/:identifier', ScreenShotController.getByIdentifier);

export default router;
