import React from "react";

function About() {
  return (
    <div className={`w-full h-screen flex flex-col justify-between`}>
      <div className=" bg-green-700 h-full  bg-opacity-10 gap-6 flex flex-col justify-center items-center w-full">
        <h1 className="font-semibold text-[52px] text-slate-500 ">
          About DiagnoSIR
        </h1>
        <div className=" flex justify-center items-center md:w-[60%] w-[90%]">
          <p className="text-black leading-8 text-[16px] ">
            Welcome to DiagnoSIR, an innovative online healthcare platform
            revolutionizing the way you access medical care and connect with
            doctors. Our mission is to provide convenient and reliable
            healthcare solutions that prioritize your well-being and empower you
            to make informed decisions about your health. <br /> At DiagnoSIR,
            we offer a unique blend of advanced technology and personalized
            care. Through our cutting-edge online diagnosis feature, you can
            receive accurate assessments and recommendations from qualified
            medical professionals right from the comfort of your own home. Our
            secure platform ensures your privacy and confidentiality throughout
            the process. <br /> We understand that finding the right doctor can
            be a daunting task. That's why we've developed a patient orientation
            system that helps you connect with the most suitable doctors for
            your specific needs. Our platform matches you with experienced
            healthcare professionals based on their expertise, specialization,
            and patient ratings, ensuring you receive the highest standard of
            care.
            <br /> We believe in fostering a collaborative healthcare
            experience. With our platform, you can easily communicate with
            doctors, ask questions, and discuss your concerns in a secure online
            environment. We encourage an open and transparent dialogue, enabling
            you to actively participate in your healthcare journey. <br /> At
            DiagnoSIR, we prioritize quality and safety. Our network of doctors
            undergoes a rigorous vetting process to ensure their credentials and
            expertise. We continuously monitor and evaluate their performance to
            maintain the highest standards of care.
            <br /> We are committed to making healthcare accessible and
            convenient for you. Whether you need a remote consultation, a second
            opinion, or ongoing management of a chronic condition,DiagnoSIR is
            here to support you. Our user-friendly interface and intuitive
            design make navigating our platform seamless and hassle-free. <br />{" "}
            Thank you for choosing DiagnoSIR. We are excited to be your trusted
            partner in delivering modern, efficient, and patient-centric
            healthcare services. Your health and well-being are our top
            priorities, and we are dedicated to providing you with the best
            possible care.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
