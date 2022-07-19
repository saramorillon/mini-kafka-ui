package com.saramorillon.controllers.topic;

import java.io.IOException;
import java.util.List;
import org.cef.callback.CefQueryCallback;
import com.saramorillon.Config;
import com.saramorillon.Router;
import com.saramorillon.models.Favorite;
import com.saramorillon.models.Response;

public class GetFavoriteTopics extends Router<Void, List<Favorite>> {
    public GetFavoriteTopics() {
        super(Void.class);
    }

    @Override
    public Response<List<Favorite>> onQuery(Void params, CefQueryCallback callback) {
        try {
            Config config = Config.get();
            return new Response<List<Favorite>>(200, config.favorites);
        } catch (IOException e) {
            e.printStackTrace();
            return new Response<List<Favorite>>(500, e.getMessage());
        }
    }
}
