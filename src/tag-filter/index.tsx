import React, { useEffect, useRef, useState } from 'react';
import { TagType } from '../shared/types/note';
import './style.scss';

interface TagFilterProps {
  tags: TagType[];
  activeTagIds: string[];
  onTagSelect: (tagId: string | null) => void;
}

const TagFilter: React.FC<TagFilterProps> = ({
  tags,
  activeTagIds,
  onTagSelect,
}) => {
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const [searchText, setSearchText] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleTagSelect = (tagId: string | null) => {
    if (tagId === null) {
      setIsDropdownOpen(false);
    }
    onTagSelect(tagId);
  };

  const handleClearClick = () => {
    setSearchText('');
  };

  const filteredTags =
    searchText === ''
      ? tags
      : tags.filter((tag) =>
          tag.content.toLowerCase().includes(searchText.toLowerCase())
        );

  useEffect(() => {
    const handleClickOutsideMenu = (e: MouseEvent) => {
      if (
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutsideMenu);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideMenu);
    };
  }, []);

  return (
    <div className="tag-filter">
      <div className="tag-filter__search">
        <input
          type="text"
          placeholder="Search tags..."
          className="tag-filter__search-input"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
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
        <div
          className={`tag-filter__dropdown-button ${
            activeTagIds?.length > 0
              ? 'tag-filter__dropdown-button--active'
              : ''
          }`}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          All Notes
        </div>
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
          {filteredTags.map((tag) => (
            <div
              key={tag.id}
              className={`tag-filter__dropdown-item ${
                activeTagIds.includes(tag.id)
                  ? 'tag-filter__dropdown-item--active'
                  : ''
              }`}
              onClick={() => handleTagSelect(tag.id)}
            >
              {tag.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagFilter;
