'use client'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
// import { Notyf } from 'notyf';
// import 'notyf/notyf.min.css';

import Form from '@components/Form';

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  // var notyf = new Notyf();

  const [ submitting, setSubmitting ] = useState(false);
  const [ post, setPost ] = useState({
    prompt: '',
    tag: '',
    tagList: [],
  });

  const createPrompt = async (e) => {
    // avoid reload
    e.preventDefault();
    setSubmitting(true);

    try{
      // api endpoint 
      const response = await fetch('/api/prompt/new',
      {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag || post.tagList[0],
          tagList: post.tagList,
        })
      })

      if (response.ok) {
        // notyf.success('Your post has been created')
        // setTimeout(() => {
          router.push('/')
        // }, 1000)
      }
    } catch (error) {
      // notyf.error('There was a issue creating your post')
      console.log("Error Creating Prompt: ", error);
    } finally {
      // fire regardless of success or not
      setSubmitting(false);
    }
  }

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    >

    </Form>
  )
}
export default CreatePrompt;
