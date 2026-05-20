import db from './database';

export const insertTask = async task => {
  try {
    const result = await db.execute(
      `INSERT INTO tasks(title, description, completed, syncStatus) VALUES(?, ?, ?, ?)`,
      [task.title, task.description, task.completed ? 1 : 0, 'pending'],
    );

    return result.insertId;
  } catch (err) {
    console.log('Insert task error', err.message);
  }
};

export const getTasks = async () => {
  try {
    const result = await db.execute(`SELECT * FROM tasks`);

    return result.rows;
  } catch (error) {
    console.log('Get Tasks Error', error);
    return [];
  }
};

export const updateTask = async (id, title, description) => {
  try {
    await db.execute(
      `
      UPDATE tasks
      SET title = ?, description = ?, syncStatus = ?
      WHERE id = ?
      `,
      [title, description, 'pending', id],
    );
  } catch (error) {
    console.log('Update Task Error', error);
  }
};

export const toggleTaskStatus = async (id, completed) => {
  try {
    await db.execute(
      `
      UPDATE tasks
      SET completed = ?, syncStatus = ?
      WHERE id = ?
      `,
      [completed ? 1 : 0, 'pending', id],
    );
  } catch (error) {
    console.log('Toggle Error', error);
  }
};

export const markTaskForDeletion = async id => {
  try {
    await db.execute(
      `UPDATE tasks 
      SET syncStatus = 'pending_delete'
      where id = ?`,
      [id],
    );
  } catch (err) {
    console.log('Mark Task For Deletion Error', err);
  }
};

export const deleteTask = async id => {
  try {
    await db.execute(`DELETE FROM tasks WHERE id = ?`, [id]);
  } catch (err) {
    console.log('Delete Task Error', err);
  }
};

export const getPendingTasks = async () => {
  const result = await db.execute(
    `
    SELECT * FROM tasks
    WHERE syncStatus = 'pending' OR syncStatus = 'pending_delete'
    `,
  );

  return result.rows;
};

export const markTaskAsSynced = async id => {
  await db.execute(
    `
      UPDATE tasks
      SET syncStatus = 'synced'
      WHERE id = ?
      `,
    [id],
  );
};
