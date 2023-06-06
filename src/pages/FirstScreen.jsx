import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../appwrite/appwriteConfig";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Features from "../components/Features";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const FirstScreen = () => {
  const navigate = useNavigate();
  const heroRef = useRef();
  const aboutRef = useRef();
  const featuresRef = useRef();
  const contactRef = useRef();
  useEffect(() => {
    const promise = account.get();
    promise.then(
      function (response) {
        navigate("/home/" + response?.$id, {
          state: {
            userId: response?.$id,
            name: response?.name,
          },
        });
        console.log(response);
      },
      function (err) {
        console.log(err);
      }
    );
  }, []);
  return (
    <div className="w-full relative">
      <div className="w-full h-full overflow-x-hidden relative">
        <Navbar refArr={[heroRef,aboutRef,featuresRef,contactRef]} />
        <div ref={heroRef}>
          <Hero />
        </div>
        <div ref={aboutRef}>
          <About />
        </div>
        <div ref={featuresRef}>
          <Features />
        </div>
        <div ref={contactRef}>
          <Contact />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default FirstScreen;
