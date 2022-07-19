package com.saramorillon.controllers.topic;

import java.io.IOException;
import java.util.List;
import org.cef.callback.CefQueryCallback;
import com.saramorillon.Config;
import com.saramorillon.Router;
import com.saramorillon.models.Favorite;
import com.saramorillon.models.Response;

public class ToggleFavoriteTopic extends Router<Favorite, Void> {
    public ToggleFavoriteTopic() {
        super(Favorite.class);
    }

    @Override
    public Response<Void> onQuery(Favorite favorite, CefQueryCallback callback) {
        try {
            Config config = Config.get();
            List<Favorite> favorites = config.favorites;
            if (favorites.contains(favorite)) {
                favorites.remove(favorite);
            } else {
                favorites.add(favorite);
            }
            Config.save();
            return new Response<Void>(200);
        } catch (IOException e) {
            e.printStackTrace();
            return new Response<Void>(500, e.getMessage());
        }
    }
}
