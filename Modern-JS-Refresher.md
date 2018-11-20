## JavaScript Variables

---

```js
var     //function scope, no block scope, hoisted to top
let     // block scope
const   // block scope, does not change
```

## Objects

---

Objects are collections of key-value pairs.

```js

const person = {
  name: 'Andrew',
  run: function() { some code; }, // function inside an object is known as a method
  walk() { some code; }           // new function syntax in ES6
};

//Accessing properties: Dot Notation and Bracket Notation
// Use brackets when you don't know the property you are searching for ahead of time.
person.name;
person['name'];

```

## 'this' Keyword

---

'this' is a special keyword that returns a reference to the current object. But in JS it doesn't always work this way.

```js
const person = {
  name: "Andrew",
  walk() {
    console.log(this);
  }
};


// The value of 'this' is determined by how a function is called.


//If you call a function as a method in an object, 'this' always references that object.
person.walk();
>> {name: "Andrew", walk: f}


//If you call the function as a standalone function or outside the object in a browser, 'this' will reference the global, or window, object.
const walk = person.walk();
walk();
>> window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}

// But in React you will get 'undefined' returned instead of the window object. This is because 'strict mode' is automatically enabled.
>> undefined


```

## Binding 'this'

---

We can use the 'bind' to bind a function to an object and no matter how we call a function it will always reference the binded object.

```js
const person = {
  name: "Andrew",
  walk() {
    console.log(this);
  }
};

//In the walk variable, we can bind the person.walk function to the person object.
const walk = person.walk.bind(person);
walk();
>> {name: "Andrew", walk: f}


```

## Arrow Function Syntax

---

A cleaner, simpler way of writing functions in ES6

```js
// Arrow Function Syntax
(param, param) => { some code; };

// The Old Way
const funcName = function(parameter) {
  return parameter + parameter;
}

// The New Way
const funcName = (parameter) => { return parameter + parameter; };

// But if you have ONLY ONE parameter you can omit the parenthesis
const funcName = parameter => { return parameter + parameter; };

// If the body of the function only includes a SINGLE LINE and a RETURN, we can simplify even further by omiting the curly braces, return keyword, and semi-colon.
const funcName = parameter => parameter + parameter;

// If you have no parameters, use empty parenthesis
const funcName = () => some code;

```

## Arrow Functions and 'this'

---

Arrow functions don't rebind 'this'. Huh?

```js
const person = {
  talk() {
    console.log(this);
  }
};

person.talk(); //we see a reference to the person object

// If we wrap console.log with a setTimeout callback function we get a reference to the window object, not the person object. The reason this happens is because the callback function is a standalone function. It is not a part of any object.
const person = {
  talk() {
    setTimeout(function() {
      console.log(this);
    }, 1000);
  }
};

person.talk(); //we see a reference to the window object

// we can solve this by changing the callback function into an arrow function. The arrow function inherits the 'this' keyword.
const person = {
  talk() {
    setTimeout(function() {
      console.log(this);
    }, 1000);
  }
};

person.talk(); //we see a reference to the person object
```

## Object Destructuring

---

Destructuring allows us to extract data from arrays, objects, maps and sets into their own variable.

```js
//Sometimes you need to make a variable from something that is inside of an object.

const address = {
  street: "Jacinto",
  city: "Long Beach",
  country: "United States"
};

//We access the properties within the object like this:
const street = address.street;
const city = address.city;
const country = address.country;

//What we could do instead of creating multiple variables, we destructure them in a single line. This is basically saying get the values of properties street, city, and country from the address object and store them in variables named street, city, and country.
const { street, city, country } = address;

// What if you want to name the variable something different? You can use an alias like so:
const { street: myStreet, city: myCity, country: myCountry } = address;

//What if the value you are trying to set does not exist? You will get undefined unless you set a default value. Default values kick in ONLY when the value is undefined. You can set default values like so:
const { street = "unknown", phone = "unknown" } = address;

console.log(street); // Jacinto
console.log(phone); //unknown
```

## The Spread Operator

---

The spread operator allows an iterable to expand in places where 0+ arguments are expected. Huh? Let's look at some examples:

```js

// Combining arrays
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];

const array3 = array1.concat(array2);

//The above code works, but what if you wanted to add another element between the two arrays. The code would look a lot more complicated. Or we can use the spread operator to achieve this.

const array3 = [...array1, 'another element', ...array2];
>> [1, 2, 3, 'another element', 4, 5, 6]

// We can use it with the Math object
const maxNumber = Math.max(...array1);
>> 3

// We can create a new array from another array.
const newArray = array1;

// The above code creates a reference to the same array as array1. Any changes to newArray would be reflected in array1 as well. Instead we can use the spread operator to create a new array, seperate from the source array. This works because the value of array1 is spread into the new array as individual values and not as a reference of array1.
const newArray = [...array1];

// We can also use the spread operator to convert a string into an array.
const string1 = 'Hello';
const newArray = [...string1];
>> ['H', 'e', 'l', 'l', 'o']

// We can also use the spread operator on objects
const obj1 = { first: 'Andrew'};
const obj2 = { last: 'Martinez'};

const obj3 = { ...obj1, ...obj2, email: 'andrew@email.com' };
>> {first: 'Andrew', last: 'Martinez', email: 'andrew@email.com'}

// We can also use the spread operator to easily clone an object
const obj4 = { ...obj3 };

```

## Classes

---

Often we need to represent an idea or concept in our programs — maybe a car engine, a computer file, a router, or a temperature reading. Representing these concepts directly in code comes in two parts: data to represent the state, and functions to represent the behavior. ES6 classes give us a convenient syntax for defining the state and behavior of objects that will represent our concepts.

```js
// We can use an object to represent a person.
const person = {
  name: "Andrew",
  walk() {
    console.log(this);
  }
};

// If we wanted to represent multiple people we could create multiple objects, but in this case we would be duplicating the walk method over and over. And if there was a bug in the walk method we would need to go into every person object and change the code.
const person = {
  name: "Jay",
  walk() {
    console.log(this);
  }
};

const person = {
  name: "Mike",
  walk() {
    console.log(this);
  }
};

// Instead, we can use classes to create a blueprint of a person and then create objects from that blueprint to represent different people.

// class name is capitalized
// The constructor's job is to initialize an instance to a valid state, and it will be called automatically so we can’t forget to initialize our objects.
class Person {
  constructor(name) {
    this.name = name;
  }
  walk() {
    console.log(this);
  }
}

// We create a person object with the 'new' operator and the Person class, passing in any parameters to the constructor function.
// Anytime an object is created from a class, it is called an instance of that class.
const person1 = new Person("Jessica");
```

## Inheritance

---

```js
class Person {
  constructor(name) {
    this.name = name;
  }
  walk() {
    console.log("walk");
  }
}

// The teacher class inherit the constructor properties and method from Person. Super is needed to initialize the constructor from Person.
class Teacher extends Person {
  constructor(name, degree) {
    super(name);
    this.degree = degree;
  }
  Teach() {
    console.log("teach");
  }
}

const teacher = new Teacher("Andrew", "Bachelors");
```

## Modules

---

When we split our code across multiple files we call this modularity. Each files is a Module.

File 1: person.js

```js
// we use 'export' to make the class visible or public
export class Person {
  constructor(name) {
    this.name = name;
  }
  walk() {
    console.log("walk");
  }
}
```

File 2: teacher.js

```js
// Here we import the Person class from the person module. We use a file path when they are our own modules. If it is a React or third-party module we simply use the name.
import { Person } from "filepath";
import React, { Component } from "react";

export class Teacher extends Person {
  constructor(name, degree) {
    super(name);
    this.degree = degree;
  }
  Teach() {
    console.log("teach");
  }
}
```

## Named and Default Exports

---

File 1: person.js

```js
// If we have another pbject in the same module we need to make it visible as well. When we use the export keyword, these are named exports. We import them using the curly brace format from the previous example.
function scoreExam() { some code; };

// But we can use the default keyword to signify that this is the main thing we are exporting. When we import we no longer need curly braces
export default class Person {
  constructor(name) {
    this.name = name;
  }
  walk() {
    console.log("walk");
  }
}
```

File 2: teacher.js

```js
// Here we import the default export Person and named export scoreExam
import Person, { scoreExam } from "filepath";

export class Teacher extends Person {
  constructor(name, degree) {
    super(name);
    this.degree = degree;
  }
  Teach() {
    console.log("teach");
  }
}
```
