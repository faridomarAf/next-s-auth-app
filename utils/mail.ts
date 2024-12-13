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