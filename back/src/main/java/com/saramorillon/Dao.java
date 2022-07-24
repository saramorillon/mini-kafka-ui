package com.saramorillon;

import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Dao {
    public static String dir = getDir();
    public static Connection connection;

    public static void connect() {
        Logger.info("connect_db");
        try {
            var url = "jdbc:sqlite:" + dir + "/db.sqlite";
            Dao.connection = DriverManager.getConnection(url);
            init();
            Logger.info("connect_db_success");
        } catch (SQLException e) {
            Logger.error("connect_db_failure", e);
        }
    }

    public static void close() {
        Logger.info("close_db");
        truncate();
        try {
            connection.close();
            Logger.info("close_db_success");
        } catch (SQLException e) {
            Logger.error("close_db_failure", e);
        }
    }

    private static void init() {
        Logger.info("init_db");
        try {
            var statement = connection.createStatement();
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
            Logger.info("init_db_success");
        } catch (SQLException e) {
            Logger.error("init_db_failure", e);
        }
    }

    private static void truncate() {
        Logger.info("clean_db");
        try {
            var query = "TRUNCATE TABLE message;";
            var statement = connection.prepareStatement(query);
            statement.executeUpdate();
            Logger.info("clean_db_success");
        } catch (SQLException e) {
            Logger.error("clean_db_failure", e);
        }
    }

    private static String getDir() {
        var homedir = System.getProperty("user.home");
        var platform = System.getProperty("os.name").toLowerCase();
        if (platform.indexOf("win") >= 0) {
            return Paths.get(homedir, "AppData", "Roaming", "mini-kafka-ui").toString();
        }
        if (platform.indexOf("mac") >= 0) {
            return Paths.get(homedir, "Library", "Preferences", "mini-kafka-ui").toString();
        }
        return Paths.get(homedir, ".local", "share", "mini-kafka-ui").toString();
    }
}
