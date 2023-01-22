import amqp, { Connection, Channel } from "amqplib";
import config from "../config";

export class AMQP {
  private connection: Connection;
  private channel: Channel;

  getChannel = () => {
    return this.channel;
  };

  connect = async () => {
    try {
      if (!this.connection) {
        this.connection = await amqp.connect(
          `amqp://${config.amqp.host}:${config.amqp.port}`
        );
        this.channel = await this.connection.createChannel();
      }
    } catch (err) {
      console.error(err);
    }
  };

  closeConnection = async () => {
    if (this.connection) {
      await this.connection.close();
    }
  };

  closeChannel = async () => {
    if (this.channel) {
      await this.channel.close();
    }
  };

  send = async (queue: string, data: object) => {
    await this.connect();

    await this.channel.assertQueue(queue);
    await this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
  };
}
