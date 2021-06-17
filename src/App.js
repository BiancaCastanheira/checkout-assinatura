import Routes from "./routes";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["DM Sans"].join(","),
  },
  //pallete: {
  //   primary: {
  //     main: ""
  //   }
  // }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
