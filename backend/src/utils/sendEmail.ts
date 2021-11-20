import sgmail from "@sendgrid/mail";
sgmail.setApiKey(process.env.SEND_GRID_API_KEY);

const getMailUrl = () => {
  let mailUrl: string;
  if (process.env.NODE_ENV === "prod") {
    mailUrl = "https://mynotesprod.herokuapp.com";
  } else if (process.env.NODE_ENV === "staging") {
    mailUrl = "https://mynotestaging.herokuapp.com";
  } else {
    mailUrl = "http://localhost:4000";
  }
  return mailUrl;
};

export const sendEmailVerification = async (token: string, email: string) => {
  const msg = {
    to: email,
    from: "neupanebishal07@gmail.com",
    subject: "Mynotes Email verification",
    html: `<strong>
    <a href="${getMailUrl()}/verifyemail?token=${token}"">
    Click this link to verify</a> your email this link will expire in 1hr</strong>`,
  };

  await sgmail.send(msg);

  return "email successfully sent";
};

export const sendChangePasswordEmail = async (token: string, email: string) => {
  const msg = {
    to: email,
    from: "neupanebishal07@gmail.com",
    subject: "Mynotes Change password",
    html: `<h3>A request to change your mynotes password was made
     if you didn't make the request then you can ignore this message</h3>
    <strong>
        <a href=${
          process.env.NODE_ENV === "prod"
            ? "https://mynotes-three.vercel.app/forgotPassword?token${token}"
            : "http://localhost:3000/forgotPassword?token${token}"
        }>
        Click this link to change your password</a> your email this link will expire in 1hr</strong>`,
  };

  await sgmail.send(msg);

  return "email successfully sent";
};
