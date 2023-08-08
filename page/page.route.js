import express from 'express';
import {
  changeContent,
  create,
  update,
  deletePageRecord,
  details,
  list,
  loadContent,
} from './page.controller';

const pageRoute = express.Router();
pageRoute.post('/', create);
pageRoute.post('/:pageId/change', changeContent);

pageRoute.put('/:pageId', update);

pageRoute.delete('/:pageId', deletePageRecord);

pageRoute.get('/:pageId', details);
pageRoute.get('/', list);
pageRoute.get('/:pageId/load', loadContent);

export default pageRoute;
