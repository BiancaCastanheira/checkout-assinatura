import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Button from "@material-ui/core/Button";
import ButtonCheckout from "../components/ButtonCheckout";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  textCenter: {
    textAlign: "center",
  },
  circle: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: "50%",
    borderColor: "#BCC8C8",
  },
  marginTop3: {
    marginTop: 12,
  },
  lightColor: {
    color: "#bcc8c8",
  },
  backGroundGrey: {
    backgroundColor: "#E0E0E0",
  },
  outerCard: {
    maxWidth: 600,
    borderRadius: 15,
  },
  insideCard: {
    borderRadius: 15,
    backgroundColor: "#F0F0F0",
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
      <Grid
        container
        spacing={1}
        justify="center"
        style={{ marginTop: 16, marginBottom: 36 }}
      >
        <Grid item xs={false}>
          <img src="favicon.png" alt="logo" />
        </Grid>
      </Grid>

      <Grid container spacing={1} justify="center" style={{ marginTop: 16 }}>
        <Grid item xs={false} className={classes.textCenter}>
          <div className={classes.circle}>
            <CheckOutlinedIcon fontSize="large" style={{ marginTop: 4 }} />
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={1} justify="center" style={{ marginTop: 8 }}>
        <Grid item xs={false} className={classes.textCenter}>
          <Typography variant="h5" style={{ marginBottom: 8, marginTop: 4 }}>
            Parabéns!
          </Typography>
          <Typography variant="subtitle1" className={classes.lightColor}>
            Sua assinatura foi realizada com sucesso.
          </Typography>
        </Grid>
      </Grid>

      <Grid container justify="center" style={{ marginTop: 24 }}>
        <Grid item xs={false}>
          <Card className={classes.outerCard}>
            <CardContent>
              <Card className={classes.insideCard} elevation={0}>
                <CardContent>
                  <Grid container spacing={0} alignItems="center">
                    <Grid item xs={false}>
                      <Avatar
                        style={{ marginLeft: 8, backgroundColor: "#C8C8C8" }}
                      >
                        <StarBorderIcon style={{ color: "#444444" }} />
                      </Avatar>
                    </Grid>
                    <Grid item xs style={{ textAlign: "right" }}>
                      <Typography
                        variant="subtitle1"
                        style={{ marginLeft: 48 }}
                      >
                        {planTitle} | {description}
                      </Typography>
                      <Typography variant="body1">
                        R$ {promotionalPrice} | {choosenNumInstallments}x R$
                        {promotionalPrice / choosenNumInstallments}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Grid
                container
                spacing={3}
                alignItems="center"
                style={{ marginTop: 8 }}
              >
                <Grid item xs>
                  <Typography className={classes.lightColor}>E-mail</Typography>
                  <Typography
                    className={classes.lightColor}
                    style={{ marginTop: 12 }}
                  >
                    CPF
                  </Typography>
                </Grid>
                <Grid item xs style={{ textAlign: "right" }}>
                  <Typography>{clientEmail}</Typography>
                  <Typography style={{ marginTop: 12 }}>{clientCpf}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={0} justify="center" style={{ marginTop: 24 }}>
        <Grid item xs={12} className={classes.textCenter}>
          <Button size="small">
            <Typography variant="overline" style={{ color: "#191847" }}>
              Gerenciar assinatura
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} className={classes.textCenter}>
          <ButtonCheckout
            buttonText="IR PARA A HOME"
            buttonClicked={() => (window.location.href = "/subscription-plans")}
            size="large"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default PurchaseConfirmation;
