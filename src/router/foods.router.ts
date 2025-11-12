import { Router } from "express";
import { sample_foods, sample_tags } from "../data";
import expressAsyncHandler from "express-async-handler";
import { FoodModel } from "../models/food.model";

const foodRouter = Router();

foodRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const foods = await FoodModel.find();
    res.send(foods);
  })
);

foodRouter.get(
  "/seeds",
  expressAsyncHandler(async (req, res) => {
    const count = await FoodModel.countDocuments();
    if (count > 0) {
      res.send("Seed is already done!");
      return;
    }
    await FoodModel.create(sample_foods);
    res.send(sample_foods);
  })
);

foodRouter.get(
  "/search/:searchTerm",
  expressAsyncHandler(async (req, res) => {
    const searchTerm = new RegExp(req.params.searchTerm, "i");
    console.log("Searching for:", searchTerm);
    const foods = await FoodModel.find({ name: { $regex: searchTerm } });

    res.send(foods);
  })
);

foodRouter.get("/tags", (req, res) => {
  res.send(sample_tags);
});

foodRouter.get(
  "/tags/:tagName",
  expressAsyncHandler(async (req, res) => {
    const tagName = req.params.tagName;
    console.log("Filtering by tag:", tagName);
    const foods = await FoodModel.find({ tags: tagName });
    res.send(foods);
  })
);

foodRouter.get(
  "/:foodId",
  expressAsyncHandler(async (req, res) => {
    const foodId = req.params.foodId;
    console.log("Fetching food with ID:", foodId);
    const food = await FoodModel.findOne({ id: foodId });
    if (food) {
      res.send(food);
    } else {
      res.status(404).send({ message: "Food Not Found" });
    }
  })
);

export default foodRouter;
