describe('AndyNews Filters', function() {

  beforeEach(angular.mock.module('andyNewsAppFilters'));

  describe('index', function() {
    var indexFilter;

    beforeEach(inject(function(_indexFilter_) {
      indexFilter = _indexFilter_;
    }));

    it('should create an index for an array passed to it', function() {
      var inputArray = [{x: 'a'}, {x: 'b'}];
      var outputArray = [{x: 'a', index: 0}, {x: 'b', index: 1}];
      expect(indexFilter(inputArray)).toEqual(outputArray);
    });
  });

});
