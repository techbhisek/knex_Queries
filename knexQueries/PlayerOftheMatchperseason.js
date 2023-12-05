const knex = require('../index');
let master = knex('Matches')
  .select(
    'season',
    'player_of_match',
    knex.raw(
      'rank() over (partition by `season` order by count(player_of_match) desc) as position'
    )
  )
  .count({ times: 'player_of_match' })
  .whereNot('player_of_match', '')
  .groupBy('season', 'player_of_match')
  .orderBy('season')
  .as('table');
knex(master)
  .select('season', 'player_of_match', 'times')
  .where('position', '=', '1')
  .then((data) => {
    console.log(data);
  })
  .finally(() => {
    knex.destroy();
  });
