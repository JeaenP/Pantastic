import foodModel from "../models/foodModel.js";
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const addFood = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No se ha subido ninguna imagen" });
  }

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: req.file.location // URL de la imagen en S3
  });

  try {
    await food.save();
    res.json({ success: true, message: "Producto Agregado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error al guardar el producto" });
  }
};

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error al listar los productos" });
  }
};

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (!food) {
      return res.status(404).json({ success: false, message: "Producto no encontrado" });
    }

    const imageUrl = food.image;
    const imageName = imageUrl.split('/').pop();

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: imageName
    };

    const command = new DeleteObjectCommand(params);

    s3Client.send(command).then(() => {
      console.log("Imagen eliminada de S3");
    }).catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, message: "Error al eliminar imagen de S3" });
    });

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Producto Quitado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

export { addFood, listFood, removeFood };
