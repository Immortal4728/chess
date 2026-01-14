import React, { useRef, useEffect } from 'react';
import './Hero.css';
import Navbar from './Navbar';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Tilt from 'react-parallax-tilt';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const BASE = import.meta.env.BASE_URL;

  const kingRef = useRef(null);
  const heroRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  /* ---------------- HERO TEXT INTRO ---------------- */
  useEffect(() => {
    const h1 = document.querySelector('.hero-heading');
    const p = document.querySelector('.hero-subtext');
    const btn = document.querySelector('.hero-button');

    if (!h1 || !p || !btn) return;

    gsap.set([h1, p, btn], { y: 80, opacity: 0 });

    gsap.to(h1, { y: 0, opacity: 1, delay: 1, duration: 1, ease: 'power3.out' });
    gsap.to(p, { y: 0, opacity: 1, delay: 1.3, duration: 1, ease: 'power3.out' });
    gsap.to(btn, { y: 0, opacity: 1, delay: 1.6, duration: 1, ease: 'power3.out' });
  }, []);

  /* ---------------- SECTION 1 SCROLL ---------------- */
  useEffect(() => {
    const heading = document.querySelector('.section1-heading');
    const para = document.querySelector('.section1-para');
    if (!heading || !para) return;

    gsap.set([heading, para], { opacity: 0, x: 100 });

    gsap.to(heading, {
      scrollTrigger: {
        trigger: section1Ref.current,
        start: 'top 60%',
      },
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out',
    });

    gsap.to(para, {
      scrollTrigger: {
        trigger: section1Ref.current,
        start: 'top 60%',
      },
      opacity: 1,
      x: 0,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out',
    });
  }, []);

  /* ---------------- KING SCROLL ANIMATION ---------------- */
  useEffect(() => {
    const heroImg = kingRef.current;
    const section1 = section1Ref.current;
    const section3 = section3Ref.current;

    if (!heroImg || !section1 || !section3) return;

    gsap.timeline({
      scrollTrigger: {
        trigger: section1,
        start: 'top 70%',
        endTrigger: section3,
        end: 'top center',
        scrub: true,
      },
    })
      .to(heroImg, {
        x: 600,
        y: 600,
        rotate: -30,
        scale: 1,
        ease: 'power2.out',
      })
      .to(heroImg, {
        x: 1100,
        y: 1000,
        rotate: 10,
        scale: 0.9,
        ease: 'power2.inOut',
      })
      .to(heroImg, {
        x: 1600,
        y: 1600,
        rotate: -30,
        scale: 1.4,
        ease: 'power2.inOut',
      });
  }, []);

  /* ---------------- JSX ---------------- */
  return (
    <>
      {/* HERO */}
      <div className="hero-container" ref={heroRef}>
        <Navbar />

        <video className="hero-video" autoPlay muted loop playsInline>
          <source src={`${BASE}videos/hero.mp4`} type="video/mp4" />
        </video>

        <div className="hero-content">
          <Tilt tiltMaxAngleX={20} tiltMaxAngleY={20} scale={1.03}>
            <h1 className="hero-heading">The Chess Awakens</h1>
            <p className="hero-subtext">
              From scattered chaos to strategy — scroll to begin.
            </p>
            <button className="hero-button">Enter the Realm</button>
          </Tilt>
        </div>
      </div>

      {/* KING MODEL */}
      <div className="hero-model1">
        <img
          src={`${BASE}images/king.png`}
          alt="Chess King"
          className="hero-img"
          ref={kingRef}
        />
      </div>

      {/* SECTION 1 */}
      <div className="section1" ref={section1Ref}>
        <div className="section1-right">
          <h1 className="section1-heading">Master Every Move</h1>
          <p className="section1-para">
            In the world of chess, every move matters. Strategy defines victory.
          </p>
        </div>
      </div>

      {/* SECTION 2 */}
      <div className="section2" ref={section2Ref}>
        <img
          src={`${BASE}images/section2.png`}
          alt="White King"
          className="king-img"
        />
      </div>

      {/* SECTION 3 */}
      <div className="section3" ref={section3Ref}>
        <img
          src={`${BASE}images/section3-1.png`}
          alt="Final Battle"
          className="section3-img"
        />
      </div>
    </>
  );
};

export default Hero;
