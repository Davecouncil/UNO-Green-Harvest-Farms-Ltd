import { useEffect, useRef, useState } from "react";

function useInView(options = { threshold: 0.15 }) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect(); // animate once, don't re-trigger on scroll back up
      }
    }, options);

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
}

export default useInView;