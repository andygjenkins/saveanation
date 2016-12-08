import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';

import { Targets } from './targets.js';

if(Meteor.isServer) {
  describe('Targets', function() {
    describe('methods', function() {
      const userId = Random.id();
      const targetDate = new Date();
      const createdAt = new Date();
      let targetId;

      beforeEach(function(){
        resetDatabase();
        // targetId = Targets.insert({
        //   targetAmount: 5000,
        //   targetDate: new Date(),
        //   createdAt: new Date(),
        //   createdBy: userId,
        //  });
      });

      it('can add a target', function(){
        // Find the internal implementation of the addTarget method so we can
        // test it in isolation
        const addTarget = Meteor.server.method_handlers['targets.add'];
        // Set up a fake method invocation that looks like what the method expects
        const invocation = { userId };
        // Run the method with `this` set to the fake invocation
        addTarget.apply(invocation, [5000, targetDate]);
        // Verify that the method does what we expected
        assert.equal(Targets.find().count(), 1);
      });

      it('can add a target value', function() {
        const addTarget = Meteor.server.method_handlers['targets.add'];
        const invocation = { userId };
        addTarget.apply(invocation, [5000, targetDate]);
        var testObject = Targets.findOne({createdBy: userId});
        // assert.equal(Targets.find({targetAmount: 5000}).count(), 1);
        assert.equal(testObject.targetAmount, 5000);
      });

      it('can edit a target value', function() {
        Targets.insert({targetAmount: 5000, targetDate: targetDate, createdBy: userId, createdAt: createdAt});
        const editTarget = Meteor.server.method_handlers['targets.edit'];
        const invocation = { userId };
        editTarget.apply(invocation, [1000, targetDate]);
        var testObject = Targets.findOne({createdBy: userId});
        assert.equal(testObject.targetAmount, 1000);
      });
    });
  });
};