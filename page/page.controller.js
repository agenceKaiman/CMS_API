
import {
  createPage,
  deletePage,
  listPages,
  pageDetails,
  savePageContent,
  updatePage,
} from './page.services';

export const create = async (req, res) => {
  const pageBody = req.body;
  const page = await createPage(pageBody);
  res.json(page);
};
export const list = async (req, res) => {
  const pages = await listPages();
  res.json(pages);
};
export const details = async (req, res) => {
  const { pageId } = req.params;
  const details = await pageDetails(pageId);
  res.json(details);
};
export const deletePageRecord = async (req, res) => {
  const { pageId } = req.params;
  const data = await deletePage(pageId);
  res.json(data);
};
export const update = async (req, res) => {
  const { pageId } = req.params;
  const pageBody = req.body;
  const page = await updatePage(pageId, pageBody);
  res.json(page);
};
export const changeContent = async (req, res) => {
  const { pageId } = req.params;
  const data = req.body;
  console.log('Données reçues par le backend :', pageId, data);
  
  try {
    const pageContent = await savePageContent(pageId, data);
    res.json(pageContent);
    console.log(pageContent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la sauvegarde du contenu de la page.' });
  }
};
export const loadContent = async (req, res) => {
  const { pageId } = req.params;
  res.header('Content-Type', 'application/json');
  const pageData = await pageDetails(pageId);
  res.json(pageData.content);
};
