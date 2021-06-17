import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Button from "@material-ui/core/Button";

import PromotionCards from "../components/PromotionCards";

import { getSubscriptionPlans } from "../api/SubscriptionPlanApi";
import { getClientData } from "../api/DummyLoginApi";

const SubscriptionPlans = () => {
  const [planOptions, setPlanOptions] = useState([]);
  const [clientData, setClientData] = useState({});

  useEffect(() => {
    getSubscriptionPlans()
      .then((response) => {
        setPlanOptions(response.data);
      })
      .catch((error) => {
        console.error("Error in requesting subscription plans");
      });
    getClientData()
      .then((response) => {
        console.log(response);
        setClientData(response.data);
        console.log(clientData.email);
      })
      .catch((error) => {
        console.error("Error in requesting client's email");
      });
  }, []);

  return (
    <div>
      <img src="favicon.png" alt="logo" />
      <Typography variant="h5">Confira o seu plano:</Typography>
      <Chip label={clientData.email} variant="outlined" />
      {planOptions.map((planOption) => (
        <PromotionCards key={planOption.id} planOption={planOption} />
      ))}
      <Button>
        <Typography variant="body2">
          Sobre a cobrança
          <HelpOutlineIcon style={{ fontSize: "medium" }} />
        </Typography>
      </Button>
    </div>
  );
};

export default SubscriptionPlans;
