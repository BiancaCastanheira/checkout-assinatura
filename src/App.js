import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["DM Sans"].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App"></div>
    </ThemeProvider>
  );
}

export default App;
