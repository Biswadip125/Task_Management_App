import { open } from '@op-engineering/op-sqlite';

const db = open({
  name: 'task-manager.db',
});

export default db;

export const createTables = async () => {
  await db.execute(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    completed INTEGER DEFAULT 0,
    syncStatus TEXT DEFAULT pending,
    reminderTime INTEGER,
    notificationId TEXT
    )`);
};
