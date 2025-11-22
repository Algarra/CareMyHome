'use server';

import nodemailer from 'nodemailer';
import { newUserWelcome } from './mailTemplates/newUserWelcome';
import { passwordRecover } from './mailTemplates/passwordRecover';
import { newPasswordSaved } from './mailTemplates/newPasswordSaved';

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: 'mountainbikescanada@gmail.com',
		pass: 'euvf hwzg hhix szvm',
	},
});

const notifyRoomsolversTeam = (subject: string, text: string) => {
	transporter.sendMail({
		to: ['a.armada@roomsolvers.com', 'd.algarra@roomsolvers.com'], // list of receivers
		from: 'MountainBikesCanada <mountainbikescanada@gmail.com>', // sender address
		subject, // Subject line
		html: `<b>${text}</b>`, // HTML body content
	});
};

export const sendWelcomeEmail = async (user: { email: string; username: string }) => {
	transporter
		.sendMail({
			to: user.email, // list of receivers
			from: 'MountainBikesCanada <mountainbikescanada@gmail.com>', // sender address
			subject: 'Welcome to the Community ✔', // Subject line
			html: newUserWelcome(user.username), // HTML body content
		})
		.then(() => {
			console.log('Message sent');
		})
		.catch(error => {
			console.error('Something went wrong sending email', error);
		});

	notifyRoomsolversTeam('NEW USER ✔', `WE HAVE A NEW USER ${user.email}`);
};

export const sendPasswordRecoveryEmail = async (user: { email: string; token: string }) => {
	transporter
		.sendMail({
			to: user.email, // list of receivers
			from: 'MountainBikesCanada <mountainbikescanada@gmail.com>', // sender address
			subject: 'Password recovery ✔', // Subject line
			html: passwordRecover(user.token), // HTML body content
		})
		.then(() => {
			console.log('Message sent');
		})
		.catch(error => {
			console.error('Something went wrong sending email', error);
		});

	notifyRoomsolversTeam('Password recovery request ✔', `NEW PASSWORD REQUESTED FOR ${user.email}`);
};

export const sendPasswordUpdateSuccessfullEmail = async (user: { email: string }) => {
	transporter
		.sendMail({
			to: user.email, // list of receivers
			from: 'MountainBikesCanada <mountainbikescanada@gmail.com>', // sender address
			subject: 'Password Setted ✔', // Subject line
			html: newPasswordSaved(), // HTML body content
		})
		.then(() => {
			console.log('Message sent');
		})
		.catch(error => {
			console.error('Something went wrong sending email', error);
		});

	notifyRoomsolversTeam('Password update ✔', `NEW PASSWORD SAVED FOR ${user.email}`);
};
