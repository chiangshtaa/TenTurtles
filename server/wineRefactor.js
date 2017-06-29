const refactor = wines => {
  let random = Math.floor(Math.random() * (wines.length - 2)) + 1;
  return {
    name: wines[random].Name,
    url: wines[random].Url,
    labelUrl: wines[random].Labels[0].Url,
    type: wines[random].Varietal.WineType.Name
  };
};

module.exports.refactor = refactor;