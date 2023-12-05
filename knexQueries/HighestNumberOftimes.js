const knex = require('../index');
let table = knex('Deliveries')
  .select(
    'bowler',
    'batsman',
    knex.raw('rank() over(order by count(*) desc) as position')
  )
  .count({ times: 'bowler' })
  .whereNot('player_dismissed', '')
  .andWhere('dismissal_kind', ' not in', ['run out', 'retired hurt'])
  .groupBy('bowler', 'batsman')
  .as('tabl');

knex(table)
  .select('bowler', 'batsman', 'times')
  .where('position', '=', '1')
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    knex.destroy();
  });
