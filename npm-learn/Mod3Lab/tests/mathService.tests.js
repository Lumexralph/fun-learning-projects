describe('mathService', () => {

  describe('add function', () => {

    it('add is defined', () => expect(mathService.add).toBeDefined());
    it('should add', () => {
      var first = 6,
        second = 4;
      var expected = first + second;
      var actual = mathService.add(first, second);

      expect(expected).toBe(actual);
    });

  });

  describe('subtract function', () => {

    it('add is defined', () => expect(mathService.subtract).toBeDefined());
    it('should subtract', () => {
      var first = 6,
        second = 4;
      var expected = first - second;
      var actual = mathService.subtract(first, second);

      expect(expected).toBe(actual);
    });
  });

  describe('multiply function', () => {

    it('multiply is defined', () => expect(mathService.multiply).toBeDefined());
    it('should multiply', () => {
      var first = 6,
        second = 4;
      var expected = first * second;
      var actual = mathService.multiply(first, second);

      expect(expected).toBe(actual);
    });

  });

  describe('divide function', () => {

    it('divide is defined', () => expect(mathService.add).toBeDefined());
    it('should add', () => {
      var first = 8,
        second = 4;
      var expected = first / second;
      var actual = mathService.divide(first, second);

      expect(expected).toBe(actual);
    });

  });

  describe('power function', () => {

    it('power is defined', () => expect(mathService.power).toBeDefined());
    it('should raise number by its power', () => {
      var first = 6,
        second = 4;
      var expected = Math.pow(first, second);
      var actual = mathService.power(first, second);

      expect(expected).toBe(actual);
    });

  });

  describe('squareRoot function', () => {

    it('squareRoot is defined', () => expect(mathService.squareRoot).toBeDefined());
    it('should give square root of number', () => {
      var number = 4;
      var expected = Math.sqrt(number);
      var actual = mathService.squareRoot(number);

      expect(expected).toBe(actual);
    });

  });

})