package com.saramorillon;

import io.github.cdimascio.dotenv.Dotenv;

public class Env {
    private static Env instance = null;
    private Dotenv dotenv = null;

    public static Env get() {
        if (instance == null) {
            instance = new Env();
        }
        return instance;
    }

    private Env() {
        dotenv = Dotenv.configure().load();
    }

    public static String getEnv() {
        return get().dotenv.get("ENV");
    }
}
