import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Card from "@material-ui/core/Card";
import Radio from "@material-ui/core/Radio";

const PromotionCards = ({ planOption }) => {
  const [selectedPlan, setSelectedPlan] = useState("");

  const handleChange = (e) => {
    setSelectedPlan(e.target.value);
  };
  return (
    <div>
      <Card variant="outlined">
        <Typography variant="subtitle1">
          {planOption.title} | {planOption.description}
        </Typography>
        <Typography variant="body1">
          De R$ {planOption.fullPrice} | Por R${" "}
          {planOption.fullPrice - planOption.discountAmmount}
        </Typography>
        <Chip
          label={`-  ${planOption.discountPercentage * 100}%`}
          size="small"
        />
        {planOption.splittable === true ? (
          <Typography variant="body2">
            {planOption.installments}x de{" "}
            {(planOption.fullPrice - planOption.discountAmmount) /
              planOption.installments}
            /mês
          </Typography>
        ) : (
          ""
        )}
        <Radio
          checked={selectedPlan === "anual"}
          onChange={handleChange}
          value="anual"
          name="radio-button"
          inputProps={{ "aria-label": "A" }}
        />
      </Card>
    </div>
  );
};

export default PromotionCards;
