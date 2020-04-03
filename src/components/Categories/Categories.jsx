import React from 'react';

import Tag from '~components/Tag';

import "./Categories.scss";

const getCategoryFromId = (id, categories) => {
  return categories.find((cat) => { return cat.id === id });
}

const Categories = ({ categoryIds, categories, onClose }) => {
  return (
    <div className="categories">
      {
        categoryIds.map((catId) => {
          const category = getCategoryFromId(catId, categories);
          if (category) {
            return <Tag
              name={category.name}
              icon={category.icon}
              key={category.id}
              onClose={onClose && (() => { onClose(category.id) })}
            />; 
          }
          return undefined;
        })
      }
    </div>
  );
}

export default Categories;
export { getCategoryFromId };
