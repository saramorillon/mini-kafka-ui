package com.saramorillon.controllers.message;

import java.sql.SQLException;
import java.util.Properties;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.Uuid;
import org.cef.callback.CefQueryCallback;
import com.saramorillon.Router;
import com.saramorillon.models.Response;
import com.saramorillon.models.Server;

class SendMessageParams {
    public int id;
    public String topic;
    public String value;
}


public class SendMessage extends Router<SendMessageParams, Void> {
    public SendMessage() {
        super(SendMessageParams.class);
    }

    @Override
    public Response<Void> onQuery(SendMessageParams params, CefQueryCallback callback) {
        try {
            Server server = Server.get(params.id);
            Properties props = new Properties();
            props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, server.brokers);
            props.put(ProducerConfig.ACKS_CONFIG, "all");
            Producer<String, String> producer = new KafkaProducer<>(props);
            producer.send(new ProducerRecord<String, String>(params.topic,
                    Uuid.randomUuid().toString(), params.value));
            producer.close();
            return new Response<Void>(200);
        } catch (SQLException e) {
            e.printStackTrace();
            return new Response<Void>(500, e.getMessage());
        }
    }
}
