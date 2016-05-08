/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * Bits & Snacks
 * Simple Alexa skill based on the New Fact Skill Template provided by Amazon under the following license:
 * http://aws.amazon.com/apache2.0/
 *
 * This skill can receive and respond to voice requests made on the Alexa platform and provides the user
 * with a random healthy snack to complement her or his daily nutrition plan.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, give me a healthy snack"
 *  Alexa: "Here's a delicous snack for you: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing healthy snacks.
 * @todo Get list from external source or custom source.
 */
var SNACKS = [
    'Protein Bar',
    'Plain greek yoghurt with honey and almonds',
    'Half peanut butter sandwich on whole wheat bread',
    'Fat free cottage cheese and ripe banana',
    'Turkey jerky and saltine crackers',
    'Homemade trail mix',
    'Grapes and low fat mozarella string cheese',
    'Amonds and apricots',
    'Peanut butter and a sliced apple',
    'Fat free cottage cheese with cinnamon',
    'Bag of pretzels with spicy mustard',
    'Cup of skim milk and small banana',
    'Sliced roasted turkey and pickle',
    'Air popped popcorn',
    'Small bowl of high protein cereal',
    'Non fat smoothie with half banana and almond milk',
    'Hummus and half whole wheat pita',
    'Small bag of carrots'
    'Cup of sliced watermelon',
    'Non-fat Cheese squares'
    'Hummus and pita chips',
    'A cup of strawberries and blueberries',
    'Mandarines and walnuts',
    'A cup of edamame',
    'Half cucumber and non-fat cream cheese sandwich',
    'Seaweed Salad',
    'Seaweed roll with brown rice'
    'Frozen banana with toasted oats'
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * Constructor
 */
var BitSnack = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
BitSnack.prototype = Object.create(AlexaSkill.prototype);
BitSnack.prototype.constructor = BitSnack;

/**
* onSessionStartted
* @todo Add logic to retrieve updated snack list or custom list
*/
BitSnack.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("BitSnack onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
};

BitSnack.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("BitSnack onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
BitSnack.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("BitSnack onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
};

BitSnack.prototype.intentHandlers = {
    "GetSnackIntent": function (intent, session, response) {
        handleNewSnackRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask(
            "You can ask Bits and Snacks give a healthy snack, or, you can say exit... What can I help you with?",
            "What can I help you with?"
        );
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random snack from the list and tells the response.
 * @param {object} response
 */
function handleNewSnackRequest(response) {
    // Get a random space fact from the space facts list
    var snackIndex = Math.floor(Math.random() * SNACKS.length);
    var snack = SNACKS[factIndex];

    // Create speech output
    var speechOutput = "Here's your healthy snack: " + snack;

    response.tellWithCard(speechOutput, "BitSnack", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the BitSnack skill.
    var BitSnack = new BitSnack();
    BitSnack.execute(event, context);
};

