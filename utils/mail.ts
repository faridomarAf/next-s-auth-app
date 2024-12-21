import {Resend} from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async(email: string, token: string)=>{
    //create confirmLink, which use to email to user
    const confirmLink = `http://localhost:3000/new-verification?token=${token} `; 

    //send email
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirm your account",
        html: `<p>Click <a href="${confirmLink}">here<a/>to confirm</p>`
    })
}

// send reset token by mail
export const sendPasswordResetEmail = async(email: string, token: string)=>{
    
    const resetLink = `http://localhost:3000/new-password?token=${token} `; 
     
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset password",
        html: `<p>Click <a href="${resetLink}">here<a/>to reset</p>`
    })
}


export const sendTwoFactorTokenEmail = async(token: string, email: string)=>{
   await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "2FA code",
    html: `<p>Your 2FA code ${token}</p>`
   });
} 