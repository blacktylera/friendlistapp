/* jshint mocha: true, expr: true, strict: false, undef: false */

describe('test suite', function () {
  it('should assert true', function () {
    true.should.be.true;
    false.should.be.false;
  });
});


describe('DOM', function () {
  describe('address page', function () {
    before(function () {
      if (window.__karma__) {
        $('body').append('<div class="loggedIn"></div>');
        $('body').append('<table><thead></thead><tbody></tbody></table>');
      }
    });

  describe('addRowToTable', function(){
    it('should append new row to table', function(){
      var uuid = 'JJ123ABC456';
      var obj = {name: 'John Smith', email: 'test@test.com', twitter: 'http://www.twitter.com', photoUrl: 'http://testimage.jpg' };
        $('tr').length.should.equal(0);
        addRowToTable(uuid, obj);
          $('tr').length.should.equal(0);
        });
      });
     });
    });
 
