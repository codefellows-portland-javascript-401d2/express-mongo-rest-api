const locations = {};
const people = {};
const entryForm = {};
locations.template = $('#locationtemplate').html();
locations.compiler = Handlebars.compile(locations.template);
locations.ul = $('#locations');

people.template = $('#peopletemplate').html();
people.compiler = Handlebars.compile(people.template);
people.ul = $('#people');

const $lb = $('#locationsButton');
const $pb = $('#peopleButton');

locations.deleteRecord = function(id) {
  superagent
  .del(`/locations/${id}`)
  .end((err, res) => {
    console.log(res.body);
  });
  locations.getData();
};

locations.getData = function() {
  locations.ul.empty();
  superagent
    .get('/locations')
    .end((err, res) => {
      res.body.forEach( item => {
        locations.ul.append (locations.compiler(item));
        $(`#${item._id}`).on('click', (e)=>{
          e.preventDefault();
          locations.deleteRecord(e.target.id);
        });
      });
    });
};

people.deleteRecord = function(id) {
  superagent
  .del(`/people/${id}`)
  .end((err, res) => {
    console.log(res.body);
  });
  people.getData();
};

people.getData = function() {
  people.ul.empty();
  superagent
    .get('/people')
    .end((err, res) => {
      res.body.forEach( item => {
        people.ul.append (people.compiler(item));
        $(`#${item._id}`).on('click', (e)=>{
          e.preventDefault();
          people.deleteRecord(e.target.id);
        });
      });
    });
};

$pb.on('click', () => {
  entryForm.pf = document.getElementById('peopleForm');
  people.name = entryForm.pf.elements.name.value;
  people.allegiance = entryForm.pf.elements.allegiance.value;
  people.alive = entryForm.pf.elements.alive.value;
  people.killed_by = entryForm.pf.elements.killed_by.value;
  people.home = entryForm.pf.elements.home.value;
  superagent
    .post('/people')
    .set('Accept', 'application/json')
    .send(people)
    .end((err, res) => {
      $('#peopleResults').text(res.text);
    });
  people.getData();
});

$lb.on('click', () => {
  entryForm.lf = document.getElementById('locationsForm');
  location.name = entryForm.lf.elements.name.value;
  location.family = entryForm.lf.elements.family.value;
  location.region = entryForm.lf.elements.region.value;
  superagent
  .post('/locations')
  .set('Accept', 'application/json')
  .send(location)
  .end((err, res) => {
    $('#locationResults').text(res.text);
  });
  locations.getData();
});

people.getData();
locations.getData();
