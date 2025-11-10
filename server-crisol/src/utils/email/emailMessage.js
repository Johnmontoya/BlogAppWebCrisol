export const accountVerificationTemplate = (user, url, otp) => ({
  body: {
    name: `${user.username}`,
    intro: "Has recibido un email de activación",
    action: {
      instructions: "Haz clic en el botón de abajo para verificar tu cuenta",
      button: {
        color: "#DC4D2F",
        text: "Verificar cuenta",
        link: `${url}/auth/verifyUser?userId=${user._id}&otp=${otp}`,
      },
    },
    outro: "¡Bienvenido!",
  },
});