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


  console.log("searchQueryList: ", searchQueryList)
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
    // e.preventDefault();
    console.log("E: ", e)
    console.log("AllPosts: ", allPosts)
    let searchedValue = e.target.value;
    
    setSearchText(searchedValue);
    handleQuery(searchedValue, allPosts);
    // displayResults();
    console.log("AllPosts: ", allPosts)
  }

  const displayResults = (searchQueryList, allPosts) => {
    let finalResults = []
    searchQueryList?.forEach(query => {
      let results = allPosts.filter(post => post._id.includes(query));
      finalResults = finalResults.concat(results)
    });
    return finalResults
  };

  const handleQuery = (searchedValue, allPosts) => {
    const searchTransformed = '#' + searchedValue.toLowerCase();
    console.log("handleQuery: ", searchedValue)
    const filteredPosts = allPosts?.filter(post => {
      const splitTags = post.tag.toLowerCase().split(" ");
      return splitTags.includes(searchTransformed);
    });
  
    const tagIds = filteredPosts?.map(post => post._id);
  
    const displayQuery = displayResults(tagIds, allPosts);
    setSearchQueryList(displayQuery)
    displayResults();
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
        handleTagClick={(e) => {handleQuery(e, allPosts)}}
        searchQueryList={searchQueryList}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
      />
    </section>
  )
}

export default Feed;