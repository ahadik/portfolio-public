import React from 'react';
import _ from 'lodash';

import Filter from '~components/Filter';

import './FilteredContent.scss';

class FilteredContent extends React.Component {
  static isValidCategory(category, allCategories) {
    return !!allCategories.find((categoryEntry) => {
      return categoryEntry.id === category;
    });
  }

  static getPostCategories(edges, allCagetories) {
    return _.uniq(edges.reduce(
      (acc, { node }) => {
        // loop over every category on the node's frontmatter
        node.frontmatter.categories.forEach((postCatId) => {

          if (!FilteredContent.isValidCategory(postCatId, allCagetories)) {
            console.error(`The invalid category ID ${postCatId} was found on post ${node.fileAbsolutePath}`);
          }
        });
        return acc.concat(node.frontmatter.categories)
      },
      []
    ));
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const postCategories = FilteredContent.getPostCategories(nextProps.edges, nextProps.allCategories);

    let newState = {};

    if (!_.isEqual(prevState.postCategories.sort(), postCategories.sort())) {
      newState.postCategories = postCategories;
    }

    if (Object.keys(newState).length) {
      return newState;
    }

    return null;
  }

  constructor(props) {
    super(props);

    const { allCategories, queryStringFilter, edges } = props;

    this.allCategories = allCategories;

    this.getPostsForFilter = this.getPostsForFilter.bind(this);
    this.setFilter = this.setFilter.bind(this);

    const validatedQueryStrtingFilter = queryStringFilter && queryStringFilter.filter((entry) => {
      return FilteredContent.isValidCategory(entry, allCategories);
    });

    const postCategories = FilteredContent.getPostCategories(edges, allCategories);

    this.state = {
      selected: validatedQueryStrtingFilter || [],
      postCategories
    }
  }

  getPostsForFilter() {
    // If there are no filters selected, return all the posts
    if (this.state.selected.length === 0) {
      return this.props.edges;
    }
    return this.props.edges.filter(({ node }) => {
      for (let i = 0; i < node.frontmatter.categories.length; i++) {
        if (!!_.intersection(this.state.selected, node.frontmatter.categories).length) {
          return true;
        }
      }
      return false;
    });
  }

  setFilter(id) {
    this.setState((currState) => {
      return {
        selected: _.uniq(currState.selected.concat(id))
      }
    })
  }

  render() {
    const categories = this.allCategories.filter((category) => {
      return this.state.postCategories.includes(category.id);
    });

    return (
      <>
        <div className="row">
          <div className="col-12 filtered-content__filter-bar">
            <Filter
              allOptions={this.allCategories}
              options={categories}
              onToggleSelect={(id, isSelected) => {
                if (isSelected) {
                  this.setFilter(id);
                } else {
                  this.setState((currState) => {
                    return { selected: currState.selected.filter((catId) => { return catId !== id })}
                  });
                }
              }}
              selected={this.state.selected}
            />
          </div>
        </div>
        <article className="row">
          {
            this.getPostsForFilter().map(this.props.renderer)
          }
        </article>
      </>
    );
  }
}

export default FilteredContent;
