import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
//routers
import testRouter from '../routes/test.route';

class Server {
	private app: express.Application;
	private port: string | number;
	private apiRoutes: { [key: string]: string };

	constructor() {
		this.app = express();
		this.port = 8080 || process.env.PORT;
		this.apiRoutes = {
			test: '/api/test',
		};
		// this.connectDb();
		this.middlewares();
		this.routes();
	}
	// async connectDb() {}
	middlewares() {
		//CORS
		// const whiteList = [];
		// this.app.use(
		// 	cors({
		// 		origin: (origin, callback) => {
		// 			if (whiteList.indexOf(origin) !== -1) {
		// 				callback(null, true);
		// 			} else {
		// 				callback(new Error('Not allowed by CORS'));
		// 			}
		// 		},
		// 	})
		// );
		this.app.use(cors());

		//Lectura y parseo body
		this.app.use(express.json());
		// File Upload
		this.app.use(
			fileUpload({
				useTempFiles: true,
				tempFileDir: '/tmp/',
				//permite subir archivos y crear la carpeta si es necesario
				// createParentPath: true,
			})
		);
	}
	routes() {
		this.app.use(this.apiRoutes.test, testRouter);
	}
	listen() {
		this.app.listen(this.port, () => {
			console.log(`Servidor corriendo en puerto ${this.port}`);
		});
	}
}

export default Server;
