import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import PromotionCard from "../components/PromotionCard";
import ButtonCheckout from "../components/ButtonCheckout";

import { getSubscriptionPlans } from "../api/SubscriptionPlanApi";
import { getClientData } from "../api/DummyLoginApi";

const useStyles = makeStyles((theme) => ({
  textCenter: {
    textAlign: "center",
  },
  marginBox: {
    marginTop: 10,
    marginRight: 30,
    marginLeft: 50,
  },
  marginTop3: {
    marginTop: 12,
  },
}));

const SubscriptionPlans = () => {
  const classes = useStyles();

  const [planOptions, setPlanOptions] = useState([]);
  const [clientData, setClientData] = useState({});
  const [selectedPlanId, setSelectedPlanId] = useState("");

  useEffect(() => {
    getSubscriptionPlans()
      .then((response) => {
        console.log(response);
        setPlanOptions(response.data);
      })
      .catch((error) => {
        console.error("Error in requesting subscription plans");
      });
    getClientData()
      .then((response) => {
        setClientData(response.data);
      })
      .catch((error) => {
        console.error("Error in requesting client's email");
      });
  }, []);

  const onPlanSelect = (event) => {
    setSelectedPlanId(parseInt(event.target.value));
  };

  const buttonClicked = () => {
    const selectedPlan = planOptions.find(
      (planOption) => planOption.id === selectedPlanId
    );
    localStorage.setItem("offerId", selectedPlan.id);
    localStorage.setItem("userId", clientData.id);
    localStorage.setItem("clientEmail", clientData.email);
    localStorage.setItem("installments", selectedPlan.installments);
    localStorage.setItem("gateway", selectedPlan.gateway);
    localStorage.setItem("planTitle", selectedPlan.title);
    localStorage.setItem("description", selectedPlan.description);
    localStorage.setItem(
      "promotionalPrice",
      selectedPlan.fullPrice - selectedPlan.discountAmmount
    );
    window.location.href = "/payment";
  };

  return (
    <div>
      <Grid
        container
        spacing={1}
        justify="center"
        className={classes.marginTop3}
      >
        <Grid item xs={false}>
          <Typography variant="h5">Confira o seu plano:</Typography>
          <Chip label={clientData.email} variant="outlined" />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={1}
        justify="center"
        className={classes.marginTop3}
      >
        {planOptions.map((planOption) => (
          <Grid item xs={false}>
            <PromotionCard
              key={planOption.id}
              planOption={planOption}
              isSelected={planOption.id === selectedPlanId}
              onPlanSelect={onPlanSelect}
            />
          </Grid>
        ))}
      </Grid>

      <Grid
        container
        spacing={1}
        justify="center"
        className={classes.marginTop3}
      >
        <Grid item xs={false}>
          <Button>
            <Typography variant="body2">
              Sobre a cobrança
              <HelpOutlineIcon style={{ fontSize: "medium" }} />
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={1}
        justify="center"
        className={classes.marginTop3}
      >
        <Grid item xs={false}>
          <ButtonCheckout
            buttonText="QUERO ESTE PLANO"
            buttonClicked={buttonClicked}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default SubscriptionPlans;
