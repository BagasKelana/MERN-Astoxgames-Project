import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import gamesRoutes from './routes/games.js';
import usersRoutes from './routes/users.js';
import compression from 'compression';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { createError } from './utils/error.js';
import { promisify } from 'util';
import Game from './models/Game.js';

const app = express();
dotenv.config();

app.use(compression());

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;


const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('mongodb connection success');
	} catch (err) {
		console.log(err);
	}
};

mongoose.connection.on('disconnected', () => {
	console.log('mongodb disconnected');
});

// middleware
const corsOptions = {
	origin: process.env.CLIENT_URL,
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//api routes
app.use('/auth', authRoutes);
app.use('/user', usersRoutes);
app.use('/games', gamesRoutes);

const storage = multer.diskStorage({
	destination: async (req, file, cb) => {
		// const title = req.body.title
		// const name = title.includes(":") ? title.split(":").join("") : title
		const uploadPath = `public/images/games`;

		await fs.promises.mkdir(uploadPath, { recursive: true });

		cb(null, uploadPath);
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const unlinkAsync = promisify(fs.unlink);

const upload = multer({ storage: storage });

app.post('/upload', upload.array('images', 1000), function (req, res, next) {
	try {
		if (!req.files) return next(createError(500, 'multer salah bos'));

		const responseSuccess = [];
		const responseFail = [];

		const response = {
			message: 'Image upload Success!',
			responseSuccess,
			responseFail,
		};
		const allowedImageTypes = [
			'image/jpeg',
			'image/png',
			'image/gif',
			'image/webp',
			'image/jpg',
		];

		for (let i = 0; i < req.files.length; i++) {
			if (!allowedImageTypes.includes(req.files[i].mimetype)) {
				responseFail.push(path.relative('public', req.files[i].path));
			} else {
				responseSuccess.push({
					image: `http://localhost:3000/${path.relative(
						'public',
						req.files[i].path
					)}`,
					upload: true,
				});
			}
		}

		return res.send(response);
	} catch (err) {
		next(err);
	}
});
app.post('/replace', upload.single('images'), async function (req, res, next) {
	try {
		if (!req.file) return next(createError(500, 'multer salah bos'));
		const responseSuccess = [];
		const responseFail = [];

		const response = {
			message: 'Image upload Success!',
			responseSuccess,
			responseFail,
		};
		const allowedImageTypes = [
			'image/jpeg',
			'image/png',
			'image/gif',
			'image/webp',
			'image/jpg',
		];

		if (!allowedImageTypes.includes(req.file.mimetype)) {
			responseFail.push(path.relative('public', req.file.path));
		} else {
			responseSuccess.push({
				image: `${process.env.SERVER_URL}/${path.relative(
					'public',
					req.file.path
				)}`,
				upload: true,
			});
		}

		req.body.currentImage && (await unlinkAsync(req.body.currentImage));

		return res.send(response);
	} catch (err) {
		next(err);
	}
});

app.get('/halo', (req, res, next) => {
	const folderPath = 'public/images/games-card';

	// Membaca isi dari folder
	fs.readdir(folderPath, async (err, files) => {
		try {
			const start = req.query.start;
			const limit = req.query.limit;
			const imagePaths = files
				.filter(
					(file) =>
						file.endsWith('.jpg') ||
						file.endsWith('.png') ||
						file.endsWith('.jpeg')
				)
				.map((file) => path.parse(`/images/games-card/${file}`));

			for (let i = +start; i < imagePaths.length; i++) {
				await Game.findOneAndUpdate(
					{ _id: imagePaths[i].name },
					{
						$set: {
							card_image: `${imagePaths[i].dir}/${imagePaths[i].base}`,
						},
					},
					{ new: true }
				).lean();
			}

			return res.status(200).json(imagePaths);
		} catch (err) {
			console.log(err);
		}
	});
});

//middleware Error
app.use((err, req, res, next) => {
	const errorStatus = err.status || 500;
	const errorMessage = err.message || 'Something went wrong!';
	return res.status(errorStatus).json({
		success: false,
		status: errorStatus,
		message: errorMessage,
		stack: err.stack,
	});
});

app.listen(PORT, (req, res) => {
	connect();
	console.log(`server running on port ${PORT}`);
});
