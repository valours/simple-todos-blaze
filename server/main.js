import { Meteor } from "meteor/meteor";
import { TasksCollection } from "/imports/api/TasksCollection";

const SEED_USERNAME = "admin";
const SEED_PASSWORD = "admin";

const insertTask = async (taskText, user) => {
  const task = {
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
  };
  console.log("taskToInsert", task);
  await TasksCollection.insertAsync(task);
};

Meteor.startup(async () => {
  const userWithSeedUsername = await Accounts.findUserByUsername(SEED_USERNAME);
  console.log("userWithSeedUsername", userWithSeedUsername);

  if (!userWithSeedUsername) {
    const userToCreate = {
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    };
    console.log("userToCreate", userToCreate);
    Accounts.createUser(userToCreate);
  }

  const user = await Accounts.findUserByUsername(SEED_USERNAME);
  console.log("user", user);

  // await TasksCollection.dropCollectionAsync();

  const elements = await TasksCollection.find().countAsync();
  console.log("Tasks", elements);

  TasksCollection.find().forEach((tasks) => console.log(tasks));

  if ((await TasksCollection.find().countAsync()) === 0) {
    [
      "First Task",
      "Second Task",
      "Third Task",
      "Fourth Task",
      "Fifth Task",
      "Sixth Task",
      "Seventh Task",
    ].forEach((taskText) => insertTask(taskText, user));
  }
});
