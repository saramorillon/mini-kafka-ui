package com.saramorillon.models;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;
import java.util.Set;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import com.saramorillon.Dao;

public class Message {
    public int serverId;
    public String topic;
    public int partition;
    public long offset;
    public long timestamp;
    public String key;
    public String value;

    public Message(ConsumerRecord<String, String> record) {
        this.partition = record.partition();
        this.offset = record.offset();
        this.timestamp = record.timestamp();
        this.key = record.key();
        this.value = record.value();
    }

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
        this.serverId = rs.getInt("server_id");
        this.topic = rs.getString("topic");
        this.partition = rs.getInt("partition");
        this.offset = rs.getInt("offset");
        this.timestamp = rs.getInt("timestamp");
        this.key = rs.getString("key");
        this.value = rs.getString("value");
    }

    public static Collection<Message> get(Map<String, String> filters, int page, int limit)
            throws SQLException {
        Collection<Message> messages = new ArrayList<>();
        String query = "SELECT * FROM message";
        Set<String> keys = filters.keySet();
        Collection<String> values = new ArrayList<>(filters.values());
        if (filters.size() > 0) {
            query += " WHERE ";
            query += String.join(" AND ", keys.stream().map(key -> key + " = ?").toList());
        }
        query += " LIMIT " + limit + " OFFSET " + (page - 1) * limit;
        PreparedStatement statement = Dao.connection.prepareStatement(query);
        if (filters.size() > 0) {
            int i = 1;
            for (String value : values) {
                statement.setString(i++, value);
            }
        }
        ResultSet rs = statement.executeQuery();
        while (rs != null && rs.next()) {
            messages.add(new Message(rs));
        }
        return messages;
    }

    public static void save(Message message) throws SQLException {
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
    }
}
