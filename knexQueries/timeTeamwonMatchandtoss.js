const knex = require('../index');
knex
  .select('winner')
  .count({ times: 'winner' })
  .from('Matches')
  .where('Matches.winner', knex.raw('toss_winner'))
  .groupBy('winner')

  .then((data) => {
    console.log(data);
  })
  .finally(() => {
    knex.destroy();
  });
