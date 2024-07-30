import request from "supertest";
import { expect } from "chai";
import app from "../app.js";
import mongoose from "mongoose";
import Attraction from "../models/attraction.model.js";
import { connectTestDB, closeTestDB, clearTestDB } from "./testHelper.mjs";

describe("Attraction Endpoints", () => {
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

  // test POST /attractions endpoint
  describe("POST /attractions", () => {
    it("should create a new attraction", async () => {
      const res = await request(app).post("/attractions").send({
        name: "Sample Attraction",
        category: new mongoose.Types.ObjectId(),
        description: "Sample attraction description",
      });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("name", "Sample Attraction");
      expect(res.body).to.have.property(
        "description",
        "Sample attraction description"
      );
    });

    it("should not create an attraction with an existing name", async () => {
      await new Attraction({
        name: "Sample Attraction",
        category: new mongoose.Types.ObjectId(),
        description: "Sample attraction description",
      }).save();

      const res = await request(app).post("/attractions").send({
        name: "Sample Attraction",
        category: new mongoose.Types.ObjectId(),
        description: "Sample attraction description",
      });

      expect(res.status).to.equal(500);
      expect(res.body).to.have.property("message");
    });
  });

  // test GET /attractions endpoint
  describe("GET /attractions", () => {
    it("should fetch all attractions", async () => {
      await new Attraction({
        name: "Sample Attraction",
        category: new mongoose.Types.ObjectId(),
        description: "Sample attraction description",
        location: {
          address: "Sample address",
          country: "Sample country",
          city: "Sample City",
          coordinates: {
            type: "Point",
            coordinates: [-73.935242, 40.73061],
          },
        },
      }).save();
      await new Attraction({
        name: "Sample Attraction 2",
        category: new mongoose.Types.ObjectId(),
        description: "Sample attraction 2 description",
        location: {
          address: "Sample attraction 2 address",
          address: "Sample address 2",
          country: "Sample country",
          city: "Sample City",
          coordinates: {
            type: "Point",
            coordinates: [-73.935242, 40.73061],
          },
        },
      }).save();

      const res = await request(app).get("/attractions");

      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(2);
    });
  });

  // test GET /attractions/:id endpoint
  describe("GET /attractions/:id", () => {
    it("should fetch an attraction by ID", async () => {
      const attraction = await new Attraction({
        name: "Sample Attraction",
        category: new mongoose.Types.ObjectId(),
        description: "Sample attraction description",
      }).save();

      const res = await request(app).get(`/attractions/${attraction._id}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("name", "Sample Attraction");
      expect(res.body).to.have.property(
        "description",
        "Sample attraction description"
      );
    });

    it("should return 404 if attraction not found", async () => {
      const nonExistentAttractionId = new mongoose.Types.ObjectId();
      const res = await request(app).get(
        `/attractions/${nonExistentAttractionId}`
      );

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message", "Attraction not found.");
    });
  });

  // test PATCH /attractions/:id endpoint
  describe("PATCH /attractions/:id", () => {
    it("should update an attraction", async () => {
      const attraction = await new Attraction({
        name: "Sample Attraction",
        category: new mongoose.Types.ObjectId(),
        description: "Sample attraction description",
      }).save();

      const res = await request(app)
        .patch(`/attractions/${attraction._id}`)
        .send({ description: "Sample attraction updated description" });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property(
        "description",
        "Sample attraction updated description"
      );
    });

    it("should return 404 if attraction not found", async () => {
      const nonExistentAttractionId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .patch(`/attractions/${nonExistentAttractionId}`)
        .send({ description: "Sample attraction updated description" });

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message", "Attraction not found.");
    });
  });

  // test DELETE /attractions/:id endpoint
  describe("DELETE /attractions/:id", () => {
    it("should delete an attraction", async () => {
      const attraction = await new Attraction({
        name: "Sample Attraction",
        category: new mongoose.Types.ObjectId(),
        description: "Sample attraction description",
      }).save();

      const res = await request(app).delete(`/attractions/${attraction._id}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property(
        "message",
        "Attraction deleted successfully."
      );

      const deletedAttraction = await Attraction.findById(attraction._id);
      expect(deletedAttraction).to.be.null;
    });

    it("should return 404 if attraction not found", async () => {
      const nonExistentAttractionId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(
        `/attractions/${nonExistentAttractionId}`
      );

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message", "Attraction not found.");
    });
  });
});
