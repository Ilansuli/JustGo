import axios from "axios";
import path from "path";
import fs from "fs";
import { promisify } from "util";
import { getCollection } from "./services/db.service";
import { loggerService } from "./services/logger.service";
const extractFrames = require("gif-extract-frames");
const { exec } = require("child_process");
const { createCanvas, loadImage } = require("canvas");
const PNG = require("pngjs").PNG;
// import exercises from "./exercises.json";
const getExcercises = async () => {
  const options = {
    method: "GET",
    url: "https://exercisedb.p.rapidapi.com/exercises",
    params: { limit: "3000" },
    headers: {
      "X-RapidAPI-Key": "898d974b22msh9fee6dfcd586d1cp122783jsn48c2fe6a28a5",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    let exercisesData = response.data;

    // Modify gifUrl field in each document
    exercisesData = exercisesData.map((exercise) => {
      const id = exercise.gifUrl.split("/").pop(); // Extract id from gifUrl
      // exercise.gifUrl = `/images/exercises_gif/${id}.gif`; // Update gifUrl field
      delete exercise.id; // Delete id field
      return exercise;
    });

    // Save data to JSON file
    const filePath = path.join(__dirname, "exercises.json");
    fs.writeFileSync(filePath, JSON.stringify(exercisesData, null, 2));
    // return await response.data;
  } catch (error) {
    console.error(error);
  }
};
// getExcercises();
const downloadGif = async (url) => {
  try {
    const response = await axios.get(url, { responseType: "stream" });
    const folderPath = path.join(__dirname, "exercises_gif");
    const filePath = path.join(folderPath, `${url.split("/").pop()}.gif`);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (error) {
    console.error(`Error downloading GIF from ${url}:`, error.message);
  }
};
const downloadExerciseGifs = async (exercises) => {
  for (const exercise of exercises) {
    const { gifUrl } = exercise;
    await downloadGif(gifUrl);
  }

  console.log("All GIFs downloaded successfully.");
};
// downloadExerciseGifs(exercises);
const exctract = async () => {
  const readdir = promisify(fs.readdir);

  try {
    // Read the contents of the directory
    const files = fs.readdirSync("./exercises_gif");
    // Iterate through each file
    for (const file of files) {
      console.log(file);
      if (file.endsWith(".gif")) {
        // Construct input and output paths
        const inputPath = `./exercises_gif/${file}`;
        const outputPath = `./exercises_gif_frames/${
          file.split(".")[0]
        }-frame-%d.png`;

        // Call your extractFrames function
        const results = await extractFrames({
          input: inputPath,
          output: outputPath,
        });

        console.log(`Frames extracted for ${file}:`, results);
      }
    }
  } catch (error) {
    console.error("Error extracting frames:", error);
  }
};
// exctract();

async function exercisesQuery() {
  try {
    const collection = await getCollection("Copy_of_exercise");
    const documents = await collection?.find({}).toArray();

    // Iterate through documents
    for (const doc of documents) {
      // Read image files and convert to base64
      console.log("starting another");
      const gifStartFrameSrcBase64 = await _getImageBase64(
        doc.gifStartFrameSrc
      );
      const gifEndFrameSrcBase64 = await _getImageBase64(doc.gifEndFrameSrc);

      // Update documents with base64 images
      await collection.updateOne(
        { _id: doc._id },
        {
          $set: {
            gifStartFrameSrc: gifStartFrameSrcBase64,
            gifEndFrameSrc: gifEndFrameSrcBase64,
          },
        }
      );
      console.log("ending another");
    }

    console.log("Conversion completed");
  } catch (err) {
    loggerService.error("cannot find exercises", err);
    throw err;
  }
}
// Function to read image file and convert to base64
function _getImageBase64(imagePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.join(__dirname, imagePath),
      { encoding: "base64" },
      (err, data) => {
        if (err) {
          if (err.code === "ENOENT") {
            console.error(`File not found: ${imagePath}. Skipping...`);
            resolve(null); // Resolve with null if file not found
          } else {
            reject(err); // Reject for other errors
          }
        } else {
          resolve(`data:image/png;base64,${data}`);
        }
      }
    );
  });
}
// equipmentQuery();
async function equipmentQuery() {
  try {
    const collection = await getCollection("exerciseOrigin");
    const uniqueEquipment = await collection.distinct("target");
    // uniqueEquipment now contains an array of all unique values of the "equipment" key
    console.log(uniqueEquipment);
  } catch (err) {
    loggerService.error("cannot find exercises", err);
    throw err;
  }
}

function _getFilesInDir(directory) {
  return fs.readdirSync(directory);
}

// Convert frames to MP4 using ffmpeg
function _convertToMp4(frames, outputMp4) {
  return new Promise((resolve: (value: unknown) => void, reject) => {
    const ffmpegCommand = `ffmpeg -y -framerate 10 -f image2pipe -i - -c:v libx264 -pix_fmt yuv420p ${outputMp4}`;

    const ffmpegProcess = exec(ffmpegCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
      }
      if (stderr) {
        console.error(`ffmpeg stderr: ${stderr}`);
        reject(stderr);
      }
      console.log(`stdout: ${stdout}`);
      //@ts-ignore
      resolve();
    });

    // Pipe frames to ffmpeg
    frames.forEach((frame) => {
      ffmpegProcess.stdin.write(frame.getImageData());
    });

    ffmpegProcess.stdin.end();
  });
}
async function main(input, output) {
  try {
    // List all files in the input folder
    const files = _getFilesInDir(input);

    // Process each file
    for (const file of files) {
      const inputGif = input + file;
      const outputMp4 = output + file.replace(".gif", ".mp4");

      console.log(`Converting ${inputGif} to ${outputMp4}`);

      const frames = await extractFrames(inputGif);
      await _convertToMp4(frames, outputMp4);

      console.log(`Conversion of ${inputGif} completed successfully.`);
    }

    console.log("All conversions completed successfully.");
  } catch (error) {
    console.error("Error:", error);
  }
}

removeBackground(
  "../frontend/public/images/exercises_gif_frames/-0XBOh-zXjMecr-frame-end.png",
  "outputPath.png",
  { r: 255, g: 255, b: 255, alpha: 0 }
);
async function removeBackground(inputPath, outputPath, backgroundColor) {
  try {
    // Load input image
    const image = await loadImage(inputPath);

    // Create canvas with the same dimensions as the image
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");

    // Draw the image on the canvas
    ctx.drawImage(image, 0, 0, image.width, image.height);

    // Get the image data
    const imageData = ctx.getImageData(0, 0, image.width, image.height);
    const { data } = imageData;

    // Process image data - replace background color with transparent
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      // Check if the pixel color matches the background color
      if (
        r === backgroundColor.r &&
        g === backgroundColor.g &&
        b === backgroundColor.b &&
        a === backgroundColor.alpha
      ) {
        // Set alpha channel to 0 to make it transparent
        data[i + 3] = 0;
      }
    }

    // Set modified image data back to canvas
    ctx.putImageData(imageData, 0, 0);

    // Save canvas as PNG
    const pngStream = canvas.createPNGStream();
    const outputStream = fs.createWriteStream(outputPath);
    pngStream.pipe(outputStream);

    console.log("Background removed successfully!");
  } catch (err) {
    console.error("Error removing background:", err);
  }
}
