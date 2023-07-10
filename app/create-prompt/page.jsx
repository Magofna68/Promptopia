'use client'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

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
          tag: post.tag,
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
