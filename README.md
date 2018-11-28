# MY REACT NOTES

---

---

- [Introduction](#introduction)
- [Modern JS Refresher](#JavaScript)
- [Components](#components)
- [Composing Components --- (coming soon)](#composing)
- [Pagination, Filtering, Sorting --- (coming soon)](#pagination)
- [Routing --- (coming soon)](#routing)
- [Forms --- (coming soon)](#forms)
- [Calling Backend Services --- (coming soon)](#backendServices)
- [Authentication and Authorization --- (coming soon)](#Authentication)
- [Deployment --- (coming soon)](#Deployment)

# INTRODUCTION

---

---

### WHAT IS REACT?

---

React is a JavaScript library to build user interfaces.

### COMPONENTS

---

A component is a piece of the user interface. When we build applications using React, we build independent, reuseable components and put them all together to create the application.

### THE ROOT COMPONENT

---

Every application has at least one component, the root component. The root component represents the entire application and consists of other child components.

```
                App (root component)
                         ||
              ------------------------
              ||                    ||
            Header                Footer
      (Child Component)      (Child Component)
```

### CLASSES

---

A component is implemented as a JavaScript class with a state and a render method. The output of the render method is a React element, which is a plain JS object that reacts to a DOM element.

```js
class Navbar {
  state = {};
  render() {}
}
```

### THE VIRTUAL DOM

---

React keeps a lightweight representation of the DOM in memory known as the Virtual DOM. When we change the state of a component, we get a new React element. React will then compare this element and its children with the previous one. React figures out what has changed and then updates that part of the real DOM.

With React we no longer have to work with the DOM API. When we update the state in the components, React automatically updates the DOM to match the state.

### ENVIRONMENT SETUP

Download NodeJS. We will be using Node for its built in tool, NPM.

```js
//In the terminal go to the folder in which you want to save the project
cd projectFolder

//Now we use NPM to install the Create-React-App tool.
sudo npm i -g create-react-app
```

### WHAT IS CREATE-REACT-APP?

Create React App is a tool built by developers at Facebook to help you build React applications. It saves you from time-consuming setup and configuration. You simply run one command and create react app sets up the tools you need to start your React project.

```js
// To set up your React project
create-react-app nameOfProject

// To run application cd to the projectFolder
npm start
```

# MODERN JAVASCRIPT REFRESHER

---

---

### JavaScript Variables

---

```js
var     //function scope, no block scope, hoisted to top
let     // block scope
const   // block scope, does not change
```

### Objects

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

### 'this' Keyword

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

### Binding 'this'

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

### Arrow Function Syntax

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

### Arrow Functions and 'this'

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

### Object Destructuring

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

### The Spread Operator

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

### Classes

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

### Inheritance

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

### Modules

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

### Named and Default Exports

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

# COMPONENTS

When you create an app using Create-React-App, you get a file structure like this:

```
appName/
    node_modules/

    public/
        index.html

    src/
        index.js

    .gitignore

    package-lock.json

    package.json

    README.md

node_modules contains all node packages your app requires, nmp install create-react-app depends on other node packages that will be installed in the node_modules folder.

For the project to build, these files must exist with exact filenames:
    public / index.html is the page template;
    src / index.js is the JavaScript entry point.
```

## Creating Components folder

create a components folder inside the src folder

```
appName/
    src/
        components/
            componentFiles.jsx
        index.js

```

## Specifying Children

Remember: Components are are implemented using JS classes. Each component has a Render method that returns a JS expression. Each expression must have only one parent element.

No parent element

```js
class Counter extends Component {
  state = {};
  render() {
    // there are 2 different elements returned here.
    return (
        <h1>Hello, my name is Andrew</h1>
        <button>Respond</button>
    );
  }
}
```

With parent element

```jsx
class Counter extends Component {
  state = {};
  render() {
    return (
      // solution is to wrap all elements in a parent div.
      <div>
        <h1>Hello, my name is Andrew</h1>
        <button>Respond</button>
      </div>
    );
  }
}
```

## Embedding Expressions

use curly brackets to insert any valid JS expression.

Like this

```jsx
class Counter extends Component {
  state = {
    name: "Andrew"
  };
  render() {
    return <div>{`Hello, my name is ${this.state.name}`};</div>;
  }
}
```

Or something like this

```jsx
class Counter extends Component {
  state = {
    name: "Andrew"
  };
  render() {
    return <div>{2 + 2};</div>;
  }
}
```

## Setting Attributes

to set attributes.

```js
class Counter extends Component {
  state = {
    imageURL: "https://imageurl.com/something.jpg"
  };
  render() {
    return (
      // setting the source attribute dynamically
      <img src={this.state.imageUrl} />
    );
  }
}
```

class is a reserved keyword. In order to add classes to an element you must use ClassName.

```js
class Counter extends Component {
  state = {
    imageURL: "https://imageurl.com/something.jpg"
  };
  render() {
    return (
      // adding bootstrap classes
      <h1 className="m-2 text-danger">This is some text</h1>
    );
  }
}
```

Dynamically setting classes

```jsx
class Counter extends Component {
  state = {
    count: 1,
    tags: ["tag1", "tag2", "tag3"]
  };
  render() {
    return (
      // instead of hardcoding classes, we can set them based on the state using a method. In this case we use a method called getBadgeClasses.
      <div>
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button className="btn btn-secondary btn-sm">Increment</button>
        <ul>
          {this.state.tags.map(tag => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    );
  }

  getBadgeClasses() {
    return `badge m-2 badge-${this.state.count === 0 ? "warning" : "primary"}`;
  }
}
```

## Rendering Lists Dynamically

Here we use the array map method to cycle through each item in the tags array. Each item MUST have a key (unique identifier) so React can keep track of each item. The key only needs to be unique in a given list, and not in the entire application.

```jsx
class Counter extends Component {
  state = {
    tags: ["tag1", "tag2", "tag3"]
  };
  render() {
    return (
      <ul>
        {this.state.tags.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }
}
```

## Conditional Rendering

jsx is not a templating engine. We do not if and else statements within jsx. But we can still render conditionally like this:

```jsx
class Counter extends Component {
  state = {
    tags: ["tag1", "tag2", "tag3"]
  };

  // Create a new method that uses the state to render
  renderTags() {
    if (this.state.tags.length === 0) return <p>There are no tags!</p>;

    return (
      <ul>
        {this.state.tags.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }

  // Use the renderTags method
  render() {
    return <div>{this.renderTags()}</div>;
  }
}
```

Using the && operator for conditional rendering

```jsx
class Counter extends Component {
  state = {
    tags: ["tag1", "tag2", "tag3"]
  };

  render() {
    return (
      // If the first operand is true and the second operand is true, then the last operand is returned.
      <div>
        {this.state.tags.length === 0 && "There are no tags!"}
        {
          <ul>
            {this.state.tags.map(tag => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        }
      </div>
    );
  }
}
```

## Handling Events

React elements have properties that are based on standard DOM events like onClick...etc. Here is how you handle events:

```jsx
import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: 1,
    tags: ["tag1", "tag2", "tag3"]
  };

  // this is the naming convention for event handlers
  handleIncrement() {
    console.log("increment clicked");
  }

  render() {
    return (
      // pass the reference to the event handler, but don't call it like you would in vanilla JS
      <div>
        <button
          onClick={this.handleIncrement}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
      </div>
    );
  }
}

export default Counter;
```

## Binding Event Handlers

When we call a function as a standalone function 'this' returns the window object.

```jsx
import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: 1,
    tags: ["tag1", "tag2", "tag3"]
  };

  // 'this' would return undefined
  handleIncrement() {
    console.log("increment clicked", this);
  }
}
```

### Solution 1: Constructor method

```jsx
import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: 1,
    tags: ["tag1", "tag2", "tag3"]
  };

  constructor() {
    super();
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  handleIncrement() {
    console.log("increment clicked", this);
  }
}
```

### Solution 2: Arrow Function syntax

Remember the arrow function inherits 'this'

```jsx
import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: 1,
    tags: ["tag1", "tag2", "tag3"]
  };

  // turn it into an arrow function
  handleIncrement = () => {
    console.log("increment clicked", this);
  };
}
```

## Updating the state

To update the state we need to use a method from the base Compenent in React.

```jsx
class Counter extends Component {
  state = {
    count: 0,
    tags: ["tag1", "tag2", "tag3"]
  };

  // we cannot write code like this. React will not recognize the changes.
  handleIncrement = () => {
    this.state.count++;
  };
}
```

```jsx
class Counter extends Component {
  state = {
    count: 0,
    tags: ["tag1", "tag2", "tag3"]
  };

  // we need to use the setState method to update the state.
  handleIncrement = () => {
    setState({ count: this.state.count + 1 });
  };
}
```
