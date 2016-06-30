import { KinveyError, NotFoundError } from 'kinvey-javascript-sdk-core/dist/errors';
import { Promise } from 'es6-promise';
import map from 'lodash/map';
import isArray from 'lodash/isArray';
const idAttribute = process.env.KINVEY_ID_ATTRIBUTE || '_id';
const dbCache = {};

/**
 * @private
 */
export class TitaniumDB {
  constructor(name = 'kinvey') {
    this.name = name;
  }

  execute(collection, query, parameters) {
    let db = dbCache[this.name];
    const escapedCollection = `"${collection}"`;
    const isMulti = isArray(query);
    query = isMulti ? query : [[query, parameters]];

    const promise = new Promise((resolve, reject) => {
      try {
        if (!db) {
          db = Titanium.Database.open(this.name);
          dbCache[this.name] = db;
        }

        // Start a transaction
        db.execute('BEGIN TRANSACTION');

        // Create the table if it does not exist yet
        db.execute(`CREATE TABLE IF NOT EXISTS ${escapedCollection} ` +
          '(key BLOB PRIMARY KEY NOT NULL, value BLOB NOT NULL)');

        // Execute queries
        const response = map(query, parts => {
          const sql = parts[0].replace('#{collection}', escapedCollection);
          const cursor = db.execute(sql, parts[1]);
          const response = { rowCount: db.getRowsAffected(), result: null };

          if (cursor) {
            response.result = [];

            while (cursor.isValidRow()) {
              const entity = JSON.parse(cursor.fieldByName('value'));
              response.result.push(entity);
              cursor.next();
            }

            cursor.close();
          }

          return response;
        });

        // Commit the transaction
        db.execute('COMMIT TRANSACTION');

        resolve(isMulti ? response : response.shift());
      } catch (error) {
        reject(new KinveyError(error.message));
      }
    });

    return promise;
  }

  find(collection) {
    const sql = 'SELECT value FROM #{collection}';
    const promise = this.execute(collection, sql, []).then(response => response.result).catch(error => {
      if (error instanceof NotFoundError) {
        return [];
      }

      throw error;
    });
    return promise;
  }

  findById(collection, id) {
    const sql = 'SELECT value FROM #{collection} WHERE key = ?';
    const promise = this.execute(collection, sql, [id]).then(response => {
      const entities = response.result;

      if (entities.length === 0) {
        throw new NotFoundError(`An entity with _id = ${id} was not found in the ${collection} ` +
          `collection on the ${this.name} webSQL database.`);
      }

      return entities[0];
    });
    return promise;
  }

  save(collection, entities) {
    const queries = [];
    entities = map(entities, entity => {
      queries.push([
        'INSERT OR REPLACE INTO #{collection} (key, value) VALUES (?, ?)',
        [entity[idAttribute], JSON.stringify(entity)]
      ]);

      return entity;
    });

    const promise = this.execute(collection, queries, null).then(() => entities);
    return promise;
  }

  removeById(collection, id) {
    const promise = this.execute(collection, [
      ['SELECT value FROM #{collection} WHERE key = ?', [id]],
      ['DELETE FROM #{collection} WHERE key = ?', [id]],
    ], null).then(response => {
      const entities = response[0].result;
      const count = response[1].rowCount || entities.length;

      if (count === 0) {
        throw new NotFoundError(`An entity with _id = ${id} was not found in the ${collection} ` +
          `collection on the ${this.name} webSQL database.`);
      }

      return {
        count: 1,
        entities: entities
      };
    });

    return promise;
  }

  static isSupported() {
    return typeof Titanium.Database !== 'undefined';
  }
}
