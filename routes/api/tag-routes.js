const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Tag }, { model: Product }]
    });
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Tag }, { model: Product }]
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag matches your search!' });
      return;
    }

    res.status(200).json(productData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: "Santa Claus Action Figure",
  })
    .then((newTag) => {
      res.json(newTag);
    })
    .catch((error) => {
      res.json(error)
    });
  // Tag.create(req.body)
  // .then((product) => {
  //   // if there's product tags, we need to create pairings to bulk create in the ProductTag model
  //   if (req.body.tagIds.length) {
  //     const productTagIdArr = req.body.tagIds.map((tag_id) => {
  //       return {
  //         product_id: product.id,
  //         tag_id,
  //       };
  //     });
  //     return ProductTag.bulkCreate(productTagIdArr);
  //   }
  //   // if no product tags, just respond
  //   res.status(200).json(product);
  // })
  // .then((productTagIds) => res.status(200).json(productTagIds))
  // .catch((err) => {
  //   console.log(err);
  //   res.status(400).json(err);
  // });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })

    .then((updatedTag) => {
      res.json(updatedTag);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((error) => res.json(error));
});

module.exports = router;
