import React from 'react';
import './style.scss';
import { TagFilterComponentProps } from './props';

const TagFilter: React.FC<TagFilterComponentProps> = ({
  searchText,
  handleSearchTextInputChange,
  handleClearClick,
  activeTags,
  isDropdownOpen,
  handleDropDownMenuChange,
  dropdownMenuRef,
  filteredTags,
  handleTagSelect,
}) => {
  return (
    <div className="tag-filter">
      <div className="tag-filter__search">
        <input
          type="text"
          placeholder="Search tags..."
          className="tag-filter__search-input"
          value={searchText}
          onChange={handleSearchTextInputChange}
        />
        <div className="tag-filter__clear-box">
          {searchText && (
            <button
              className="tag-filter__clear-button"
              onClick={handleClearClick}
            >
              &#10005;
            </button>
          )}
        </div>
      </div>
      <div className="tag-filter__dropdown">
        <button
          className={`tag-filter__dropdown-button ${
            activeTags?.length > 0 ? 'tag-filter__dropdown-button--active' : ''
          }`}
          disabled={isDropdownOpen}
          onClick={() => handleDropDownMenuChange(!isDropdownOpen)}
        >
          All Notes
        </button>
        <div
          className={`tag-filter__dropdown-menu ${
            isDropdownOpen ? 'tag-filter__dropdown-menu--open' : ''
          }`}
          ref={dropdownMenuRef}
        >
          <div
            className="tag-filter__dropdown-item tag-filter__dropdown-item--clear"
            onClick={() => handleTagSelect(null)}
          >
            CLEAR
          </div>
          {filteredTags.map((tag, index) => (
            <div
              key={index}
              className={`tag-filter__dropdown-item ${
                activeTags.includes(tag)
                  ? 'tag-filter__dropdown-item--active'
                  : ''
              }`}
              onClick={() => handleTagSelect(tag)}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagFilter;
