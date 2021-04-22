import { useState } from 'react';
import {
  makeStyles,
} from '@material-ui/core';
import { useScrollData } from './hooks/scrollHooks';
import { Component } from './types';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '300vh',
    background: 'linear-gradient(#0D7EFD 30%, #00F9F9 90%)',
  },
  box: {
    position: 'sticky',
    top: 50,
    height: 200,
    width: 200,
    margin: theme.spacing(5),
    backgroundColor: 'blue',
    borderColor: 'white',
    '&:hover': {
      backgroundColor: 'red',
    },
  },
}));

// TODO -- make scroll wheel smooth animation like trackpad
// TODO -- Add looping animations that go from left to right at different speeds

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
    <div className={classes.container}>
      <div className={classes.box} style={{ backgroundColor: boxColor }} />
    </div>
  );
}

export default App;
