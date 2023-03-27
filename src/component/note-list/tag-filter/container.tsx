import React, { useCallback, useEffect, useRef, useState } from 'react';
import TagFilter from './component';
import { TagFilterContainerProps } from './props';
import { useAppDispatch, useAppSelector } from '../../../features/hooks/redux';
import { tagGetAll } from '../actions';

const TagFilterContainer: React.FC<TagFilterContainerProps> = ({
  activeTags,
  onTagSelect,
}) => {
  const dispatch = useAppDispatch();
  const tagsState = useAppSelector((x) => x.tagsReducer);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleTagSelect = (tag: string | null) => {
    if (tag === null) {
      setIsDropdownOpen(false);
    }
    onTagSelect(tag);
  };

  const handleClearClick = () => {
    fetchTags(null).catch();
    setSearchText('');
  };

  const handleSearchTextInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    fetchTags(e.target.value).catch();
    setSearchText(e.target.value);
  };
  const handleDropDownMenuChange = (open: boolean) => {
    setIsDropdownOpen(open);
  };

  const fetchTags = useCallback(
    async (searchQuery: string | null) => {
      await dispatch(tagGetAll(searchQuery));
    },
    [dispatch]
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

  useEffect(() => {
    if (isLoading) {
      fetchTags(null).catch();
      setIsLoading(false);
    }
  }, [fetchTags, isLoading]);

  return (
    <TagFilter
      searchText={searchText}
      handleSearchTextInputChange={handleSearchTextInputChange}
      handleClearClick={handleClearClick}
      activeTags={activeTags}
      isDropdownOpen={isDropdownOpen}
      handleDropDownMenuChange={handleDropDownMenuChange}
      dropdownMenuRef={dropdownMenuRef}
      filteredTags={tagsState.tags}
      handleTagSelect={handleTagSelect}
    />
  );
};

export default TagFilterContainer;
