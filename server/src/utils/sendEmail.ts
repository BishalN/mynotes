import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

export const sendVerifyEmail = async (email: string, token: string) => {
  console.log('Sending email to ' + email);
  const msg = {
    to: email,
    from: 'bishalisontheline@gmail.com',
    subject: 'MyNotes Email verification',
    html: `<strong>Verify your email this link will expire in 1 hour</strong>
    <a clicktracking="off" href="http://localhost:4000/auth/local/?token=${token}">
    click here</a>`,
  };

  try {
    await sgMail.send(msg);
    console.log('Mail sent ');
  } catch (error) {
    console.log(error);
  }
};

export const sendForgotPasswordEmail = async (email: string, token: string) => {
  console.log('Sending email to ' + email);
  const msg = {
    to: email,
    from: 'bishalisontheline@gmail.com',
    subject: 'MyNotes Forgot password',
    html: `<strong>We got a password change request for your account.
     If you didn't request to change password then you don't have to anything.</strong>
    <a clicktracking="off" href="http://localhost:4000/auth/local/?token=${token}">
    click here to change password</a>`,
  };

  try {
    await sgMail.send(msg);
    console.log('Mail sent ');
  } catch (error) {
    console.log(error);
  }
};
