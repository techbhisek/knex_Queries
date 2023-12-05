const knex = require('../index');
knex
  .select('season')
  .count({ count: '*' })
  .from('Matches')
  .groupBy('season')
  .orderBy('season')
  .then((data) => {
    console.log(JSON.stringify(data));
  })
  .finally(() => {
    knex.destroy();
  });
