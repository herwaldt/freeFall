import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { useTheme, MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { ChildrenProps, Component } from './types';

const StyleProviders: Component<ChildrenProps> = ({ children }) => {
  const theme = useTheme();
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

ReactDOM.render(
  <StyleProviders>
    <App />
  </StyleProviders>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
