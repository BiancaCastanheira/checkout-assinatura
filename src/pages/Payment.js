import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import { postClientCardInfo } from "../api/paymentApi";
import ButtonCheckout from "../components/ButtonCheckout";

const Payment = () => {
  const [cardNumer, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cpf, setCpf] = useState("");
  const [coupon, setCoupon] = useState("");
  const [installments, setInstallments] = useState("");

  const postClientCard = () => {
    const clientCard = {
      couponCode: coupon,
      creditCardCPF: cpf,
      creditCardCVV: cvv,
      credifCardExpirationDate: expirationDate,
      creditCardHolder: cardHolder,
      creditCardNumber: cardNumer,
      gateway: localStorage.getItem("gateway"),
      installments: localStorage.getItem("installments"),
      offerId: localStorage.getItem("offerId"),
      userId: localStorage.getItem("userId"),
    };
    postClientCardInfo(clientCard).then((respose) => {
      console.log(respose);
    });
  };

  return (
    <div>
      <Typography variant="h5">Estamos quase lá!</Typography>
      <Typography variant="subtitle2">
        Insira seus dados de pagamento abaixo:
      </Typography>

      <TextField
        id="card-number"
        label="Número do cartão"
        fullWidth={true}
        value={cardNumer}
        onChange={(e) => setCardNumber(e.target.value)}
      />
      <Grid container spacing={1}>
        <Grid item xs>
          <TextField
            id="expiration-date"
            label="Validade"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
          />
        </Grid>
        <Grid item xs>
          <TextField
            id="cvv"
            label="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
        </Grid>
      </Grid>

      <Grid>
        <TextField
          id="card-holder"
          label="Nome impresso no cartão"
          fullWidth={true}
          value={cardHolder}
          onChange={(e) => setCardHolder(e.target.value)}
        />
      </Grid>

      <Grid>
        <TextField
          id="cpf"
          label="CPF"
          fullWidth={true}
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
      </Grid>

      <Grid>
        <TextField
          id="coupon"
          label="Cupom"
          fullWidth={true}
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        />
      </Grid>

      <Grid>
        <TextField
          id="installments"
          label="Número de parcelas"
          fullWidth={true}
          value={installments}
          onChange={(e) => setInstallments(e.target.value)}
        />
      </Grid>

      <ButtonCheckout
        buttonText="FINALIZAR PAGAMENTO"
        buttonClicked={postClientCard}
      />
    </div>
  );
};

export default Payment;
