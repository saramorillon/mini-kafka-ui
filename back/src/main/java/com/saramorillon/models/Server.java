package com.saramorillon.models;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import com.saramorillon.Dao;

public class Server {
    public int id;
    public String name;
    public String brokers;

    public Server(ResultSet rs) throws SQLException {
        this.id = rs.getInt("id");
        this.name = rs.getString("name");
        this.brokers = rs.getString("brokers");
    }

    @Override
    public boolean equals(Object obj) {
        return obj != null && (obj instanceof Server) && ((Server) obj).id == this.id;
    }

    public static Collection<Server> get() throws SQLException {
        Collection<Server> servers = new ArrayList<>();
        String query = "SELECT * FROM server";
        PreparedStatement statement = Dao.connection.prepareStatement(query);
        ResultSet rs = statement.executeQuery();
        while (rs != null && rs.next()) {
            servers.add(new Server(rs));
        }
        return servers;
    }

    public static Server get(Integer id) throws SQLException {
        Server server = null;
        String query = "SELECT * FROM server WHERE id = ?";
        PreparedStatement statement = Dao.connection.prepareStatement(query);
        statement.setInt(1, id);
        ResultSet rs = statement.executeQuery();
        if (rs != null && rs.next()) {
            server = new Server(rs);
        }
        return server;
    }

    public static void save(Server server) throws SQLException {
        if (server.id == 0) {
            String query = "INSERT OR REPLACE INTO server (name, brokers) VALUES (?, ?)";
            PreparedStatement statement = Dao.connection.prepareStatement(query);
            statement.setString(1, server.name);
            statement.setString(2, server.brokers);
            statement.executeUpdate();
        } else {
            String query = "INSERT OR REPLACE INTO server VALUES (?, ?, ?)";
            PreparedStatement statement = Dao.connection.prepareStatement(query);
            statement.setInt(1, server.id);
            statement.setString(2, server.name);
            statement.setString(3, server.brokers);
            statement.executeUpdate();
        }
    }

    public static void delete(Server server) throws SQLException {
        String query = "DELETE FROM server WHERE id = ?";
        PreparedStatement statement = Dao.connection.prepareStatement(query);
        statement.setInt(1, server.id);
        statement.executeUpdate();
    }
}
