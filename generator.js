var generator = {};

generator.nameGen = function(seed) {
    const nameArray = ['godzilla', 'mechagodzilla', 'slattern', 'mutavore', 'otachi', 'leatherback', 'raiju', 'scunner', 'knifehead', 'yamarashi', 'onibaba', 'king-ghidorah', 'zilla', 'mothra', 'shingoji', 'destroyah', 'rodan', 'gigan', 'gamera'];
    const select = nameArray[Math.floor(seed * nameArray.length)];
    const suffix = Math.floor(seed * 1000);
    return `${select}-${suffix}`;
}

generator.rankGen = function(seed) {
    const rankArray = ['Private', 'Corporal', 'Sergeant', 'Sergeant Major', 'General', 'Major', 'Lieutenant Colonel', 'Captain', 'Lietenant'];
    const select = rankArray[Math.floor(seed * rankArray.length)];
    return select;
}

generator.dateGen = function(seed, start) {
     const fullDay = new Date(start.getTime() + seed * (new Date() - start.getTime()));
     return `${fullDay.getMonth() + 1}-${fullDay.getDate()}-${fullDay.getFullYear()}`;
}

module.exports = generator;