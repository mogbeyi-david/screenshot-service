import express from 'express';
const router = express.Router();
import * as ScreenShotController from '../controller/screenshot';

// snap website
router.post('/snap', ScreenShotController.snapWebsite);

export default router;
