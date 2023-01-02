const transporter = require("./configs/mail");

const sendMail = async ({ from, to, subject, text, html }) => {
  await transporter.sendMail({ from, to, subject, text, html });
};

const verifyOtp = async (user) => {
  await sendMail({
    from: `My Todo App ${process.env.email}`,
    to: user.email,
    subject: `Otp Verification`,
    text: `Your 4 digit otp is ${user.otp}.`,
    html: `<h3>Your 4 digit otp is ${user.otp}.</h3>`,
  });
};

const welcomeMail = async (user) => {
  await sendMail({
    from: `My Todo App ${process.env.email}`,
    to: user.email,
    subject: `Welcome to My Todo App ${user.name}`,
    text: `Hi ${user.name},
        You are successfully registered on My Todo App.
        
        Start Making your Tasks!!`,
    html: `<h4>Hi ${user.name},</h4>
        <h3>You are successfully registered on My Todo App.</h3>
        
        <h3>Start Making your Tasks!!</h3>`,
  });
};

const resetMail = async (user) => {
  await sendMail({
    from: `My Todo App ${process.env.email}`,
    to: user.email,
    subject: `Password Reset Alert`,
    text: `Hi ${user.name},
        Your password was changed successfully.`,
    html: `<h4>Hi ${user.name},</h4>
        <h3>Your password was changed successfully.</h3>`,
  });
};

const adminMail = async (user) => {
  await sendMail({
    from: `My Todo App ${process.env.email}`,
    to: "anubhav.varshney02nov@gmail.com",
    subject: `${user.name} has registered with us`,
    text: `Please welcome ${user.name}.`,
  });
};

module.exports = { verifyOtp, welcomeMail, adminMail, resetMail };
