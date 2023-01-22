import { AMQP } from "amqp/amqp";
import { Task } from "models/task";
import config from "../../config";

export class FinishedTasksConsumer {
  private amqp: AMQP;

  constructor(amqp: AMQP) {
    this.amqp = amqp;
  }

  consume = async (): Promise<void> => {
    await this.amqp.connect();

    const queue = config.amqp.queues.finishedTasks!;

    await this.amqp.getChannel().assertQueue(queue);

    this.amqp.getChannel().consume(queue, (data: any) => {
      const task = JSON.parse(data.content.toString()) as Partial<Task>;

      console.info(
        `> The tech ${task.user?.name} performed the task ${task.summary} on date ${task.date}`
      );

      this.amqp.getChannel().ack(data);
    });
  };
}
