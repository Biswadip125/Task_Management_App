import notifee, {
  AndroidImportance,
  AndroidVisibility,
  TriggerType,
} from '@notifee/react-native';

export const ensureChannel = async () => {
  await notifee.createChannel({
    id: 'default_v2', // new id
    name: 'Task Reminders',
    importance: AndroidImportance.HIGH,
  });
};

export const scheduleNotification = async task => {
  try {
    const timestamp = Number(task.reminderTime);

    await ensureChannel();

    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp,
      alarmManager: {
        allowWhileIdle: true,
      },
    };

    console.log('scheduling notification');

    await notifee.createTriggerNotification(
      {
        id: String(task.id),
        title: 'Task Reminder ⏰',
        body: `${task.title}`,
        android: {
          channelId: 'default_v2',
          importance: AndroidImportance.HIGH,
          pressAction: { id: 'default' },
          visibility: AndroidVisibility.PUBLIC,
        },
      },
      trigger,
    );

    console.log('notification created');

    const notifications = await notifee.getTriggerNotifications();

    console.log(notifications);
  } catch (err) {
    console.log('NOTIFICATION ERROR', err);
  }
};
export const cancelNotification = async taskId => {
  await notifee.cancelNotification(String(taskId));
};
