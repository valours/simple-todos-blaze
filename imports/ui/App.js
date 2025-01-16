import { Template } from "meteor/templating";
import { TasksCollection } from "../api/TasksCollection";
import { ReactiveDict } from "meteor/reactive-dict";

import "./App.html";
import "./Task.js";
import "./Login.js";

const getUser = () => Meteor.user();
const isUserLogged = () => !!getUser();

const getTasksFilter = () => {
  const user = getUser();

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const userFilter = user ? { userId: user._id } : {};

  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  return { userFilter, pendingOnlyFilter };
};

Template.mainContainer.onCreated(function mainContainerOnCreated() {
  this.state = new ReactiveDict();
});

const HIDE_COMPLETED_STRING = "hideCompleted";

Template.mainContainer.events({
  "click #hide-completed-button"(event, instance) {
    const currentHideCompleted = instance.state.get(HIDE_COMPLETED_STRING);
    instance.state.set(HIDE_COMPLETED_STRING, !currentHideCompleted);
  },
  "click #logout"() {
    Meteor.logout();
  },
});

Template.mainContainer.helpers({
  isUserLogged() {
    return isUserLogged();
  },
  incompleteCount() {
    if (!isUserLogged()) {
      return "";
    }

    const { pendingOnlyFilter } = getTasksFilter();

    const incompleteTasksCount =
      TasksCollection.find(pendingOnlyFilter).count();
    return incompleteTasksCount ? `(${incompleteTasksCount})` : "";
  },
  tasks() {
    const instance = Template.instance();
    const hideCompleted = instance.state.get(HIDE_COMPLETED_STRING);

    const { pendingOnlyFilter, userFilter } = getTasksFilter();

    if (!isUserLogged()) {
      return [];
    }

    console.log(TasksCollection.find());

    const tasks = TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
    console.log(tasks);
    return tasks;
  },
  hideCompleted() {
    const instance = Template.instance();
    return instance.state.get(HIDE_COMPLETED_STRING);
  },
  getUser() {
    return getUser();
  },
});

Template.form.events({
  "submit .task-form"(event) {
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;
    const createdAt = new Date();

    TasksCollection.insert({
      text,
      userId: getUser()._id,
      createdAt,
    });

    target.text.value = "";
  },
});
