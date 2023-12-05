const knex = require('../index');
knex
  .select('season', 'winner')
  .count({ count: 'winner' })
  .from('Matches')
  .groupBy('season', 'winner')
  .orderBy('season')
  .then((data) => {
    console.log(JSON.stringify(data));
  })
  .finally(() => {
    knex.destroy();
  });
