'use client'
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id')


  const [ submitting, setSubmitting ] = useState(false);
  const [ post, setPost ] = useState({
    prompt: '',
    tag: '',
    tagList: [],
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`)
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag || data.tagList[0],
        tagList: data.tagList,
      })
    }

    if(promptId) getPromptDetails()
  }, [promptId])

  const updatePrompt = async (e) => {
    // avoid reload
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) return console.log("Error: promptId not found")

    try{
      // api endpoint 
      const response = await fetch(`/api/prompt/${promptId}`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag || post.tagList[0],
          tagList: post.tagList,
        })
      })

      if (response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log("Error Creating Prompt: ", error);
    } finally {
      // fire regardless of success or not
      setSubmitting(false);
    }
  }

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}
export default EditPrompt;