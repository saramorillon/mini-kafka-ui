package com.saramorillon.models;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import com.saramorillon.Dao;

public class Favorite {
    public int serverId;
    public String topic;

    public Favorite(ResultSet rs) throws SQLException {
        this.serverId = rs.getInt("server_id");
        this.topic = rs.getString("topic");
    }

    @Override
    public boolean equals(Object obj) {
        return obj != null && (obj instanceof Favorite) && ((Favorite) obj).topic.equals(this.topic)
                && ((Favorite) obj).serverId == this.serverId;
    }

    public static Collection<Favorite> get() throws SQLException {
        var favorites = new ArrayList<Favorite>();
        var query = "SELECT * FROM favorite";
        var statement = Dao.connection.prepareStatement(query);
        var rs = statement.executeQuery();
        while (rs != null && rs.next()) {
            favorites.add(new Favorite(rs));
        }
        return favorites;
    }

    public static Favorite get(int serverId, String topic) throws SQLException {
        Favorite favorite = null;
        var query = "SELECT * FROM favorite WHERE server_id = ? AND topic = ?";
        var statement = Dao.connection.prepareStatement(query);
        statement.setInt(1, serverId);
        statement.setString(2, topic);
        var rs = statement.executeQuery();
        if (rs != null && rs.next()) {
            favorite = new Favorite(rs);
        }
        return favorite;
    }

    public static void save(Favorite favorite) throws SQLException {
        var query = "INSERT INTO favorite VALUES (?, ?)";
        var statement = Dao.connection.prepareStatement(query);
        statement.setInt(1, favorite.serverId);
        statement.setString(2, favorite.topic);
        statement.executeUpdate();
    }

    public static void delete(Favorite favorite) throws SQLException {
        var query = "DELETE FROM favorite WHERE server_id = ? AND topic = ?";
        var statement = Dao.connection.prepareStatement(query);
        statement.setInt(1, favorite.serverId);
        statement.setString(2, favorite.topic);
        statement.executeUpdate();
    }
}
