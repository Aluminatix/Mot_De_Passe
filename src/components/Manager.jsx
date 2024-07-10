import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { FaCopy} from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    //let passwordArray;
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("eye_close.png")) {
      ref.current.src = "eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "eye_close.png";
      passwordRef.current.type = "text";
    }
  };

  const savePassword = () => {
    if(form.site.length>3 && form.username.length>3 && form.password.length>3 ){

    console.log(form);
    setPasswordArray([...passwordArray, {...form, id: uuidv4()}]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]));
    console.log([...passwordArray, form]);
    setform({ site: "", username: "", password: "" });
    }
    else{
      toast('Error: Try Again');
    }
  };

  const deletePassword = (id) => {

    console.log("id for deleted password is", id);
    let delete_confirm = confirm("Do you really want to delete this password?")
    if(delete_confirm){

    setPasswordArray(passwordArray.filter(item=>item.id !== id));

    toast.success('Password Deleted');
    
    localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id !== id)));
    // console.log([...passwordArray, form]);

    }
  };

  const editPassword = (id) => {
    console.log("id for edited password is", id);
    setform(passwordArray.filter(i=>i.id === id)[0]);
    setPasswordArray(passwordArray.filter(item=>item.id !== id));
    // localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
    // console.log([...passwordArray, form]);
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast.success("Password Copied", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      // transition: "bounce",
    });
    //toast.success("Password Copied");
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="px-10">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="dark"
        // transition="bounce"
      />

      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
      </div>

      <div className="p-3 min-h-[88vh] md: mycontainer ">
        <h1 className="text-2xl font-bold text-center">PassWord</h1>
        <p className="text-blue-500 text-lg text-center">
          Manage Your Password
        </p>

        <div className="flex flex-col p-4 text-black gap-5 items-center w-full">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="rounded-full border border-blue-500 w-full p-2"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-5">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-blue-500 w-full p-2"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative w-full">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-blue-500 w-full p-2"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-0 p-2.5 cursor-pointer"
                onClick={showPassword}
              >
                <img ref={ref} src="eye.png" alt="show" />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-blue-400 hover:bg-blue-300 rounded-full w-fit px-4 py-2"
          >
            <lord-icon
              src="https://cdn.lordicon.com/prjooket.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>

        <div className="passwords">
          <h2 className=" font-bold text-xl md:text-sm py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div> No Passwords to show </div>}
          {passwordArray.length != 0 && (
            <table className="table-auto  w-full rounded-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-2">Sites</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Update</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 text-center w-auto">
                        <a href={item.site} target="_blank">
                          {item.site}
                        </a>
                      </td>
                      <td className="py-2 text-center w-auto">{item.username}</td>
                      <td className="py-2 text-center w-auto">
                        {item.password}
                        <button
                          className="px-2"
                          onClick={() => {
                            copyText(item.password);
                          }}
                        >
                          <FaCopy />
                        </button>
                      </td>
                      <td className="px-4 py-2 text-center w-auto">

                        <span className="mx-2 " onClick={()=>{editPassword(item.id)}}>
                          <button>
                            <FaEdit />
                          </button>

                        </span>

                        <span className=" cursor-pointer mx-2 " onClick={()=>{deletePassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/wpyrrmcq.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>

                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Manager;
