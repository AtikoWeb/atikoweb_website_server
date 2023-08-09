import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';

const app = express();
const PORT = process.env.PORT || 8888;

app.use(express.json());
app.use(cors());

app.post('/mail', (req, res) => {
	const { subject, html } = req.body;

	// Настройка транспорта для nodemailer
	const transporter = nodemailer.createTransport({
		service: 'Mail', // Можно использовать другой SMTP сервис или данные вашего почтового сервера
		secure: false,
		auth: {
			user: 'timmy.shiyanov@mail.ru', // Поменяйте на вашу почту
			pass: 'SFw7X6cgtDJCDU5LNV45', // Поменяйте на пароль от вашей почты
		},
		host: 'smtp.mail.ru',
		port: '587',
	});

	const mailOptions = {
		from: 'timmy.shiyanov@mail.ru', // Отправитель
		to: 'evgeniy.hoffman@mail.ru', // Получатель
		subject,
		html,
	};

	// Отправка письма
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
			res.status(500).send('Что-то пошло не так');
		} else {
			console.log('Email sent: ' + info.response);
			res.send('Письмо успешно отправлено');
		}
	});
});

const startApp = async () => {
	try {
		app.listen(PORT, () => {
			console.log(`Server started on PORT ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

startApp();
