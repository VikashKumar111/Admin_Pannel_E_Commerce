import { React, useEffect } from "react";
import CustomInput from "../components/Custominput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { createBlogs, resetState } from "../features/blogs/blogSlice";
import { dltImg, uploadImg } from "../features/upload/uploadSlice";
import { getbCategories } from "../features/bcategory/bcategorySlice";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

let schema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  category: Yup.string().required("Category is Required"),
});

const Addblog = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    dispatch(getbCategories());
  }, []);

  const bCatState = useSelector((state) => state.bCategory.bCategories);
  const imgState = useSelector((state) => state.upload.images);
  const newBlog = useSelector((state) => state.blogs);
  // console.log(newBlog);

  const { isSuccess, isLoading, isError, createdBlog } = newBlog;


  const imge = imgState.map(({ public_id: id, url }) => ({
    id,
    url,
  }));

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.images = img;
  }, [img]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // console.log("Submitting form with values:", values);
      dispatch(createBlogs(values));
      formik.resetForm();
      dispatch(dltImg(imge.id));
      dispatch(getbCategories());
      notification();
    },
  });

  
  const notification = () => {
    if (isSuccess && createdBlog) {
      toast.success("Blog Added Successfully!");
      // setTimeout(() => {
      //   // navigate("/admin/blog-list");
      //    dispatch(resetState());
      // }, 3000);
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
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
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
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
            {imgState?.map((i, j) => {
              return (
                <div className="position-relative" key={j}>
                  <button
                    onClick={() => dispatch(dltImg(i.public_id))}
                    type="button"
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
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
