import { React } from "react";
import CustomInput from "../components/Custominput";

const Addblog = () => {
    return <div>
        <h3 className="mb-4">Add Blog</h3>
        <div className="">
            <form action="">
                <CustomInput type="text" label="Enter Blog Title" /> 
                <select name="" id="">
                      <option>Select Blog Category</option>
                </select>
            </form>
        </div>
    </div>
};

export default Addblog;