export const maskCreditCardNumber = (creditCardNumber) => {
  //replace() remove os espaços
  //match() encontra blocos de 4 caracteres
  //joint() junta uma array de strings em uma nova string
  //substring() garante que tenha no máximo 19 caracteres a string final
  return (
    creditCardNumber
      .replace(/[^0-9]/g, "")
      .match(/.{1,4}/g)
      ?.join(" ")
      .substring(0, 19) || ""
  );
};

export const maskExpirationDate = (expirationDate) => {
  return (
    expirationDate
      .replace(/[^0-9]/g, "")
      .match(/.{1,2}/g)
      ?.join("/")
      .substring(0, 5) || ""
  );
};

export const maskCvv = (cvv) => {
  return (
    cvv
      .replace(/[^0-9]/g, "")
      .match(/.{1,3}/g)
      ?.join("")
      .substring(0, 3) || ""
  );
};

export const maskCpf = (cpf) => {
  return (
    cpf
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
      .substring(0, 14) || ""
  );
};
