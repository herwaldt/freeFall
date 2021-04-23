import { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { useScrollData } from './hooks/scrollHooks';
import { Component } from './types';
import SmoothScroll from './components/SmoothScroll';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '300vh',
    background: 'linear-gradient(#0D7EFD 30%, #00F9F9 90%)',
  },
  page: {
    height: '300vh',
  },
  section: {
    width: '100%',
    height: '100vh',
    margin: 20,
  },
  box: {
    width: 250,
    height: 250,
    padding: 60,
    backgroundColor: 'blue',
  },
  sticky: {
    height: 200,
    width: 200,
    position: 'sticky',
    top: 50,
    margin: theme.spacing(5),
    backgroundColor: 'blue',
  }
}));

// TODO -- Add looping animations that go from left to right at different speeds
// TODO -- Add eslint
// TODO -- update README

const App: Component = () => {
  const classes = useStyles();
  const [boxColor, setBoxColor] = useState<string>('black')
  const {
    scrolling,
    time,
    speed,
    direction,
    position,
    relativeDistance,
    totalDistance,
  } = useScrollData({
    onScrollStart: () => {
      console.log('Started scrolling');
    },
    onScrollEnd: () => {
      console.log('Finished scrolling');
    }
  });
  console.log({
    scrolling,
    time,
    speed,
    direction,
    position,
    relativeDistance,
    totalDistance,
  })
  if (boxColor !== 'red' && direction?.y === 'up') setBoxColor('red');
  if (boxColor !== 'green' && direction?.y === 'down') setBoxColor('green');
  if (boxColor !== 'black' && !scrolling) setBoxColor('black');

  return (
    <SmoothScroll>
      <div className={classes.section}>
        <div className={classes.box} style={{ backgroundColor: boxColor }} />
      </div>
      <div className={classes.section}>
        <div className={classes.box} style={{ backgroundColor: boxColor }} />
      </div>
      <div className={classes.section}>
        <div className={classes.box} style={{ backgroundColor: boxColor }} />
      </div>
    </SmoothScroll>
  );
}

export default App;
