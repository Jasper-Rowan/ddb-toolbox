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
    Labels: 'string',
    // Add other attributes here
  },
  table: VideoTable,
});

interface Label {
  Name: string,
  Confidence: number,
  Timestamp: number
}

async function addVideo(videoId: number, Labels: Label[]) {
  const video = {
    videoId,
    Labels: JSON.stringify(Labels), // Stringify Labels before storing
    // Add other attributes here
  };

  await Video.put(video);
}

async function getVideo(videoId: number) {
    const video = await Video.get({ videoId });
    // Parse Labels after retrieving
    //@ts-ignore
    if (video.Item.Labels) {
    //@ts-ignore
      video.Labels = JSON.parse(video.Item.Labels);
    } else {
      console.log("No Labels found for this video.");
    }
    console.log('video: ', video);
    return video;
  }
  
let Labels = [
    {
      Name: "natural_spring_water",
      Confidence: 37.621002197265625,
      Timestamp: 0,
    },
    {
      Name: "not_liquid_death",
      Confidence: 52.36300277709961,
      Timestamp: 1000,
    },
  ];

// Add a video
addVideo(10, Labels).then(() => {
  // Get the video
  getVideo(10);
});
