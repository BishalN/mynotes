import sgmail from "@sendgrid/mail";
sgmail.setApiKey(process.env.SEND_GRID_API_KEY);

export const sendEmailVerification = async (token: string, email: string) => {
  const msg = {
    to: email,
    from: "neupanebishal07@gmail.com",
    subject: "Mynotes Email verification",
    html: `<strong>
    <a href="http://localhost:4000/verify/email?token=${token}"">
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
        <a href="http://localhost:4000/verify/email?token${token}"">
        Click this link to change your password</a> your email this link will expire in 1hr</strong>`,
  };

  await sgmail.send(msg);

  return "email successfully sent";
};
