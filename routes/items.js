const {
  getItems,
  getItem,
  addItem,
  deleteItem,
  deleteItems,
  updateItem,
} = require('../controllers/items-controllers');

// Item Schema

const Item = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
  },
};

// Error Schema

const Error = {
  type: 'object',
  properties: {
    message: {
      type: 'string',
    },
  },
};
// Options for GET All items

const getItemsOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Item,
      },
      500: Error,
    },
  },
  handler: getItems,
};

// Options for GET Single item

const getItemOpts = {
  schema: {
    response: {
      200: Item,
      500: Error,
    },
  },
  handler: getItem,
};

const postItemOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string' },
      },
    },
    response: {
      201: Item,
    },
  },
  handler: addItem,
};

// Options for DELETE Single item

const deleteItemOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
        },
      },
      500: Error,
    },
  },
  handler: deleteItem,
};

// Options for DELETE All items

const deleteItemsOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
        },
      },
    },
  },
  handler: deleteItems,
};

// Options for UPDATE Single item

const updateItemOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string' },
      },
    },
    response: {
      201: Item,
      500: Error,
    },
  },
  handler: updateItem,
};

function itemRoutes(fastify, options, done) {
  // GET All items
  fastify.get('/items', getItemsOpts);

  // GET Single item
  fastify.get('/items/:id', getItemOpts);

  // ADD item
  fastify.post('/items/', postItemOpts);

  // DELETE item
  fastify.delete('/items/:id', deleteItemOpts);

  // DELETE all items
  fastify.delete('/items', deleteItemsOpts);

  // UPDATE item
  fastify.put('/items/:id', updateItemOpts);

  done();
}

module.exports = itemRoutes;
