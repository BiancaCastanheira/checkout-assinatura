import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  buttonStyle: {
    backgroundColor: "#191847",
    color: "#fff",
    borderRadius: 100,
    marginTop: 10,
  },
}));

const ButtonCheckout = ({ buttonText, buttonClicked, disabled }) => {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      className={classes.buttonStyle}
      onClick={buttonClicked}
      disabled={disabled}
    >
      {buttonText}
    </Button>
  );
};

export default ButtonCheckout;
