'use client'

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

import Profile from '@components/profile';

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [ posts, setPosts ] = useState([]);

  var notyf = new Notyf();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    }
    if (session?.user.id) fetchPosts();
  }, [])

  const handleEdit = (posts) => {
    router.push(`/update-prompt?id=${posts._id}`)
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE'
        });

        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts)
        notyf.success("Post deleted")
      } catch (error) {
        notyf.error("Post unable to be deleted")
        console.log("Error Deleting ", error)
      }
    }
  }

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data ={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile