import React from "react";
import LoginComponent from "../components/LoginComponent";

function Register() {
  return (
    <div className=" w-full ">
      <div className={` w-full`}>
        <div className=" bg-[gradient__bg] flex justify-center items-center top-0 w-full h-[30vh]">
          <div className="w-[50%] flex flex-col justify-center items-start ">
            <h1 className="  font-roboto ss:leading-[70px] leading-[50px] text-[40px] text-[#101750] font-bold">
              My account
            </h1>
          </div>
        </div>

        <div className={`mb-5 py-20 flex justify-center items-center w-full `}>
          <LoginComponent />
        </div>
      </div>
    </div>
  );
}

export default Register;
