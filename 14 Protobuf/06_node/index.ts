import fs from "fs";
import protobuf from "protobufjs";

//* Example 1
// Load the .proto file dynamically
protobuf.load("./example.proto", (err: Error | null, root: protobuf.Root | undefined): void => {
  if (err) throw err;

  // Get the User message type
  const User = root?.lookupType("example.User") as protobuf.Type;

  // Example JSON data
  const jsonData = { id: "123", name: "John Doe", age: 30 };

  // Validate the JSON data against the schema
  const errMsg = User?.verify(jsonData) as string;
  if (errMsg) {
    throw new Error(errMsg);
  }

  // Serialize JSON to binary using Protobuf
  const message: protobuf.Message<{}> = User?.create(jsonData); // Create a Protobuf message object
  // console.log("message:", message);

  const buffer: Uint8Array<ArrayBufferLike> = User?.encode(message).finish(); // Serialize to binary
  console.log(1, "Serialized Data:", buffer);

  // Deserialize binary back to JSON
  const decodedMessage: protobuf.Message<{}> = User?.decode(buffer); // Decode binary back to Protobuf object
  console.log(2, "Deserialized Data:", decodedMessage);
});

console.log(3, "----");
//* Example 2
// Load the protobuf definition
const loadProtobuf = async (): Promise<protobuf.Type> => {
  const root: protobuf.Root = await protobuf.load("./example.proto");
  return root.lookupType("User");
};

(async function (): Promise<void> {
  fs.readFile("./data.json", "utf8", async (err: NodeJS.ErrnoException | null, data: string): Promise<void> => {
    if (err) throw err;

    const jsonData: { [key: string]: any } = JSON.parse(data);

    const User: protobuf.Type = await loadProtobuf();
    // console.log("User:", User);

    // Validate and serialize as shown above
    const message: protobuf.Message<{}> = User.create(jsonData);
    const buffer: Uint8Array<ArrayBufferLike> = User.encode(message).finish();

    fs.writeFile("./data.bin", buffer, (err) => {
      if (err) throw err;
      console.log(4, "Serialized data written to ./data.bin");
    });
  });

  fs.readFile("./data.bin", async (err: NodeJS.ErrnoException | null, buffer: Buffer<ArrayBufferLike>): Promise<void> => {
    if (err) throw err;

    const User: protobuf.Type = await loadProtobuf();

    const decodedMessage: protobuf.Message<{}> = User.decode(buffer);
    console.log(5, "Deserialized Data:", decodedMessage);

    // const jsonData = User.toObject(decodedMessage, {
    //   longs: String, // Convert long values to strings for compatibility
    //   enums: String, // Convert enums to strings
    //   defaults: true, // Include default values in the output
    //   arrays: true, // Include empty arrays if fields are repeated
    //   objects: true, // Include empty objects if fields are nested messages
    // }) as { [key: string]: any };
    // console.log(6, "jsonData:", jsonData);

    // // Write the JSON data to a file
    // fs.writeFile("./output.json", JSON.stringify(jsonData, null, 2), (writeErr) => {
    //   if (writeErr) throw writeErr;
    //   console.log(7, "JSON data written to output.json");
    // });
    fs.writeFile("./output.json", JSON.stringify(decodedMessage, null, 2), (writeErr) => {
      if (writeErr) throw writeErr;
      console.log(7, "JSON data written to output.json");
    });
  });
})();
