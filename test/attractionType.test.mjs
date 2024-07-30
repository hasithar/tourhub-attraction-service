import request from "supertest";
import { expect } from "chai";
import app from "../app.js";
import mongoose from "mongoose";
import AttractionType from "../models/attractionType.model.js";
import { connectTestDB, closeTestDB, clearTestDB } from "./testHelper.mjs";

describe("Attraction Type Endpoints", () => {
  // runs once before all tests
  before(async () => {
    await connectTestDB();
  });

  // runs once after all tests
  after(async () => {
    await closeTestDB();
  });

  // runs before each test
  beforeEach(async () => {
    await clearTestDB();
  });

  // test POST /attraction-types endpoint
  describe("POST /attraction-types", () => {
    it("should create a new attraction type", async () => {
      const res = await request(app).post("/attraction-types").send({
        name: "Sample Attraction Type",
        description: "Sample attraction type description",
      });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("name", "Sample Attraction Type");
      expect(res.body).to.have.property(
        "description",
        "Sample attraction type description"
      );
    });

    it("should not create an attraction type with an existing name", async () => {
      await new AttractionType({
        name: "Sample Attraction Type",
        description: "Sample attraction type description",
      }).save();

      const res = await request(app).post("/attraction-types").send({
        name: "Sample Attraction Type",
        description: "Sample attraction type description",
      });

      expect(res.status).to.equal(500);
      expect(res.body).to.have.property("message");
    });
  });

  // test GET /attraction-types endpoint
  describe("GET /attraction-types", () => {
    it("should fetch all attraction types", async () => {
      await new AttractionType({
        name: "Sample Attraction Type",
        description: "Sample attraction type description",
      }).save();
      await new AttractionType({
        name: "Sample Attraction Type 2",
        description: "Sample attraction type 2 description",
      }).save();

      const res = await request(app).get("/attraction-types");

      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(2);
    });
  });

  // test GET /attraction-types/:id endpoint
  describe("GET /attraction-types/:id", () => {
    it("should fetch an attraction type by ID", async () => {
      const attractionType = await new AttractionType({
        name: "Sample Attraction Type",
        description: "Sample attraction type description",
      }).save();

      const res = await request(app).get(
        `/attraction-types/${attractionType._id}`
      );

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("name", "Sample Attraction Type");
      expect(res.body).to.have.property(
        "description",
        "Sample attraction type description"
      );
    });

    it("should return 404 if attraction type not found", async () => {
      const nonExistentAttractionTypeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(
        `/attraction-types/${nonExistentAttractionTypeId}`
      );

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property(
        "message",
        "Attraction Type not found."
      );
    });
  });

  // test PATCH /attraction-types/:id endpoint
  describe("PATCH /attraction-types/:id", () => {
    it("should update an attraction type", async () => {
      const attractionType = await new AttractionType({
        name: "Sample Attraction Type",
        description: "Sample attraction type description",
      }).save();

      const res = await request(app)
        .patch(`/attraction-types/${attractionType._id}`)
        .send({ description: "Sample attraction type updated description" });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property(
        "description",
        "Sample attraction type updated description"
      );
    });

    it("should return 404 if attraction type not found", async () => {
      const nonExistentAttractionTypeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .patch(`/attraction-types/${nonExistentAttractionTypeId}`)
        .send({ description: "Sample attraction type updated description" });

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property(
        "message",
        "Attraction Type not found."
      );
    });
  });

  // test DELETE /attraction-types/:id endpoint
  describe("DELETE /attraction-types/:id", () => {
    it("should delete an attraction type", async () => {
      const attractionType = await new AttractionType({
        name: "Sample Attraction Type",
        description: "Sample attraction type description",
      }).save();

      const res = await request(app).delete(
        `/attraction-types/${attractionType._id}`
      );

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property(
        "message",
        "Attraction Type deleted successfully."
      );

      const deletedAttractionType = await AttractionType.findById(
        attractionType._id
      );
      expect(deletedAttractionType).to.be.null;
    });

    it("should return 404 if attraction type not found", async () => {
      const nonExistentAttractionTypeId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(
        `/attraction-types/${nonExistentAttractionTypeId}`
      );

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property(
        "message",
        "Attraction Type not found."
      );
    });
  });
});
