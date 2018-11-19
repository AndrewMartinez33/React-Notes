WHAT IS REACT?
----
----
React is a JavaScript library to build user interfaces.

COMPONENTS
----
----
A component is a piece of the user interface. When we build applications using React, we build independent, reuseable components and put them all together to create the application.

THE ROOT COMPONENT
----
----
Every application has at least one component, the root component. The root component represents the entire application and consists of other child components.
```
                App (root component)
                         ||
              ------------------------
              ||                    ||
            Header                Footer  
      (Child Component)      (Child Component)
```

CLASSES
----
----
A component is implemented as a JavaScript class with a state and a render method. The output of the render method is a React element, which is a plain JS object that reacts to a DOM element.
```js

class Navbar {
  state = {};
  render() {

  }

}

```

THE VIRTUAL DOM
----
----
React keeps a lightweight representation of the DOM in memory known as the Virtual DOM. When we change the state of a component, we get a new React element. React will then compare this element and its children with the previous one. React figures out what has changed and then updates that part of the real DOM.

With React we no longer have to work with the DOM API. When we update the state in the components, React automatically updates the DOM to match the state.


