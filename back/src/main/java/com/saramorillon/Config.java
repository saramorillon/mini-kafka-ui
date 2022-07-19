package com.saramorillon;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.google.gson.Gson;
import com.saramorillon.models.Favorite;
import com.saramorillon.models.Server;
import com.saramorillon.models.Window;

public class Config {
    public static String dir = getDir();
    private static Path file = Paths.get(dir, "config.json").toAbsolutePath();
    private static Config instance = null;

    public List<Favorite> favorites = new ArrayList<>();
    public Map<String, Server> servers = new HashMap<>();
    public Window window = null;

    private Config() {}

    public static Config get() throws IOException {
        if (instance == null) {
            String content = Files.readString(file);
            instance = new Gson().fromJson(content, Config.class);
        }
        return instance;
    }

    public static void save() throws IOException {
        if (instance != null) {
            Gson gson = new Gson();
            String content = gson.toJson(instance);
            Files.writeString(file, content);
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
