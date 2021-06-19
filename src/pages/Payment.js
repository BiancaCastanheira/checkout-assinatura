import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import {
  maskCreditCardNumber,
  maskExpirationDate,
  maskCvv,
  maskCpf,
} from "../utils/InputMasker";
import { postClientCardInfo } from "../api/paymentApi";
import ButtonCheckout from "../components/ButtonCheckout";

const Payment = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cpf, setCpf] = useState("");
  const [coupon, setCoupon] = useState("");
  const [installments, setInstallments] = useState("");
  const possibleInstallments = localStorage.getItem("installments");

  const postClientCard = () => {
    const clientCard = {
      couponCode: coupon,
      creditCardCPF: cpf,
      creditCardCVV: cvv,
      credifCardExpirationDate: expirationDate,
      creditCardHolder: cardHolder,
      creditCardNumber: cardNumber,
      gateway: localStorage.getItem("gateway"),
      installments: localStorage.getItem("installments"),
      offerId: localStorage.getItem("offerId"),
      userId: localStorage.getItem("userId"),
    };
    postClientCardInfo(clientCard)
      .then((respose) => {
        console.log(respose);
      })
      .catch((error) => {
        console.error(
          "Someting went wrong when posting the client's card information."
        );
      });
  };

  let menuItemsInstallments = [];
  for (let i = 1; i <= possibleInstallments; i++) {
    menuItemsInstallments.push(
      <MenuItem value={i} key={i}>
        {i}
      </MenuItem>
    );
  }

  return (
    <div>
      <Typography variant="h5">Estamos quase lá!</Typography>
      <Typography variant="subtitle2">
        Insira seus dados de pagamento abaixo:
      </Typography>

      <TextField
        id="cartao"
        label="Número do cartão"
        placeholder="0000 0000 0000 0000"
        fullWidth={true}
        value={cardNumber}
        onChange={(e) => setCardNumber(maskCreditCardNumber(e.target.value))}
      />

      <Grid container spacing={1}>
        <Grid item xs>
          <TextField
            id="expiration-date"
            label="Validade"
            placeholder="MM/AA"
            value={expirationDate}
            onChange={(e) =>
              setExpirationDate(maskExpirationDate(e.target.value))
            }
          />
        </Grid>
        <Grid item xs>
          <TextField
            id="cvv"
            label="CVV"
            placeholder="000"
            value={cvv}
            onChange={(e) => setCvv(maskCvv(e.target.value))}
          />
        </Grid>
      </Grid>

      <Grid>
        <TextField
          id="card-holder"
          label="Nome impresso no cartão"
          placeholder="Seu nome"
          fullWidth={true}
          value={cardHolder}
          onChange={(e) => setCardHolder(e.target.value)}
        />
      </Grid>

      <Grid>
        <TextField
          id="cpf"
          label="CPF"
          placeholder="000.000.000-00"
          fullWidth={true}
          value={cpf}
          onChange={(e) => setCpf(maskCpf(e.target.value))}
        />
      </Grid>

      <Grid>
        <TextField
          id="coupon"
          label="Cupom"
          placeholder="Insira aqui"
          fullWidth={true}
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        />
      </Grid>

      <Grid>
        <FormControl fullWidth={true}>
          <InputLabel id="installments">Número de parcelas</InputLabel>
          <Select
            labelId="installments"
            id="installments"
            placeholder="Selecionar"
            value={installments}
            onChange={(e) => setInstallments(e.target.value)}
          >
            {menuItemsInstallments}
          </Select>
        </FormControl>
      </Grid>

      <ButtonCheckout
        buttonText="FINALIZAR PAGAMENTO"
        buttonClicked={postClientCard}
      />
    </div>
  );
};

export default Payment;
