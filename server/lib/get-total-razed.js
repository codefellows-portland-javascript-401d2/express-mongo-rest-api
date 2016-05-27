module.exports = (arr) => {
  const totals = {
    sum: 0,
    list: []
  };

  arr.forEach(monster => {
    totals.sum += monster.citiesRazed;
    totals.list.push(monster.citiesRazed);
  });

  return totals;
};
