'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var shorterCtrlStub = {
  index: 'shorterCtrl.index',
  show: 'shorterCtrl.show',
  create: 'shorterCtrl.create',
  update: 'shorterCtrl.update',
  destroy: 'shorterCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var shorterIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './shorter.controller': shorterCtrlStub
});

describe('Shorter API Router:', function() {

  it('should return an express router instance', function() {
    expect(shorterIndex).to.equal(routerStub);
  });

  describe('GET /api/shorters', function() {

    it('should route to shorter.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'shorterCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/shorters/:id', function() {

    it('should route to shorter.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'shorterCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/shorters', function() {

    it('should route to shorter.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'shorterCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/shorters/:id', function() {

    it('should route to shorter.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'shorterCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/shorters/:id', function() {

    it('should route to shorter.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'shorterCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/shorters/:id', function() {

    it('should route to shorter.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'shorterCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
