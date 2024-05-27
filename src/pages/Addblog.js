import { React } from "react";
import CustomInput from "../components/Custominput";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Addblog = () => {
    return <div>
        <h3 className="mb-4">Add Blog</h3>
        <div className="">
            <form action="">
                <CustomInput type="text" label="Enter Blog Title" /> 
                <select name="" id="">
                      <option value="">Select Blog Category</option>
                </select>
                <ReactQuill theme="snow" value={value} onChange={setValue} />;
            </form>
        </div>
    </div>
};

export default Addblog;