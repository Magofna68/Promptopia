'use client'
import { useState, useEffect } from 'react'
import PromptCard from './PromptCard';
import ClearIcon from '@mui/icons-material/Clear';

const PromptCardList = ({
  data, handleTagClick, searchQueryList, showSearch, setShowSearch, 
}) => {
  const [ postData, setPostData ] = useState(data);

    useEffect(() => {
      if (searchQueryList && searchQueryList.length > 0) {
        setShowSearch(true);
        setPostData(searchQueryList);
      } else if (searchQueryList === [] || searchQueryList.length === 0 || searchQueryList === undefined) {
        setShowSearch(false);
        setPostData(data);
      }
    }, [searchQueryList])

  return (
    <div className='mt-16 prompt_layout'>
      {
        postData && showSearch ? (
        postData.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))
      ) : (
        data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))
      )}
    </div>
  );
};

const Feed = () => {
  const [ searchText, setSearchText ] = useState("");
  const [ allPosts, setAllPosts ] = useState([]);
  const [ searchQueryList, setSearchQueryList ] = useState([])
  const [ showSearch, setShowSearch ] = useState(false);
  
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch('/api/prompt');
      console.log("RESPONSE: ", response)
      const data = await response.json();
      setAllPosts(data);
    }
    fetchPost();
  }, [])

  const handleSearchChange = (e) => {
    let searchedValue = e.target.value;
    setSearchText(searchedValue);
    handleQuery(searchedValue, allPosts, false);

  }

  const displayResults = (searchQueryList, allPosts) => {
    // searchQueryList === array of postIds
    let finalResults = []

    searchQueryList?.forEach(query => {
      let results = allPosts.filter(post => post._id.includes(query));
      finalResults = finalResults.concat(results)
    });
    return finalResults
  };

  const handleQuery = (searchedValue, allPosts, tagClick) => {
    if (tagClick === false) { 
    // will only run if directed from handleSearchChange
      setSearchText(searchedValue)
      const searchTransformed = searchedValue.toLowerCase();

      let tagIds = [];
      for (let i = 0; i < allPosts.length; i++) {
        allPosts[i].tagList.forEach(tag => {
          if (tag.toLowerCase() === searchTransformed) {
            tagIds.push(allPosts[i]._id);
          } else {
            console.log("Tag: ", tag);
          }
        });
      }
      const displayQuery = displayResults(tagIds, allPosts);
      setSearchQueryList(displayQuery);
    } else {
      setSearchText("")
      const searchTransformed = searchedValue.tag.toLowerCase();
      setSearchText(searchedValue.tag)
      
      let tagIds = [];
      for (let i = 0; i < allPosts.length; i++) {
        allPosts[i].tagList.forEach(tag => {
          if (tag === searchTransformed) {
            tagIds.push(allPosts[i]._id);
          } else {
            console.log("Tag: ", tag);
          }
        });
      }
      const displayQuery = displayResults(tagIds, allPosts);
      setSearchQueryList(displayQuery);
    }
    displayResults();
  };


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchChange(e);
    }
  }

  const handleClearSearch = () => {
    setSearchText("")
    setSearchQueryList([]);
  }

  return (
    <section className="feed">
      <form className='relative w-full flex-center'>
          <input
            type='text'
            placeholder='Search for a tag or username'
            value={searchText}
            onChange={(e) => handleSearchChange(e)}
            onKeyDown={handleKeyDown}
            required
            className='search_input peer'
          />
          <span className='clearIcon' onClick={handleClearSearch}><ClearIcon /></span>
      </form>
      <PromptCardList 
        data={allPosts}
        handleTagClick={(e) => {handleQuery(e, allPosts, true)}}
        searchQueryList={searchQueryList}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
      />
    </section>
  )
}

export default Feed;