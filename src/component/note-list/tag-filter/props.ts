import React from 'react';

export interface TagFilterContainerProps {
  activeTags: string[];
  onTagSelect: (tag: string | null) => void;
}

export interface TagFilterComponentProps {
  searchText: string;
  handleSearchTextInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearClick: () => void;
  activeTags: string[];
  isDropdownOpen: boolean;
  handleDropDownMenuChange: (open: boolean) => void;
  dropdownMenuRef: React.RefObject<HTMLDivElement>;
  filteredTags: string[];
  handleTagSelect: (tagId: string | null) => void;
}
