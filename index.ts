import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Table, Entity } from "dynamodb-toolbox";

// Configure AWS SDK v3 and create DynamoDB client
const client = new DynamoDBClient({ region: "us-east-1" });

// Define a Table
const VideoTable = new Table({
  name: "Videos",
  partitionKey: "videoId",
  DocumentClient: client,
});

// Define an Entity
const Video = new Entity({
  name: "Video",
  attributes: {
    videoId: { type: "number", partitionKey: true },
    Labels: { type: "map" },
    // Add other attributes here
  },
  table: VideoTable,
});

async function addVideo(videoId: number, Labels: Record<string, number>) {
  const video = {
    videoId,
    Labels,
    // Add other attributes here
  };

  await Video.put(video);
}

async function getVideo(videoId: number) {
  const video = await Video.get({ videoId });
  console.log(video);
  return video;
}

// Add a video
addVideo(1, { "Liquid_Death": 99.9999, "Timestamp": 1.00550 }).then(() => {
  // Get the video
  getVideo(1);
});
