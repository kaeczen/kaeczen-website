import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimations = () => {
  useEffect(() => {
    // Only run on desktop
    if (window.innerWidth < 1024) return;

    // Parallax sections
    gsap.utils.toArray('.parallax-section').forEach((section) => {
      const bg = section.querySelector('.parallax-bg');
      if (bg) {
        gsap.to(bg, {
          yPercent: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    });

    // Reveal animations
    gsap.utils.toArray('.reveal-on-scroll').forEach((elem) => {
      gsap.from(elem, {
        y: 60,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: elem,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    // Fade in animations
    gsap.utils.toArray('.fade-in-scroll').forEach((elem) => {
      gsap.from(elem, {
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: elem,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    // Scale animations
    gsap.utils.toArray('.scale-on-scroll').forEach((elem) => {
      gsap.from(elem, {
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: elem,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);
};

export default useScrollAnimations;
