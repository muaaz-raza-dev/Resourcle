
import amqp  from 'amqplib/callback_api';
export function PushToQueue(){


amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        console.log(error0)
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        const queue = 'hello';
        const msg = 'Hello world';
    
        channel.assertQueue(queue, {
          durable: false
        });
    
        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
    }
        
)
setTimeout(function() {
    connection.close();
  }, 500);
}); }

        