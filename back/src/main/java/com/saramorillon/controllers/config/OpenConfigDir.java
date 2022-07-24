package com.saramorillon.controllers.config;

import java.awt.Desktop;
import java.io.File;
import java.io.IOException;
import org.cef.callback.CefQueryCallback;
import com.saramorillon.Dao;
import com.saramorillon.Logger;
import com.saramorillon.Router;
import com.saramorillon.models.Response;

public class OpenConfigDir extends Router<Void, Void> {
    public OpenConfigDir() {
        super(Void.class);
    }

    @Override
    public Response<Void> onQuery(Void params, CefQueryCallback callback) {
        Logger.info("open_config_dir");
        try {
            Desktop.getDesktop().open(new File(Dao.dir));
            Logger.info("open_config_dir_success");
            return new Response<>(200);
        } catch (IOException e) {
            Logger.error("open_config_dir_failure", e);
            return new Response<>(500, e.getMessage());
        }
    }
}
