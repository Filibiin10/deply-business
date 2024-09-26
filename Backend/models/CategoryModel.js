import Category from './path/to/Category'; // Adjust the path as necessary

const insertCategory = async (name, subcategories = [], images = []) => {
  try {

    const newCategory = new Category({
      name,
      subcategories,
      images,
    });

    const savedCategory = await newCategory.save();
    console.log('Category inserted:', savedCategory);
  } catch (error) {
    console.error('Error inserting category:', error);
  }

// Usage example:
insertCategory('Electronics', [], [
  { image: 'https://www.flaticon.com/free-icon/shopping-bags_4273228?term=shopping&page=1&position=61&origin=search&related_id=4273228', contentType: 'image/png' },
  { image: 'https://www.flaticon.com/free-icon/breakfast_10815517?term=daily+products&page=1&position=46&origin=search&related_id=10815517', contentType: 'image/png' },
]);

}