import { React, useEffect, useState } from "react";
import CustomInput from "../components/Custominput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import {
  createBlogs,
  getABlog,
  resetState,
  updateABlog,
} from "../features/blogs/blogSlice";
import { dltImg, uploadImg } from "../features/upload/uploadSlice";
import { getbCategories } from "../features/bcategory/bcategorySlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

let schema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  category: Yup.string().required("Category is Required"),
});

const Addblog = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const blogId = location.pathname.split("/")[3];

  useEffect(() => {
    dispatch(getbCategories());
  }, []);

  useEffect(() => {
    if (blogId) {
      dispatch(getABlog(blogId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, blogId]);

  const bCatState = useSelector((state) => state.bCategory.bCategories);
  const imgState = useSelector((state) => state.upload.images);
  const newBlog = useSelector((state) => state.blogs);
  // console.log(newBlog);

  const {
    isSuccess,
    isLoading,
    isError,
    createdBlog,
    blogName,
    blogDesc,
    blogCategory,
    blogImages,
    updatedBlog,
  } = newBlog;

  const [updateImages, setUpdateImages] = useState(newBlog.blogImages);

  console.log(newBlog.blogImages);
  console.log(updateImages);

  useEffect(() => {
    setUpdateImages(newBlog.blogImages);
    console.log(updateImages);
  }, [newBlog.blogImages]);

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  // useEffect(() => {
  //   if (blogId) {
  //     dispatch(getABlog(blogId));
  //   } else {
  //     dispatch(resetState());
  //   }
  // }, [dispatch, blogId]);

  // useEffect(() => {
  //   formik.values.images = img;
  // }, [img]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: newBlog.blogName || "",
      description: newBlog.blogDesc || "",
      category: newBlog.blogCategory || "",
      images: newBlog?.blogImages || [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // console.log("Submitting form with values:", values);
      if (blogId !== undefined) {
        const data = { id: blogId, blogData: values };
        dispatch(updateABlog(data));
        if (updateImages.length > 0) {
          // Check if there are images to delete
          dispatch(dltImg(updateImages.map((image) => image.public_id)));
        }
        toast.success("Blog Updated Successfully!");
        dispatch(resetState());
         setTimeout(() => {
          navigate("/admin/blog-list");
        }, 400);
      } else {
        dispatch(createBlogs(values));

        if (img.length > 0) {
          // Check if there are images to delete
          dispatch(dltImg(img.map((image) => image.public_id)));
        }
        // dispatch(dltImg(img.map((image) => image.public_id)));
        dispatch(resetState());
        toast.success("Blog Added Successfully!");
       
      }

      formik.resetForm();
      dispatch(getbCategories());
      notification();
    },
  });

  const notification = () => {
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  };

  const handleDrop = (acceptedFiles) => {
    dispatch(uploadImg(acceptedFiles));
    const newImages = acceptedFiles.map((file, index) => ({
      public_id: `new-${index}`,
      url: URL.createObjectURL(file),
    }));
    formik.setFieldValue("images", [...formik.values.images, ...newImages]);
  };

  const handleDelete = (public_id) => {
    dispatch(dltImg(public_id));
    formik.setFieldValue(
      "images",
      formik.values.images.filter((img) => img.public_id !== public_id)
    );
  };

  return (
    <div>
      <h3 className="mb-4 title">Add Blog</h3>
      <div className="">
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-4">
            <CustomInput
              type="text"
              label="Enter Blog Title"
              name="title"
              onChng={formik.handleChange("title")}
              onBlr={formik.handleBlur("title")}
              val={formik.values.title}
            />
          </div>
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>

          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mt-3"
            id=""
          >
            <option value="">Select Blog Category</option>
            {bCatState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>

          <ReactQuill
            theme="snow"
            className="mt-3"
            name="description"
            onChange={formik.handleChange("description")}
            value={formik.values.description}
          />
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>

          <div className="bg-white border-1 p-5 text-center mt-3">
            <Dropzone
              // onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
              onDrop={handleDrop}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>

          <div className="showimages d-flex flex-wrap mt-3 gap-3">
            {formik.values.images !== undefined
              ? formik.values.images.map((image, index) => (
                  <div className="position-relative" key={index}>
                    <button
                      onClick={() => handleDelete(image.public_id)}
                      type="button"
                      className="btn-close position-absolute"
                      style={{ top: "10px", right: "10px" }}
                    ></button>
                    <img src={image.url} alt="" width={200} height={200} />
                  </div>
                ))
              : null}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblog;
