const knex = require('../index');
knex
  .select('bowling_team')
  .sum({ extra: 'extra_runs' })
  .from('Matches')
  .join('Deliveries', 'Deliveries.Match_id', 'Matches.id')
  .where('season', '=', '2016')
  .groupBy('season', 'bowling_team')
  .then((data) => {
    console.log(data);
  })
  .finally(() => {
    knex.destroy();
  });
