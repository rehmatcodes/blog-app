import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, RTE } from '../index';
import appwriteService from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      status: post?.status || '',
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);

  const submit = async (data) => {
    try {
      let fileId = null;

      if (data.images && data.images[0]) {
        const file = await appwriteService.uploadFile(data.images[0]);
        fileId = file ? file.$id : null;

        if (post?.featuredImage) {
          await appwriteService.deleteFile(post.featuredImage);
        }
      }

      const updatedPost = post
        ? await appwriteService.updatePost(post.$id, {
            ...data,
            featuredImage: fileId || post.featuredImage,
          })
        : await appwriteService.createPost({
            ...data,
            author: userData?.$id,
            featuredImage: fileId,
          });

      if (updatedPost) {
        navigate('/posts');
      }
    } catch (error) {
      console.error('Error while submitting the post:', error);
    }
  };

  // Slug Transform Function
  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      const slug = value.toLowerCase().replace(/ /g, '_');
      setValue('slug', slug); // Fixed missing comma
      return slug;
    }
  }, [setValue]);

  // Watch Title and Auto-Generate Slug
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <form onSubmit={handleSubmit(submit)}>
        <Input
          label="Title"
          {...register('title')}
          placeholder="Enter the post title"
          required
        />
        <Input
          label="Slug"
          {...register('slug')}
          placeholder="Enter a unique slug"
        />
        <RTE
          name="content"
          control={control}
          label="Content"
          defaultValue={post?.content || ''}
        />
        <Select
          label="Status"
          {...register('status')}
          options={[
            { value: 'draft', label: 'Draft' },
            { value: 'published', label: 'Published' },
          ]}
          defaultValue={post?.status || 'draft'}
        />
        <Input
          label="Featured Image"
          type="file"
          {...register('images')}
        />
        <Button type="submit" className="mt-4">
          {post ? 'Update Post' : 'Create Post'}
        </Button>
      </form>
    </div>
  );
}

export default PostForm;
