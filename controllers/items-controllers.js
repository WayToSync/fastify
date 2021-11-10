const { v4: uuidv4 } = require('uuid');

let items = require('../Items');

const getItems = (req, res) => {
  if (!items.length) {
    throw new Error('There is no items');
  }
  res.send(items);
};

const getItem = (req, res) => {
  const { id } = req.params;
  const item = items.find((item) => item.id === id);
  if (!item) {
    throw new Error(`Item ${id} does not exist`);
  }
  res.send(item);
};

const addItem = (req, res) => {
  const { name } = req.body;
  const item = {
    id: uuidv4(),
    name,
  };
  items = [...items, item];
  res.code('201').send(item);
};

const deleteItem = (req, res) => {
  const { id } = req.params;
  const checkId = items.find((item) => item.id === id);
  items = items.filter((item) => item.id !== id);
  if (!checkId) {
    throw new Error('There is no items');
  }
  res.send({ message: `Item ${id} has been removed` });
};

const deleteItems = (req, res) => {
  items = [];
  res.send({ message: `All items has been removed` });
};

const updateItem = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const checkId = items.find((item) => item.id === id);
  items = items.map((item) => (item.id === id ? { id, name } : item));

  item = items.find((item) => item.id === id);
  if (!item) {
    throw new Error('This item does not exist');
  }
  res.send(item);
};

module.exports = {
  getItems,
  getItem,
  addItem,
  deleteItem,
  deleteItems,
  updateItem,
};
