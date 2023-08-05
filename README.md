# Testing

### Install all dependencies: yarn

# How to test: 
* Create a folder in the src/component/(ex: navbar)
* Create two files (ex: Navbar.tsx, Navbart.test.tsx )
* After writing code in those two files, for run testing: yarn test --testPathPattern=Navbar.test.tsx --watch
* Make sure to add your testing component name when you want to test : yarn test --testPathPattern=(compName).test.tsx --watch
