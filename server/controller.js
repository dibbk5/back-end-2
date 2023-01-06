let houses = require("./db.json");
let houseID = 4;

module.exports = {
  getHouses: (req, res) => {
    res.status(200).send(houses);
  },
  deleteHouse(req, res) {
    let indexHouse = houses.findIndex((home) => home.id === +req.params.id);
    houses.splice(indexHouse, 1);

    res.status(200).send(houses);
  },
  createHouse(req, res) {
    let { address, price, imageURL } = req.body;

    if (!address || !price || !imageURL) {
      return res.status(400).send("Invalid request.");
    }

    const newHouse = {
      id: houseID,
      address,
      price,
      imageURL,
    };

    houses.push(newHouse);
    houseID += 1;
    res.status(200).send(houses);
  },
  updateHouse(req, res) {
    let { type } = req.body;
    let indexHouse = houses.findIndex((home) => home.id === +req.params.id);

    if (type === "minus" && houses[indexHouse].price <= 10000) {
      houses[indexHouse].price = 0;
      res.status(200).send(houses);
    } else if (type === "minus") {
      houses[indexHouse].price -= 10000;
      res.status(200).send(houses);
    } else if (type === "plus") {
      houses[indexHouse].price += 10000;
      res.status(200).send(houses);
    }
  },
};
