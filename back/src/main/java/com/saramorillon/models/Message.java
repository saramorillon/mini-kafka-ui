package com.saramorillon.models;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import com.saramorillon.Dao;

public class Message {
    int serverId;
    String topic;
    int partition;
    long offset;
    long timestamp;
    String key;
    String value;

    public Message(int serverId, String topic, ConsumerRecord<String, String> record) {
        this.serverId = serverId;
        this.topic = topic;
        this.partition = record.partition();
        this.offset = record.offset();
        this.timestamp = record.timestamp();
        this.key = record.key();
        this.value = record.value();
    }


    public Message(ResultSet rs) throws SQLException {
        this.serverId = rs.getInt("serverId");
        this.topic = rs.getString("topic");
        this.partition = rs.getInt("partition");
        this.offset = rs.getInt("offset");
        this.timestamp = rs.getInt("timestamp");
        this.key = rs.getString("key");
        this.value = rs.getString("value");
    }

    public static Collection<Message> get() {
        Collection<Message> messages = new ArrayList<>();
        try {
            String query = "SELECT * FROM message";
            PreparedStatement statement = Dao.connection.prepareStatement(query);
            ResultSet rs = statement.executeQuery();
            while (rs != null && rs.next()) {
                messages.add(new Message(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return messages;
    }

    public static void save(Message message) {
        try {
            String query = "INSERT OR REPLACE INTO message VALUES (?, ?, ?, ?, ?, ?, ?)";
            PreparedStatement statement = Dao.connection.prepareStatement(query);
            statement.setInt(1, message.serverId);
            statement.setString(2, message.topic);
            statement.setInt(3, message.partition);
            statement.setLong(4, message.offset);
            statement.setLong(5, message.timestamp);
            statement.setString(6, message.key);
            statement.setString(7, message.value);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
