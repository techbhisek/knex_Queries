const knex = require('../index');
let bestBowler = knex('Deliveries')
  .select(
    'bowler',
    knex.raw(
      'sum(batsman_runs+noball_runs+wide_runs)/(count(case when noball_runs=0 and wide_runs=0 then 1  else null end )/6)as economy'
    ),
    knex.raw(
      ' rank() over( order by sum(batsman_runs+noball_runs+wide_runs)/(count(case when noball_runs=0 and wide_runs=0 then 1  else null end )/6) asc)as position'
    )
  )
  .whereNot('is_super_over', '0')
  .groupBy('bowler')
  .as('table');

knex(bestBowler)
  .select('bowler', 'economy')
  .where('position', '1')
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    knex.destroy();
  });
