'use client'
import { useState, useEffect } from 'react'
import PromptCard from './PromptCard';

const PromptCardList = ({data, handleTagClick, searchQueryList, showSearch, setShowSearch }) => {
  const [ postData, setPostData ] = useState(data);

  useEffect(() => {
   if (searchQueryList && searchQueryList.length > 0) {
    setShowSearch(true);
    setPostData(searchQueryList);
  } else if (searchQueryList === [] || searchQueryList.length === 0) {
    setShowSearch(false);
    setPostData(data);
  }
}, [searchQueryList, showSearch])

  // console.log("Posts: ", data)

  // console.log("searchQueryList: ", searchQueryList)
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

  const handleSearchChange = (e) => {
    setSearchText("");
    let searchedValue = e.target.value;
    // setSearchText(searchedValue);
    // console.log("SearchText: ", searchText)
    handleQuery(searchedValue, allPosts, false);
  }

  const displayResults = (searchQueryList, allPosts) => {
    // searchQueryList === array of postIds
    let finalResults = []
    console.log("SearchQueryList: ", searchQueryList)
    searchQueryList?.forEach(query => {
      let results = allPosts.filter(post => post._id.includes(query));
      finalResults = finalResults.concat(results)
    });
    return finalResults
  };

  const handleQuery = (searchedValue, allPosts, tagClick) => {
    setSearchText("");
    // let searchedValue = e.target.value;
    if (tagClick === false) { 
    // will only run if directed from handleSearchChange
      console.log("Search HIT:  ", searchedValue, tagClick)
      setSearchText(searchedValue)
      console.log("SearchText: ", searchText)
      const searchTransformed = searchText.toLowerCase();
      // console.log("handleTagClick", searchedValue)
       
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
      console.log("DisplayQuery: ", displayQuery)
      setSearchQueryList(displayQuery);
      return tagIds;
    } else {
      console.log("TagClick HIT")
      setSearchText("")
      const searchTransformed = searchedValue.tag.toLowerCase();
      setSearchText(searchedValue.tag)

      console.log("TAG Click: ", searchedValue.tag, tagClick)
      
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
      return tagIds;
    }
    displayResults();
    // console.log("TempArray: ", tempArray);
  
    // const tagIds = filteredPosts?.map(post => post._id);
  
    // setSearchQueryList(displayQuery)
    // displayResults();
    // console.log("searchQueryList", searchQueryList)
  };

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setAllPosts(data);
    }
    fetchPost();
  }, [])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }

  return (
    <section className="feed">
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or username'
          value={searchText}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          required
          className='search_input peer'
        />
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