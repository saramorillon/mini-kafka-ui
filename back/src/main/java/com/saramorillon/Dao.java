package com.saramorillon;

import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;

public class Dao {
    public static String dir = getDir();
    public static Connection connection;

    public static void connect() {
        try {
            String url = "jdbc:sqlite:" + dir + "/db.sqlite";
            connection = DriverManager.getConnection(url);
            init();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void close() {
        truncate();
        try {
            connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private static void init() {
        try {
            Statement statement = connection.createStatement();
            statement.executeUpdate("""
                    CREATE TABLE IF NOT EXISTS window (
                        id INTEGER PRIMARY KEY,
                        x INTEGER NOT NULL DEFAULT 0,
                        y INTEGER NOT NULL DEFAULT 0,
                        width INTEGER NOT NULL DEFAULT 800,
                        height INTEGER NOT NULL DEFAULT 600,
                        maximized INTEGER NOT NULL DEFAULT 0
                    )""");
            statement.executeUpdate("""
                    CREATE TABLE IF NOT EXISTS server (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name TEXT NOT NULL,
                        brokers TEXT NOT NULL
                    )""");
            statement.executeUpdate("""
                    CREATE TABLE IF NOT EXISTS favorite (
                        server_id INTEGER NOT NULL,
                        topic TEXT NOT NULL,
                        PRIMARY KEY (server_id, topic),
                        FOREIGN KEY (server_id) REFERENCES server (id)
                    )""");
            statement.executeUpdate("""
                    CREATE TABLE IF NOT EXISTS message (
                        server_id INTEGER NOT NULL,
                        topic TEXT NOT NULL,
                        partition INTEGER NOT NULL,
                        offset INTEGER NOT NULL,
                        timestamp INTEGER NOT NULL,
                        key TEXT DEFAULT NULL,
                        value TEXT DEFAULT NULL,
                        PRIMARY KEY (server_id, topic, partition, offset)
                    )""");
            statement.executeUpdate("INSERT OR IGNORE INTO window VALUES (0, 0, 0, 800, 600, 0)");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private static void truncate() {
        try {
            String query = "TRUNCATE TABLE message;";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private static String getDir() {
        String homedir = System.getProperty("user.home");
        String platform = System.getProperty("os.name").toLowerCase();
        if (platform.indexOf("win") >= 0) {
            return Paths.get(homedir, "AppData", "Roaming", "mini-kafka-ui").toString();
        }
        if (platform.indexOf("mac") >= 0) {
            return Paths.get(homedir, "Library", "Preferences", "mini-kafka-ui").toString();
        }
        return Paths.get(homedir, ".local", "share", "mini-kafka-ui").toString();
    }
}
