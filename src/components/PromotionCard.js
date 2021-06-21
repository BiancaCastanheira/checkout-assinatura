import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Card from "@material-ui/core/Card";
import Radio from "@material-ui/core/Radio";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
  promotionCard: {
    minHeight: 120,
    maxWidth: 500,
    borderWidth: 2,
    borderColor: "#191847",
    borderRadius: 15,
  },
  discountChip: {
    marginLeft: 8,
    color: "white",
    backgroundColor: "#f5850b",
  },
  discountColor: {
    color: "#f5850b",
  },
  radioColor: {
    color: "#191847",
  },
}));

const PromotionCard = ({ planOption, isSelected, onPlanSelect }) => {
  const classes = useStyles();

  return (
    <div>
      <Card variant="outlined" className={classes.promotionCard}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={10}>
              <Typography variant="h6">
                {planOption.title} | {planOption.description}
              </Typography>
              <Typography variant="body1">
                <span>
                  De R$ {planOption.fullPrice} | Por R${" "}
                  {planOption.fullPrice - planOption.discountAmmount}
                </span>
                <Chip
                  label={`-  ${planOption.discountPercentage * 100}%`}
                  size="small"
                  className={classes.discountChip}
                />
              </Typography>

              {planOption.splittable === true ? (
                <Typography variant="body2" className={classes.discountColor}>
                  {planOption.installments}x de{" "}
                  {(planOption.fullPrice - planOption.discountAmmount) /
                    planOption.installments}
                  /mês
                </Typography>
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={2}>
              <Radio
                checked={isSelected}
                onChange={onPlanSelect}
                value={planOption.id}
                color="default"
                name="radio-button"
                className={classes.radioColor}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default PromotionCard;
