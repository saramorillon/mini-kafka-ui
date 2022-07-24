package com.saramorillon;

public class Logger {
    private static final String ANSI_RESET = "\u001B[0m";
    private static final String ANSI_RED = "\u001B[31m";
    private static final String ANSI_GREEN = "\u001B[32m";
    private static final String ANSI_YELLOW = "\u001B[33m";


    enum Level {
        INFO, WARN, ERROR
    }

    private static void log(Level level, String color, String message) {
        System.out.println(color + level + ": " + ANSI_RESET + message);
    }

    public static void info(String message) {
        Logger.log(Level.INFO, ANSI_GREEN, message);
    }

    public static void warn(String message) {
        Logger.log(Level.WARN, ANSI_YELLOW, message);
    }

    public static void error(String message, Exception e) {
        Logger.log(Level.ERROR, ANSI_RED, message);
        e.printStackTrace();
    }

}
