import React, { useState, useEffect } from "react";
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
  const [cardNumberError, setCardNumberError] = useState(false);
  const [expirationDate, setExpirationDate] = useState("");
  const [expirationDateError, setExpirationDateError] = useState(false);
  const [cvv, setCvv] = useState("");
  const [cvvError, setCvvError] = useState(false);
  const [cardHolder, setCardHolder] = useState("");
  const [cardHolderError, setCardHolderError] = useState(false);
  const [cpf, setCpf] = useState("");
  const [cpfError, setCpfError] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const [installments, setInstallments] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
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

  useEffect(() => {
    if (
      cardNumberError ||
      expirationDateError ||
      cvvError ||
      cardHolderError ||
      cpfError ||
      buttonDisabled
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [
    cardNumberError,
    expirationDateError,
    cvvError,
    cardHolderError,
    cpfError,
    buttonDisabled,
  ]);

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
        required={true}
        value={cardNumber}
        onChange={(e) => setCardNumber(maskCreditCardNumber(e.target.value))}
        onBlur={() => setCardNumberError(cardNumber.length < 19)}
        error={cardNumberError}
        helperText={cardNumberError ? "Número do cartão inválido." : ""}
      />

      <Grid container spacing={1}>
        <Grid item xs>
          <TextField
            id="expiration-date"
            label="Validade"
            placeholder="MM/AA"
            required={true}
            value={expirationDate}
            onChange={(e) =>
              setExpirationDate(maskExpirationDate(e.target.value))
            }
            onBlur={() => setExpirationDateError(expirationDate.length < 5)}
            error={expirationDateError}
            helperText={expirationDateError ? "Data inválida" : ""}
          />
        </Grid>
        <Grid item xs>
          <TextField
            id="cvv"
            label="CVV"
            placeholder="000"
            required={true}
            value={cvv}
            onChange={(e) => setCvv(maskCvv(e.target.value))}
            onBlur={() => setCvvError(cvv.length < 3)}
            error={cvvError}
            helperText={cvvError ? "CVV inválido" : ""}
          />
        </Grid>
      </Grid>

      <Grid>
        <TextField
          id="card-holder"
          label="Nome impresso no cartão"
          placeholder="Seu nome"
          fullWidth={true}
          required={true}
          value={cardHolder}
          onChange={(e) => setCardHolder(e.target.value)}
          onBlur={() => setCardHolderError(cardHolder.length < 5)}
          error={cardHolderError}
          helperText={cardHolderError ? "Nome inválido" : ""}
        />
      </Grid>

      <Grid>
        <TextField
          id="cpf"
          label="CPF"
          placeholder="000.000.000-00"
          fullWidth={true}
          required={true}
          value={cpf}
          onChange={(e) => setCpf(maskCpf(e.target.value))}
          onBlur={() => setCpfError(cpf.length < 14)}
          error={cpfError}
          helperText={cpfError ? "CPF inválido" : ""}
        />
      </Grid>

      <Grid>
        <TextField
          id="coupon"
          label="Cupom"
          placeholder="Insira aqui"
          fullWidth={true}
          required={false}
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        />
      </Grid>

      <Grid>
        <FormControl fullWidth={true} required={true}>
          <InputLabel id="installments">Número de parcelas</InputLabel>
          <Select
            labelId="installments"
            id="installments"
            placeholder="Selecionar"
            value={installments}
            onChange={(e) => {
              setInstallments(e.target.value);
              setButtonDisabled(false);
            }}
          >
            {menuItemsInstallments}
          </Select>
        </FormControl>
      </Grid>

      <ButtonCheckout
        buttonText="FINALIZAR PAGAMENTO"
        buttonClicked={postClientCard}
        disabled={!isValid}
      />
    </div>
  );
};

export default Payment;
