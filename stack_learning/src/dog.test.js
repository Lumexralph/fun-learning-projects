import Dog from './dog'

test('Pricess.talk', () => {
  const testDog = new Dog('Sushi')
  expect(testDog.talk()).toBe('We are going to make it, Sushi')
})
