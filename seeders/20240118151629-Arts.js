'use strict';

const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync('./data/arts.json', 'utf-8'))
    data.forEach(item => {
      delete item.id

      item.createdAt = new Date();
      item.updatedAt = new Date();
    });
    await queryInterface.bulkInsert('Arts', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Arts', null, {});
  }
};