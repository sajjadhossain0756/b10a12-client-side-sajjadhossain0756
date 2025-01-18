import React, { useContext } from 'react'
import { AuthContext } from '../../provider/AuthProvider'
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const AddArticle = () => {
  const { user } = useContext(AuthContext)
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm()
  const axiosPublic = useAxiosPublic()

  const onSubmit = async (data) => {

    // upload image to imgbb and then get an url
    const imageFile = { image: data.photo[0] }
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    console.log(res.data)
    // const status = 'pending'
    if (res.data.success) {
      const newsInfo = {
        title: data.title,
        image: res.data?.data?.display_url,
        category: data.category,
        description: data.description,
        tags: data.tags,
        status: 'pending'
      }
      console.log(newsInfo)
      const articleData = await axiosPublic.post(`/all_articles`, newsInfo)
        .then(articleData => {
          console.log(articleData.data)
          if (articleData.data.insertedId) {
            reset()
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Sucessfully Articale Added",
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
    }


  }


  return (
    <div className='flex justify-center items-center  min-h-[calc(100vh-306px)] my-12'>
      <Helmet>
        <title>Pulse of the Nation | Add Article</title>
      </Helmet>
      <section className=' p-2 md:p-6 mx-auto w-[850px] bg-gray-600 text-white rounded-md shadow-md '>
        <h2 className='text-4xl text-center font-bold text-white  capitalize '>
          Post a New Job
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className='lg:w-[700px] mx-auto'>
          <div className='grid mt-4'>
            {/* news title */}
            <div>
              <label className='text-white ' htmlFor='job_title'>
                News Title
              </label>
              <input
                id='title'
                placeholder='job title'
                name='title'
                {...register("title", { required: true })}
                type='text'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
              {errors.title && <span className='text-red-600'>News title field is required</span>}
            </div>
          </div>
          <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 items-end'>
            {/* news photo */}
            <div className='flex flex-col gap-2 '>
              <label className="form-control text-black w-full max-w-xs">
                <input
                  type="file"
                  name='photo'
                  {...register("photo", { required: true })}
                  className="file-input file-input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            {/* category */}
            <div className='flex flex-col gap-2 '>
              <label className='text-white ' htmlFor='category'>
                Category
              </label>
              <select
                defaultValue='default'
                name='category'
                {...register("category", { required: true })}
                id='category'
                className='border bg-white text-gray-700 p-2 rounded-md'
              >
                <option disabled value='default'>Select A Category</option>
                <option value='Web Development'>Web Development</option>
                <option value='Graphics Design'>Graphics Design</option>
                <option value='Digital Marketing'>Digital Marketing</option>
              </select>
            </div>
          </div>
          {/* news tags */}
          <div className='mt-6 rounded'>
            <Controller
              name="tags"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  options={options}
                  className="text-black rounded"
                  classNamePrefix="select"
                  placeholder="Select tag name"
                />
              )}
            />
          </div>

          {/* description */}
          <div className='flex flex-col gap-2 mt-4'>
            <label className='text-white ' htmlFor='description'>
              Description
            </label>
            <textarea
              className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              name='description'
              {...register("description", { required: true })}
              id='description'
            ></textarea>
          </div>
          <div className='mt-6'>
            <input

              type='submit'
              value="add"
              className='btn w-full text-white font-bold 
                bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500'
            />

          </div>
        </form>
      </section>
    </div>
  )
}

export default AddArticle