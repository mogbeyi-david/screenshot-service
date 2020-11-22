import { AMQP_CLIENT } from '../config/env';

const openConnection = require('amqplib').connect(AMQP_CLIENT);

class RabbitmqService {
  public static publish(queue: string, data: object) {
    openConnection
      .then(function (connection: any) {
        return connection.createChannel();
      })
      .then(function (channel: any) {
        return channel.assertQueue(queue).then(function () {
          return channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
        });
      })
      .catch(console.warn);
  }
}

export default RabbitmqService;
