const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  try {
    const catagoryData = await Category.findAll({
      include: [{ model: Category }, { model: Product }]
    })
  } catch (error) {
    res.status(500).json(error);
  }
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Product }]
    })
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error)
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name
    });
    res.status(200).json(categoryData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: 'Woops! No category to update here.' })
    }

  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'That category does not exist. You made it up.' })
      return;
    }

  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
