// `app/page.js` is the UI for the `/` URL
"use client";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import React, { useState, useEffect } from "react";
 import Swal from "sweetalert2";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [qty, setQty] = useState(0);
  const [sellqty, setSellqty] = useState(0);
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const submitContent = (event) => {
    setDescription(event);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !title ||
      !price ||
      !discount ||
      !qty ||
      !sellqty ||
      !img1 ||
      !type 
    ) {
      Swal.fire("Oops...", "Please complete all inputs.", "error");
      return;
    }

    try {
      const res = await fetch("/api/product/addproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          body: JSON.stringify({
        title,
        price,
        discount,
        qty,
        sellqty,
        img1,
        img2,
        img3,
        type,
        description,
      }),
    });


      if (res.ok) {
        const form = e.target;
        Swal.fire("OK", "Add Product successfully!", "success");
        form.reset();
      } else {
        Swal.fire("Oops...", "Add Product failed.", "error");
        console.log("Add Product failed.");
      }
    } catch (error) {
      Swal.fire("Oops...", "Error during Add Product", "error");
    }
  };

  return (
    <div className=" block xl:w-[1300px] w-full m-auto  items-center pt-20">
      <div className="lg:w-[1024px]  w-full m-auto items-center  bg-purple-950  rounded-md">
        <h1 className="pt-5 ml-5 flex text-4xl ">AddProduct</h1>
        <form onSubmit={handleSubmit} class="pl-2 m-auto pt-8  w-full ">
          <div className="md:flex  lg:items-center   mb-4">
            <div className="  md:w-1/6">
              <label
                className="block text-white  font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Title Product
              </label>
            </div>
            <div className="md:w-5/6 ">
              <input
                className=" lg:w-[500px] sm:w-[400px]   bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex  lg:items-center   mb-4">
            <div className="  md:w-1/6">
              <label
                className="block text-white  font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Price
              </label>
            </div>
            <div className="md:w-5/6 ">
              <input
                className=" lg:w-[500px] sm:w-[400px]   bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="number"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex  lg:items-center   mb-4">
            <div className="  md:w-1/6">
              <label
                className="block text-white  font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Discount(%)
              </label>
            </div>
            <div className="md:w-5/6 ">
              <input
                className=" lg:w-[500px] sm:w-[400px]   bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="number"
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex  lg:items-center   mb-4">
            <div className="  md:w-1/6">
              <label
                className="block text-white  font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Qty
              </label>
            </div>
            <div className="md:w-5/6 ">
              <input
                className=" lg:w-[500px] sm:w-[400px]   bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="number"
                onChange={(e) => setQty(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex  lg:items-center   mb-4">
            <div className="  md:w-1/6">
              <label
                className="block text-white  font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Sell Qty
              </label>
            </div>
            <div className="md:w-5/6 ">
              <input
                className=" lg:w-[500px] sm:w-[400px]   bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="number"
                onChange={(e) => setSellqty(e.target.value)}
              />
            </div>
          </div>

          <div className="md:flex  lg:items-center   mb-4">
            <div className="  md:w-1/6">
              <label
                className="block text-white  font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                img1(link)
              </label>
            </div>
            <div className="md:w-5/6 ">
              <input
                className=" lg:w-[500px] sm:w-[400px]   bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex  lg:items-center   mb-4">
            <div className="  md:w-1/6">
              <label
                className="block text-white  font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                img2(link)
              </label>
            </div>
            <div className="md:w-5/6 ">
              <input
                className=" lg:w-[500px] sm:w-[400px]   bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                onChange={(e) => setImg2(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex  lg:items-center   mb-4">
            <div className="  md:w-1/6">
              <label
                className="block text-white  font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                img3(link)
              </label>
            </div>
            <div className="md:w-5/6 ">
              <input
                className=" lg:w-[500px] sm:w-[400px]   bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                onChange={(e) => setImg3(e.target.value)}
              />
            </div>
          </div>

          <div className="md:flex  lg:items-center   mb-4">
            <div className="  md:w-1/6">
              <label
                className="block text-white  font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Type
              </label>
            </div>
            <div className="md:w-5/6 ">
              <select
                // value={productDetails.category}
                name="category"
                className="add-product-selector lg:w-[500px] sm:w-[400px]  w-[230px] bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                onChange={(e) => setType(e.target.value)}

                // onChange={changeHandler}
              >
                <option value="NEXTGEN">NEXTGEN</option>
                <option value="ROBOT">ROBOT</option>
                <option value="IT">IT</option>
                <option value="WEARABLES">WEARABLES</option>
              </select>
              {/* <input
                className=" lg:w-[500px] md:w-[400px]   bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
              /> */}
            </div>
          </div>

          <div className="md:flex  lg:items-center   mb-4">
            <div className="  md:w-1/6">
              <label
                className="block text-white  font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Description
              </label>
            </div>
            <div className="md:w-5/6 ">


            <input
                className=" lg:w-[500px] sm:w-[400px]   bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                onChange={(e) => submitContent(e.target.value)}
              />
              {/* { <ReactQuill
                // value={content}
                // onChange={submitContent}
                theme="snow"
                className="lg:w-[500px] sm:w-[400px] w-[300px]  text-black  bg-white  border-2 rounded  py-2 px-4"
                style={{ border: "1px solid #666" }}
                onChange={submitContent}
              /> } */}
            </div>
          </div>

          <div className="pb-5 md:flex md:items-center">
            <div className="md:w-1/3"></div>

            <div className="md:w-2/3">
              <button
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Add Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
