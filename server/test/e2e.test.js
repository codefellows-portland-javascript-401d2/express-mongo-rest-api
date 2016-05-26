const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const database = require('../lib/database');
const dbUri = process.env.DB_URI || 'mongodb://localhost/godzilla';
const app = require('../app');
database.connect(dbUri);

describe('end to end testing', () => {
    
    var request = chai.request(app);
    
    it('starts up database', done => {
        done();
    });
    
    it('posts two items to db', done => {
        var monster = 'Mothra';
        request.post('/monsters').send({name: 'Zilla'});
        request.post('/monsters')
            .send({name: monster})
            .end((req, res) => {
                var resObj = JSON.parse(res.text);
               assert.equal(resObj.posted.name, monster);
               done(); 
            });
        
    });
    
    it('gets all items', done => {
        request.get('/monsters')
            .end((req, res) => {
                assert.equal(res.body.length, 2); ///!!!!FUCK
                done();
            });    
       
    });
    
    it('gets one single item', done => {
        done();
    });
    
    it('PUTS, changes an value to upper case', done => {
        done();
    });
    
    it('deletes one, then the other', done => {
        done();
    });
    
    // it stops db instance?
    
}); 