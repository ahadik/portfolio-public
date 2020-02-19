import React from 'react';

import Tag from '../Tag';

const getCategoryFromId = (id, categories) => {
  return categories.find((cat) => { return cat.id === id });
}

const Categories = ({ categoryIds, categories, onClose }) => {

  return (
    <div style={{ display: 'flex', 'flexDirection': 'row' }} className="inline__children--3">
      {
        categoryIds.map((catId) => {
          const category = getCategoryFromId(catId, categories);
          return <Tag
            name={category.name}
            icon={category.icon}
            key={category.id}
            onClose={onClose && (() => { onClose(category.id) })}
          />; 
        })
      }
    </div>
  );
}

export default Categories;
export { getCategoryFromId };
