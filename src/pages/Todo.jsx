import React from 'react'
import AV from 'leancloud-storage'

export default class Todo extends React.PureComponent {
  render () {
    const Todo =  AV.Object.extend('Todo');

    // Create an object
    var todo = new Todo();

    // Set values of fields
    todo.set('title',   'R&D Weekly Meeting');
    todo.set('content', 'All team members, Tue 2pm');

    // Save the object to the cloud
    todo.save().then(function (todo) {
    // Execute any logic that should take place after the object is saved
    console.log('Object saved. objectId: ' + todo.id);
    }, function (error) {
    // Execute any logic that should take place if the save fails
    });

    return (
      <div>
        <h1>This is a Todo page.</h1>
     
      </div>
    )
  }
}
