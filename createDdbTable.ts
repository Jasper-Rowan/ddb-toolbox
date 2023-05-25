import { DynamoDBClient, CreateTableCommand, CreateTableCommandInput } from "@aws-sdk/client-dynamodb";

const region = "us-east-1";
const client = new DynamoDBClient({ region });

const params: CreateTableCommandInput = {
  TableName: "Videos",
  KeySchema: [
    { AttributeName: "videoId", KeyType: "HASH" }, //Partition key
  ],
  AttributeDefinitions: [{ AttributeName: "videoId", AttributeType: "N" }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};

export async function createTable() {
  const command = new CreateTableCommand(params);
  try {
    const data = await client.send(command);
    console.log(
      "Created table. Table description JSON:",
      JSON.stringify(data, null, 2)
    );
  } catch (err) {
    return console.error(
      "Unable to create table. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  }
}
