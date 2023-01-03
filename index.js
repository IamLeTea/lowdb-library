// Remember to set type: module in package.json or use .mjs extension
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

class LowDB {
  constructor({
    filePath,
    defaultData = {},
    __dirname = dirname(fileURLToPath(import.meta.url))
  } = {}) {
    this.defaultData = defaultData;

    const file = join(__dirname, `../../../${filePath}`);
    // Configure lowdb to write to JSONFile
    const adapter = new JSONFile(file);

    this.db = new Low(adapter);
  }

  async readData() {
    await this.db.read();

    this.db.data = this.db.data || this.defaultData;

    await this.writeData();

    return this.db.data;
  }

  async writeData(data) {
    if (data) {
      this.db.data = data;
    }

    await this.db.write();
  }
}

export { LowDB };
