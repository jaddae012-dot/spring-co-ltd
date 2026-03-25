import { v2 as cloudinary } from "cloudinary";

let isConfigured = false;

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name} environment variable.`);
  }
  return value;
}

function getCloudinary() {
  if (!isConfigured) {
    cloudinary.config({
      cloud_name: requireEnv("CLOUDINARY_CLOUD_NAME"),
      api_key: requireEnv("CLOUDINARY_API_KEY"),
      api_secret: requireEnv("CLOUDINARY_API_SECRET"),
      secure: true,
    });
    isConfigured = true;
  }

  return cloudinary;
}

function sanitizeFileBaseName(fileName: string): string {
  const baseName = fileName.replace(/\.[^/.]+$/, "").trim();
  return baseName.replace(/[^a-zA-Z0-9-_]+/g, "-").replace(/^-+|-+$/g, "");
}

export async function uploadToCloudinary(file: File, folder: string): Promise<string> {
  const client = getCloudinary();
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    const stream = client.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
        use_filename: true,
        unique_filename: true,
        filename_override: sanitizeFileBaseName(file.name),
      },
      (error, result) => {
        if (error) {
          reject(new Error(error.message));
          return;
        }

        if (!result?.secure_url) {
          reject(new Error("Cloudinary did not return a file URL."));
          return;
        }

        resolve(result.secure_url);
      }
    );

    stream.end(fileBuffer);
  });
}
