import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Button from "@material-ui/core/Button";

import PromotionCards from "../components/PromotionCards";
import ButtonCheckout from "../components/ButtonCheckout";

import { getSubscriptionPlans } from "../api/SubscriptionPlanApi";
import { getClientData } from "../api/DummyLoginApi";

const SubscriptionPlans = () => {
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
    localStorage.setItem("installments", selectedPlan.installments);
    localStorage.setItem("gateway", selectedPlan.gateway);
    window.location.href = "/payment";
  };

  return (
    <div>
      <Typography variant="h5">Confira o seu plano:</Typography>
      <Chip label={clientData.email} variant="outlined" />
      {planOptions.map((planOption) => (
        <PromotionCards
          key={planOption.id}
          planOption={planOption}
          isSelected={planOption.id === selectedPlanId}
          onPlanSelect={onPlanSelect}
        />
      ))}
      <Button>
        <Typography variant="body2">
          Sobre a cobrança
          <HelpOutlineIcon style={{ fontSize: "medium" }} />
        </Typography>
      </Button>

      <ButtonCheckout
        buttonText="QUERO ESTE PLANO"
        buttonClicked={buttonClicked}
      />
    </div>
  );
};

export default SubscriptionPlans;
