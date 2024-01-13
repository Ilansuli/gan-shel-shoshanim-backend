import { getCollection } from "./db.service";
import { ObjectId } from "mongodb";
import fs from "fs-extra";

export async function insertProject(
  projectImgsDir: string,
  newProjectCity: string
) {
  console.log("insertDocs started");
  try {
    const galleryImgCollection = await getCollection("gallery_img");
    const projectCollection = await getCollection("project");

    const newProject = await projectCollection.insertOne({
      city: newProjectCity,
    });

    fs.readdir(projectImgsDir, { withFileTypes: true }, async (err, files) => {
      console.log("\nCurrent directory files:");
      if (err) console.log(err);
      else {
        const documents = files.map((file) => {
          fs.moveSync(
            `${projectImgsDir}/${file.name}`,
            `C:/Users/ilans/dev/Projects/Gan-Shel-Shohanim - React+Vite/frontend/public/images/gallery/${file.name}`
          );
          return {
            imgSrc: `../../public/images/gallery/${file.name}`,
            parentCategoryId: new ObjectId("6574693339ae28cfc6146a3c"),
            parentProjectId: new ObjectId(`${newProject.insertedId}`),
            isProjectInitState: false,
          };
        });
        console.log(documents);
        const result = await galleryImgCollection.insertMany(documents);
        console.log(`${result.insertedCount} documents inserted.`);
      }
    });
  } catch (err) {
    console.log("insertDocuments fail", err);
  }
}
