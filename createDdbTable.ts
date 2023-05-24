import * as AWS from "aws-sdk";

AWS.config.update({
  region: "us-east-1",
});

const dynamodb = new AWS.DynamoDB();

const params: AWS.DynamoDB.CreateTableInput = {
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

export function createTable() {
  dynamodb.createTable(params, (err, data) => {
    if (err) {
      console.error(
        "Unable to create table. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log(
        "Created table. Table description JSON:",
        JSON.stringify(data, null, 2)
      );
    }
  });
}
