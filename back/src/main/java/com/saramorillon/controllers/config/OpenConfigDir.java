package com.saramorillon.controllers.config;

import java.awt.Desktop;
import java.io.File;
import java.io.IOException;
import org.cef.callback.CefQueryCallback;
import com.saramorillon.Config;
import com.saramorillon.Router;
import com.saramorillon.models.Response;

public class OpenConfigDir extends Router<Void, Void> {
    public OpenConfigDir() {
        super(Void.class);
    }

    @Override
    public Response<Void> onQuery(Void params, CefQueryCallback callback) {
        try {
            Desktop.getDesktop().open(new File(Config.dir));
            return new Response<Void>(200);
        } catch (IOException e) {
            e.printStackTrace();
            return new Response<Void>(500, e.getMessage());
        }
    }
}
