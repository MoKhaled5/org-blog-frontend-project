import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'
import { uploadImageToImgbb } from '../utils/uploadImageToImgbb'
import { usePosts } from '../context/PostsContext'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify';
import '../../node_modules/react-toastify/dist/ReactToastify.css';


export default function AddEditPostPage() {
  const { getPosts } = usePosts();
  const { user } = useAuth();


  const initialValues = {
    postTitle: '',
    postDescription: '',
    image: null,
  }

  const validationSchema = Yup.object({
    postTitle: Yup.string()
      .max(30, 'Title must be at most 30 characters')
      .required('Title is required'),
    postDescription: Yup.string()
      .max(100, 'Description must be at most 100 characters')
      .required('Description is required'),
    image: Yup.mixed()
      .nullable()
      .required('A file is required')
      .test('fileSize', 'File must be less than 2MB', (value) => {
        if (!value) return true
        return value.size <= 2 * 1024 * 1024
      }),
  })

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const imageUrl = await uploadImageToImgbb(values.image)
      const now = new Date()
      const formattedDate = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
      const formattedTime = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })

      const newPost = {
        id: Date.now().toString(),
        title: values.postTitle,
        description: values.postDescription,
        image_url: imageUrl,
        author_id: user?.id,
        author_name: user?.username,
        created_at: now.toISOString(),
        formatted_date: formattedDate,
        formatted_time: formattedTime,
      };

      await axios.post('http://localhost:3000/posts', newPost)
      await getPosts()
      toast.success('Post added successfully!')
      resetForm()
    } 
    catch (error) {
      console.error('Error adding post:', error)
      toast.error('Failed to add post.')
    }
    finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='bg-white dark:bg-[#1A1A1A] py-20 mt-[100px] min-h-[calc(100vh-170px)]'>
      <div className='w-full lg:w-[50%] mx-auto px-5'>
        <h1 className='text-4xl md:text-6xl font-semibold text-center mb-11'>
          ADD NEW POST
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ setFieldValue, isSubmitting, values, validateField }) => {
            const [imagePreview, setImagePreview] = useState(null)
            const [isDragging, setIsDragging] = useState(false)

            useEffect(() => {
              if (values.image) {
                const objectUrl = URL.createObjectURL(values.image)
                setImagePreview(objectUrl)
                return () => URL.revokeObjectURL(objectUrl)
              } else {
                setImagePreview(null)
              }
            }, [values.image])

            return (
              <Form className='bg-white dark:bg-[#1A1A1A]'>
                <div className='mb-5'>
                  {!values.image ? (
                    <div className='flex items-center justify-center w-full'>
                      <label
                        htmlFor='dropzone-file'
                        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ${
                          isDragging
                            ? 'border-blue-500 bg-blue-50 dark:bg-slate-800'
                            : 'border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                        onDragOver={(e) => {
                          e.preventDefault()
                          setIsDragging(true)
                        }}
                        onDragLeave={(e) => {
                          e.preventDefault()
                          setIsDragging(false)
                        }}
                        onDrop={(e) => {
                          e.preventDefault()
                          setIsDragging(false)
                          const files = e.dataTransfer.files
                          if (files && files.length > 0) {
                            const file = files[0]
                            setFieldValue('image', file)
                            validateField('image')
                          }
                        }}
                      >
                        <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                          <svg
                            className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400'
                            aria-hidden='true'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 20 16'
                          >
                            <path
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                            />
                          </svg>
                          <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                            <span className='font-semibold'>Click to upload</span>{' '}
                            or drag and drop
                          </p>
                          <p className='text-xs text-gray-500 dark:text-gray-400'>
                            Any file type (MAX. 2MB)
                          </p>
                        </div>
                        <input
                          id='dropzone-file'
                          type='file'
                          className='hidden'
                          name='image'
                          onChange={(e) => {
                            const file = e.currentTarget.files[0]
                            setFieldValue('image', file)
                            validateField('image')
                          }}
                        />
                      </label>
                    </div>
                  ) : (
                    <div className='relative text-center p-4 border-2 border-gray-300 border-dashed rounded-lg'>
                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt='Image preview'
                          className='w-full h-full object-contain mb-4 rounded-md bg-red-500'
                        />
                      )}
                      <p className='bg-[#1A1A1A]/50 text-white rounded-lg text-xs mt-1 absolute top-6 left-7 px-2 py-1'>
                        Size: {(values.image.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <button
                        type='button'
                        className='flex justify-center items-center w-8 aspect-square bg-red-100 hover:bg-red-400 hover:text-white cursor-pointer rounded-lg absolute top-4 right-7 mt-3 text-sm font-semibold text-red-500 hover:text-red-700'
                        onClick={() => {
                          setFieldValue('image', null)
                          validateField('image')
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                          <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                        </svg>

                      </button>
                    </div>
                  )}

                  <ErrorMessage
                    name='image'
                    component='div'
                    className='text-red-500 text-sm mt-2 text-center'
                  />
                </div>

                <div className='mb-5'>
                  <Field
                    className='w-full border border-[#AFAFAF] text-[#1A1A1A] placeholder:text-[#AFAFAF] focus:border-[#1A1A1A] dark:text-white dark:border-[#515151] dark:placeholder:text-[#515151] dark:focus:border-white px-5 py-4 text-lg md:px-8 md:py-5 md:text-xl outline-0 rounded-md bg-transparent'
                    type='text'
                    name='postTitle'
                    placeholder='Enter the post title'
                  />
                  <ErrorMessage
                    name='postTitle'
                    component='div'
                    className='text-red-500 text-sm mt-2'
                  />
                </div>

                <div className='mb-5'>
                  <Field
                    className='w-full border border-[#AFAFAF] text-[#1A1A1A] placeholder:text-[#AFAFAF] focus:border-[#1A1A1A] dark:text-white dark:border-[#515151] dark:placeholder:text-[#515151] dark:focus:border-white px-5 py-4 text-lg md:px-8 md:py-5 md:text-xl outline-0 rounded-md bg-transparent'
                    type='text'
                    name='postDescription'
                    placeholder='Enter the post description'
                  />
                  <ErrorMessage
                    name='postDescription'
                    component='div'
                    className='text-red-500 text-sm mt-2'
                  />
                </div>

                <button
                  className='w-full mt-4 md:mt-10 py-3 md:py-5 text-2xl bg-[#1A1A1A] dark:bg-white text-white dark:text-[#1A1A1A] cursor-pointer font-semibold rounded-md transition-opacity duration-300 disabled:opacity-50'
                  type='submit'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Adding...' : 'ADD NEW POST'}
                </button>
              </Form>
            )
          }}
        </Formik>
      </div>
    </div>
  )
}










