import Pages from './page.modal';
import cheerio from 'cheerio';

export const createPage = async (pageBody) => {
  const slug = pageBody.name.toLowerCase().split(' ').join('-');
  pageBody.slug = slug;
  const page = new Pages(pageBody);
  const pageResponse = await page.save();
  return pageResponse;
};
export const listPages = async () => {
  const pages = await Pages.find({});
  return pages;
};
export const deletePage = async (pageId) => {};
export const updatePage = async (pageId, pageBody) => {};
export const pageDetails = async (pageId) => {
  const pages = await Pages.findOne({ _id: pageId });
  return pages;
};
export const savePageContent = async (pageId, data) => {
  try {
    console.log('Taille des données à envoyer :', JSON.stringify(data).length);
    const pageUpdated = await Pages.findByIdAndUpdate(
      pageId,
      { content: data },
      { new: true }
    );
    return pageUpdated;
  } catch (error) {
    throw new Error('Erreur lors de la mise à jour du contenu de la page.');
  }
};


export const findPageById = async (pageId) => {
  const page = await Pages.findById(pageId);
  return page;
};
