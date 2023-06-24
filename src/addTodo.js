const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const addTodo = async (event) => {
  const dynamodb = AWS.DynamoDB.DocumentClient();

  const { todo } = JSON.parse(event.body);
  const createdAT = new Date();
  const id = v4();

  console.log("This is an id", id)

  const newTodo = {
    id,
    todo,
    createdAt,
    completed: false,
  };

  await dynamodb.put({
    TableName: "TodoTable",
    Item: newTodo,
  });

  return {
    statusCode: 200,
    body: JSON.stringify(newTodo),
  };
};

module.exports = {
  handler: addTodo,
};
