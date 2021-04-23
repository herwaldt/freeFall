import { useEffect, useRef } from "react";
import { makeStyles } from '@material-ui/core';

import useWindowSize from "../hooks/useWindowSize";
import { ChildrenProps, Component } from "../types";

const useStyles = makeStyles(() => ({
  container: {
    background: 'linear-gradient(#0D7EFD 30%, #00F9F9 90%)',
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    pointerEvents: 'none',
  },
}));

const SmoothScroll: Component<ChildrenProps> = ({
  children,
}) => {
  const classes = useStyles();
  const windowSize = useWindowSize();

  const scrollingContainerRef = useRef<any>();

  const data = {
    ease: 0.1,
    current: 0,
    previous: 0,
    rounded: 0,
  };

  useEffect(() => {
    setBodyHeight();
  }, [windowSize.height]);

  const setBodyHeight = () => {
    document.body.style.height = `${scrollingContainerRef.current.getBoundingClientRect().height
      }px`;
  };

  useEffect(() => {
    requestAnimationFrame(() => smoothScrollingHandler());
  }, []);

  const smoothScrollingHandler = () => {
    data.current = window.scrollY;
    data.previous += (data.current - data.previous) * data.ease;
    data.rounded = Math.round(data.previous * 100) / 100;

    scrollingContainerRef.current.style.transform = `translateY(-${data.previous}px)`;

    // Recursive call
    requestAnimationFrame(() => smoothScrollingHandler());
  };

  return (
    <div className={classes.container}>
      <div ref={scrollingContainerRef}>{children}</div>
    </div>
  );
};

export default SmoothScroll;
