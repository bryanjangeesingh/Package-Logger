import { NextFunction, Request, Response } from "express";
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Resident } = require("../models/resident");

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log("hello - middleware here");
  console.log("Time: ", Date.now());
  next();
});

// This defines the home page the this route; route would not work without it
router.get("/", (req: Request, res: Response) => {
  console.log("reached home page");
  res.send("Congrats, you've reached the home page of the auth route");
});

router.get("/getResidents", (req: Request, res: Response) => {
  console.log("Sending resident data back to you!");

  const { checkedIn } = req.query || {};

  Resident.find(checkedIn !== undefined ? { checkedIn } : {}).then(
    (resident: typeof Resident[]) => {
      console.log("resident found is", resident);
      res.send(resident);
    }
  );
});

router.get("/getResidentById", (req: Request, res: Response) => {
  console.log("Sending getResident data back to you!");
  const { id } = req.query;
  console.log("id to find by is", id);
  Resident.findOne({ _id: id }).then((resi: any) => {
    console.log("resident sending backis", resi);
    res.send(resi);
  });
});

router.post("/postResident", (req: any, res: Response) => {
  console.log("posting resident");

  const newResident = new Resident({
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    residentID: req.body.residentID,
    kerb: req.body.kerb,
    room: req.body.room,
    year: req.body.year,
    homeAddress: req.body.homeAddress,
    phoneNumber: req.body.phoneNumber,
    forwardingAddress: req.body.forwardingAddress,
    checkedIn: req.body.checkedIn,
    dateIn: req.body.dateIn,
    dateOut: req.body.dateOut,
  });

  newResident
    .save()
    .then((resi: any) => res.send(resi))
    .catch((err: any) => {
      console.log("error posting resident", err);
      res.status(500).send({ message: "unknown error" });
    });
});

router.post("/checkoutResident", (req: Request, res: Response) => {
  console.log("Checking Out Resident");
  Resident.updateOne(
    { residentID: req.body.residentID },
    { $set: { checkedIn: false, dateOut: req.body.date } }
  )
    .then((resi: any) => {
      res.send(resi);
    })
    .catch((err: any) => {
      console.log("error putting resident: ", err);
      res.status(500).send({ message: "unkown error" });
    });
});

router.post("/editResident", (req: Request, res: Response) => {
  console.log("updating resident");
  Resident.updateOne(
    { residentID: req.body.residentID },
    {
      $set: {
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        residentID: req.body.residentID,
        kerb: req.body.kerb,
        room: req.body.room,
        year: req.body.year,
        homeAddress: req.body.homeAddress,
        phoneNumber: req.body.phoneNumber,
        forwardingAddress: req.body.forwardingAddress,
        checkedIn: req.body.checkedIn,
        dateIn: req.body.dateIn,
        dateOut: req.body.dateOut,
      },
    }
  )
    .then((resi: any) => {
      res.send(resi);
    })
    .catch((err: any) => {
      console.log("error putting resident: ", err);
      res.status(500).send({ message: "unkown error" });
    });
});

module.exports = router;
