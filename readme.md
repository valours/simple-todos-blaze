# Simple Todos
[Blaze-tutorial (meteor)](https://blaze-tutorial.meteor.com/simple-todos/)
# Questions
How work the connection ?

## Introduction
## 1 • Creating the app
Install Meteor
```sh
meteor create --blaze simple-todos-blaze --prototype
```
Run the app
```sh
meteor
```
Your app should now be running on `http://localhost:3000`.
## 2 • Collections
Create collection
```javascript
// imports/api/TasksCollection.js
import { Mongo } from 'meteor/mongo';
 
export const TasksCollection = new Mongo.Collection('tasks');
```
Initialize Tasks Collection
```javascript
// server/main.js
import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/api/TasksCollection';

const insertTask = taskText => TasksCollection.insert({ text: taskText });
 
Meteor.startup(() => {
  if (TasksCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task'
    ].forEach(insertTask)
  }
});
```
Render Tasks Collection
```javascript
// imports/ui/App.js
import { Template } from 'meteor/templating';
import { TasksCollection } from "../api/TasksCollection";
import './App.html';

Template.mainContainer.helpers({
  tasks() {
    return TasksCollection.find({});
  },
});
```

### 3 • Forms and Events
Create Task Form
Update the mainContainer template element
Update the Stylesheet
Add Submit Listener

### 4 • Update and Remove
Add checkbox
Toggle checkbox
Remove tasks
Getting date in event handler

### 5 • Styles
CSS
Applying styles

### 6 • Filter tasks
```sh
meteor add reactive-dict
```

### 7: Adding User Accounts
Password Authentication
```sh
meteor add accounts-password
meteor npm install --save bcrypt
```

```javascript
// server/main/js
const SEED_USERNAME = "meteorite";
const SEED_PASSWORD = "password";

if (!Accounts.findUserByUsername(SEED_USERNAME)) {
  Accounts.createUser({
    username: SEED_USERNAME,
    password: SEED_PASSWORD,
  });
}
```


### 8: Methods
### 9: Publications
### 10: Running on Mobile
### 11: Testing
### 12: Deploying
### 13: Next Steps

## Todos
- [x] Creating the app
- [x] Collections
- [x] Forms and Events
- [ ] Update and Remove
- [ ] Styles
- [ ] Filter tasks
- [ ] Adding User Accounts
- [ ] Methods
- [ ] Publications
- [ ] Running on Mobile
- [ ] Testing
- [ ] Deploying
- [ ] Next Steps