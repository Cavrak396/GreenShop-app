export const NUM_OF_ARTICLES = 50;
export const ITEMS_PER_PAGE = 9;
export const numOfPages = Math.ceil(NUM_OF_ARTICLES / ITEMS_PER_PAGE);
export const pages = Array.from({ length: numOfPages }, (_, i) => i + 1);
