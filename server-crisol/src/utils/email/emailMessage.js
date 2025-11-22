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

export const emailRecovery = (user, uri, token) => ({
  body: {
    name: `${user.username}`,
    intro: "Has recibido un email de recuperación de contraseña",
    action: {
      instructions: "Click en el boton de abajo para cambiar su contraseña",
      button: {
        color: "#DC4D2F",
        text: "Cambiar contraseña",
        link: `${uri}/reset-password?userId=${user.id}&token=${token}`,
      },
    },
    outro:
      "Si tu no has solicitado ningun cambio de contraseña, omite esta información",
  },
});
