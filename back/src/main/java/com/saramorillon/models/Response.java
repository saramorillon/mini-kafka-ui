package com.saramorillon.models;

public class Response<T> {
    public final Integer code;
    public final T body;
    public final String error;

    public Response(Integer code) {
        this.code = code;
        this.body = null;
        this.error = null;
    }

    public Response(Integer code, T body) {
        this.code = code;
        this.body = body;
        this.error = null;
    }

    public Response(Integer code, String error) {
        this.code = code;
        this.body = null;
        this.error = error;
    }
}
