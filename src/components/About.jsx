import React from "react";
import SquareBg from "./square-bg/SquareBg";

const About = () => {
  return (
    <section className="text-black h-full px-8 dark:text-white  body-font bg-white dark:bg-slate-950 w-full flex items-center flex-col relative ">
      <SquareBg />
      <h2 className="text-center text-5xl text-slate-950 dark:text-white font-medium py-12 z-10 relative">
        About Us
      </h2>
      <p className="text-center container px-2 py-4 z-10 text-base md:text-xl tracking-wide md:tracking-widest">
        Welcome to Co-Create Hub, the ultimate platform for web enthusiasts and
        coding aficionados. Our mission is to provide a dynamic space where
        individuals can sign up, unleash their creative prowess, and build
        captivating HTML, CSS, and JavaScript websites. With Co-Create Hub, you
        have the power to plan your process and organize your to-do lists
        seamlessly on our intuitive whiteboard feature, making project
        management a breeze.
      </p>
      <p className="text-center container px-2 py-4 z-10 text-base md:text-xl tracking-wide md:tracking-widest">
        But we don't stop there. We believe in continuous growth and expanding
        horizons. That's why we're thrilled to announce our integration with
        Tailwind CSS, a game-changing framework that empowers you to elevate
        your designs with efficiency and style. Explore the world of Tailwind
        CSS, experiment with its robust features, and witness your coding skills
        reach new heights.
      </p>
      <p className="text-center hidden sm:flex container px-2 py-4 z-10 text-base md:text-xl tracking-wide md:tracking-widest">
        At Co-Create Hub, we're not just about individual growth; we value the
        strength of community. Join our vibrant ecosystem where experienced
        coders share their wisdom and beginners find the support they need to
        thrive. Collaborate, exchange ideas, and foster connections with
        like-minded individuals who are as passionate about coding as you are.
        Teach, learn, and grow together as you embark on this coding journey.
      </p>
      <p className="text-center hidden sm:flex container px-2 py-4 z-10 text-base md:text-xl tracking-wide md:tracking-widest">
        Whether you're here to refine your skills, explore new possibilities, or
        kickstart a career in web development, Co-Create Hub provides the ideal
        environment for you to excel. Our user-friendly interface, extensive
        resources, and interactive features ensure that every step of your
        coding adventure is engaging and rewarding.
      </p>
      <p className="text-center mb-8 hidden sm:flex container px-2 py-4 z-10 text-base md:text-xl tracking-wide md:tracking-widest">
        Don't wait any longer. Sign up now and immerse yourself in the world of
        Co-Create Hub. Unleash your creativity, shape the web of tomorrow, and
        be part of a thriving community that encourages your success. The
        possibilities are limitless, and your coding journey starts here, at
        Co-Create Hub.
      </p>
    </section>
  );
};

export default About;
