import express from 'express';
import { nanoid } from 'nanoid';
import Url from '../models/Url.js';
import { validateUrl } from '../utils/utils.js';
import dotevn from 'dotenv';
dotevn.config({path: '../config/.env'});

const router  = express.Router();

//Short URL Generator
router.post('/short', async (req, res) => {
    const {origUrl} = req.body;
    const base = process.env.BASE;

    const UrlId = nanoid(8);

    if(validateUrl(origUrl)) {
        try {
            let url = await Url.findOne ({ origUrl });
            if(url){
                res.json(url);
            } else {
                const shortUrl = `${base}/${UrlId}`;

                url = new Url ({
                    origUrl,
                    shortUrl,
                    UrlId,
                    date: new Date(),
                });

                await url.save();
                res.json(url);
            } 
        } catch ( err ){
            console.log(err);
            res.status(500).json(`Server Error`);
        }
    } else {
        res.status(400).json('Invalid Object Url');
    }
});

export default router;