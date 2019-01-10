/* eslint-env mocha */
 
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'chai'; 
import { Tasks } from './tasks.js';
import { Accounts } from 'meteor/accounts-base';

if (Meteor.isServer) {
  describe('Tasks', () => {
    describe('methods', () => {
      const username = 'yannick';
      let taskId, userId;
      
      // run once
      before (() => {
        // check if there is a user
        let user = Meteor.users.findOne({username : username});
        // Test if there is not a user, create one
        if (!user) {
          userId = Accounts.createUser ({
            'username' : username,
            'email' : 'a@blur.com',
            'password' : '1234',
          });
        } else {
          userId = user._id
        }
      });
      beforeEach(() => {
        Tasks.remove({});
        taskId = Tasks.insert({
          text: 'test task',
          createdAt: new Date(),
          owner: userId,
          username: 'tmeasday',
        });
      });
 
      it('can delete owned task', () => {
        // Find the internal implementation of the task method so we can
        // test it in isolation
        const deleteTask = Meteor.server.method_handlers['tasks.remove'];
        // Set up a fake method invocation that looks like what the method expects
        const invocation = { userId };
        // Run the method with `this` set to the fake invocation
        deleteTask.apply(invocation, [taskId]);
        // Verify that the method does what we expected
        assert.equal(Tasks.find().count(), 0);
      });

      it('can insert task', () => {
        const text = 'test';
        const insertTask = Meteor.server.method_handlers['tasks.insert'];
        // Set up a fake method invocation that looks like what the method expects
        const invocation = { userId };
        // Run the method with `this` set to the fake invocation
        insertTask.apply(invocation, [text]);
        // Verify that the method does what we expected
        assert.equal(Tasks.find().count(), 2);
      });
    });
  });
}