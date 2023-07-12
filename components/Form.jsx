import Link from 'next/link';
import { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddIcon from '@mui/icons-material/Add';
import { Add } from '@mui/icons-material';

const Form = ({       
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
}) => {

const [ tagData, setTagData ] = useState([]);

const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    handleTagSubmit(e)
  }
}

const handleTagSubmit = (e) => {
  e.preventDefault();
  setPost({ ...post, tagList: [...post.tagList, post.tag], tag: ""})
}

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share amazing prompts with the world, and 
        let your imagination run wild with any AI-powered platform.
      </p>
      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>Your AI prompt</span>
          <textarea
            value={post.prompt}
            onChange={(e) => { setPost({...post, prompt: e.target.value})}}
            placeholder='Write your prompt here'
            required
            className='form_textarea'
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Add Tags
            <span className='secondaryText'> (product, webdevelopment, etc.)</span>
          </span>
          <Stack direction='horizontal' gap={2}>
            { post && post.tagList && post.tagList.map(tag => <Badge key={tag} bg='primary'>{tag}</Badge>)}
          </Stack>
          <div className='formContainer'>
            {
              post.tagList?.length > 0 ?
                <input
                  value={post.tag}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => { setPost({...post, tag: e.target.value}, console.log(post.tag))}}
                  placeholder='tag'
                  className='form_input'
                >
                </input>
                :
                <input
                  value={post.tag}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => { setPost({...post, tag: e.target.value}, console.log(post.tag))}}
                  placeholder='tag'
                  required
                  className='form_input'
                />
              }
              <button onClick={(e) => handleTagSubmit(e)}><AddIcon /></button>
          </div>
        </label>
        <div className='flex-end mx-3 gap-4 mb-5'>
          <Link
            href="/"
            className='text-gray-500 text-sm'
          >
            Cancel
          </Link>
          <button 
            type='submit' 
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}...`: type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form