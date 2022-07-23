package com.saramorillon.models;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import com.saramorillon.Dao;

public class Window {
    private int id;
    public int x;
    public int y;
    public int width;
    public int height;
    public boolean maximized;

    public Window() {
        super();
        this.id = 0;
        this.x = 0;
        this.y = 0;
        this.width = 800;
        this.height = 600;
        this.maximized = false;
    }

    public Window(ResultSet rs) throws SQLException {
        this.id = rs.getInt("id");
        this.x = rs.getInt("x");
        this.y = rs.getInt("y");
        this.width = rs.getInt("width");
        this.height = rs.getInt("height");
        this.maximized = rs.getInt("maximized") == 1;
    }

    public static Window get() {
        Window window = new Window();
        try {
            Statement statement = Dao.connection.createStatement();
            ResultSet rs = statement.executeQuery("SELECT * FROM window WHERE id = 0");
            if (rs != null && rs.next()) {
                window = new Window(rs);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return window;
    }

    public static void save(Window window) {
        try {
            String query = "INSERT OR REPLACE INTO window VALUES (?, ?, ?, ?, ?, ?)";
            PreparedStatement statement = Dao.connection.prepareStatement(query);
            statement.setInt(1, window.id);
            statement.setInt(2, window.x);
            statement.setInt(3, window.y);
            statement.setInt(4, window.width);
            statement.setInt(5, window.height);
            statement.setBoolean(6, window.maximized);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
