'use client'
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

import Form from '@components/Form';

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id')

  var notyf = new Notyf();

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

    if (!promptId) return notyf.error("Prompt ID not found")

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
        notyf.success("Prompt updated successfully")
        setTimeout(() => {
          router.push('/')
        }, 1000)
      }
    } catch (error) {
      notyf.error("Error Creating Prompt: ", error)
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