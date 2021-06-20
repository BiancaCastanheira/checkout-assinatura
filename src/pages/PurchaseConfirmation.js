import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Button from "@material-ui/core/Button";
import ButtonCheckout from "../components/ButtonCheckout";

const useStyles = makeStyles((theme) => ({
  circle: {
    borderRadius: 50,
    color: "#BCC8C8",
  },
}));

const PurchaseConfirmation = () => {
  const classes = useStyles();

  const planTitle = localStorage.getItem("planTitle");
  const description = localStorage.getItem("description");
  const promotionalPrice = localStorage.getItem("promotionalPrice");
  const clientEmail = localStorage.getItem("clientEmail");
  const clientCpf = localStorage.getItem("clientCpf");
  const choosenNumInstallments = localStorage.getItem("choosenNumInstallments");

  return (
    <div>
      <img src="favicon.png" alt="logo" />
      <div className={classes.circle}>
        <CheckOutlinedIcon />
      </div>
      <Typography variant="h5">Parabéns!</Typography>
      <Typography variant="span">
        Sua assinatura foi realizada com sucesso.
      </Typography>
      <Card>
        <List>
          <ListItem>
            <Grid container>
              <Grid item xs>
                <StarBorderIcon />
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">
                  {planTitle} | {description}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  R$ {promotionalPrice} | {choosenNumInstallments}x R$
                  {promotionalPrice / choosenNumInstallments}
                </Typography>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item>
                <Typography variant="span">E-mail</Typography>
              </Grid>
              <Grid item>{clientEmail}</Grid>
            </Grid>

            <Grid container>
              <Grid item>
                <Typography variant="span">CPF</Typography>
              </Grid>
              <Grid item>{clientCpf}</Grid>
            </Grid>
          </ListItem>
        </List>
      </Card>

      <Button>
        <Typography variant="body2">Gerenciar assinatura</Typography>
      </Button>

      <ButtonCheckout buttonText="IR PARA A HOME" />
    </div>
  );
};

export default PurchaseConfirmation;
