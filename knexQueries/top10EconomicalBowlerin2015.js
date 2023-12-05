const knex = require('../index');
knex
  .select(
    'bowler',
    knex.raw(
      'sum(batsman_runs+ noball_runs +wide_runs)*6/sum(case when noball_runs = 0 and wide_runs = 0 then 1 else null end) economy'
    )
  )
  .from('Matches')
  .join('Deliveries', 'Deliveries.Match_id', 'Matches.id')
  .where('season', '=', '2015')
  .groupBy('bowler')
  .orderBy('economy')
  .limit('10')
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    knex.destroy();
  });

function fun(a) {
  console.log(a);
  return 'bowler';
}
