import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseGSAPAnimationsOptions {
  fadeIn?: boolean;
  slideUp?: boolean;
  slideLeft?: boolean;
  slideRight?: boolean;
  scale?: boolean;
  rotate?: boolean;
  duration?: number;
  delay?: number;
  stagger?: number;
}

export const useGSAPAnimations = (
  ref: React.RefObject<HTMLElement>,
  options: UseGSAPAnimationsOptions = {}
) => {
  const {
    fadeIn = true,
    slideUp = false,
    slideLeft = false,
    slideRight = false,
    scale = false,
    rotate = false,
    duration = 1,
    delay = 0,
    stagger = 0,
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    // Set initial state
    const initialState: gsap.TweenVars = { opacity: 0 };
    
    if (slideUp) initialState.y = 100;
    if (slideLeft) initialState.x = -100;
    if (slideRight) initialState.x = 100;
    if (scale) initialState.scale = 0.8;
    if (rotate) initialState.rotation = 10;

    gsap.set(element, initialState);

    // Create animation
    const animationConfig: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotation: 0,
      duration,
      delay,
      ease: 'power3.out',
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        markers: false,
      },
    });

    if (stagger > 0 && element.children) {
      tl.to(element.children, animationConfig, stagger);
    } else {
      tl.to(element, animationConfig);
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      tl.kill();
    };
  }, [ref, fadeIn, slideUp, slideLeft, slideRight, scale, rotate, duration, delay, stagger]);
};

export const useParallaxGSAP = (
  ref: React.RefObject<HTMLElement>,
  speed: number = 0.5
) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    gsap.to(element, {
      yPercent: -50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        markers: false,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [ref, speed]);
};
