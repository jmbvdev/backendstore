const {ref, uploadBytes, getDownloadURL}= require("firebase/storage")
// Models
const { Repair } = require('../models/repair.model');
const { User } = require('../models/user.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const {storage}= require("../utils/firebase")

const getAllCompletedRepairs = catchAsync(async (req, res, next) => {
	const repairs = await Repair.findAll({
		where: { status: 'completed' },
		include: [{ model: User, attributes: ['id', 'name', 'email'] }],
	});
	const repairsPromises=repairs.map(async repair=>{
		//Create firebase img ref and get the full path
		
		const imgRef=ref(storage, repair.imgPath)
		const url=await getDownloadURL(imgRef)
		// Update the repairs imgPath poperthy
		repair.imgPath= url
		return repair
	
	})
	//resolve any problem that map have us
	const repairsResolved=await Promise.all(repairsPromises)

	res.status(200).json({
		repairs: repairsResolved
	});
});

const getAllPendingRepairs = catchAsync(async (req, res, next) => {
	const repairs = await Repair.findAll({
		where: { status: 'pending' },
		include: [{ model: User, attributes: ['id', 'name', 'email'] }],
	});
	const repairsPromises=repairs.map(async repair=>{
		//Create firebase img ref and get the full path
		
		const imgRef=ref(storage, repair.imgPath)
		const url=await getDownloadURL(imgRef)
		// Update the repairs imgPath poperthy
		repair.imgPath= url
		return repair
	
	})
	//resolve any problem that map have us
	const repairsResolved=await Promise.all(repairsPromises)

	res.status(200).json({
		repairs: repairsResolved
	});
});


const createRepair = catchAsync(async (req, res, next) => {
	const { date, computerNumber, comments } = req.body;
	const{sessionUser}=req
	
	
	const imgRef=ref(storage,`repairs/${req.file.originalname}`)
	const imgUploaded= await uploadBytes(imgRef,req.file.buffer)
	


	const newRepair = await Repair.create({
		date,
		computerNumber,
		comments,
		userId: sessionUser.id,
		imgPath:imgUploaded.metadata.fullPath
	});
	
	res.status(201).json({
		newRepair,
	});
});

const getRepairById = catchAsync(async (req, res, next) => {
	const { repair } = req;

	//get url from firebase
	const imgRef=ref(storage, repair.imgPath)
	const url= await getDownloadURL(imgRef)

	repair.imgPath= url

	res.status(200).json({
		repair
	});
});

const repairCompleted = catchAsync(async (req, res, next) => {
	const { repair } = req;

	await repair.update({ status: 'completed' });

	res.status(200).json({ status: 'success' });
});

const repairCancelled = catchAsync(async (req, res, next) => {
	const { repair } = req;

	await repair.update({ status: 'cancelled' });

	res.status(200).json({ status: 'success' });
});

module.exports = {
	getAllCompletedRepairs,
	getAllPendingRepairs,
	getRepairById,
	createRepair,
	repairCompleted,
	repairCancelled,
};
