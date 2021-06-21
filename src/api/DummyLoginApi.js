const ClientLogin = {
  id: 1,
  name: "Bianca Castanheira",
  email: "teste@gmail.com",
};

export const getClientData = async () => {
  return new Promise((resolve) =>
    setTimeout(resolve, 200, { data: ClientLogin, status: "success" })
  );
};
