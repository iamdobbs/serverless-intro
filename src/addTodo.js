// uuid will provide id. aws-sdk will provide dynamodb access
const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");

const addTodo = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient(); // declare dynamodb

  const { todo } = event.body; // define relevant todo variables
  const createdAt = new Date().toISOString();
  const id = v4();

  const newTodo = {
    // declare todo object and its properties
    id,
    todo,
    createdAt,
    completed: false,
  };

  await dynamodb
    .put({
      // async for dynamo to 'put' to the TodoTable the 'Item' which is the newTodo object
      TableName: "TodoTable",
      Item: newTodo,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(newTodo),
  };
};

module.exports = {
  handler: middy(addTodo).use(httpJsonBodyParser()),
};
