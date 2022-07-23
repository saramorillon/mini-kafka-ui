package com.saramorillon.controllers.topic;

import java.sql.SQLException;
import java.util.Collection;
import org.cef.callback.CefQueryCallback;
import com.saramorillon.Router;
import com.saramorillon.models.Favorite;
import com.saramorillon.models.Response;

public class GetFavoriteTopics extends Router<Void, Collection<Favorite>> {
    public GetFavoriteTopics() {
        super(Void.class);
    }

    @Override
    public Response<Collection<Favorite>> onQuery(Void params, CefQueryCallback callback) {
        try {
            Collection<Favorite> favorites = Favorite.get();
            return new Response<Collection<Favorite>>(200, favorites);
        } catch (SQLException e) {
            e.printStackTrace();
            return new Response<Collection<Favorite>>(500, e.getMessage());
        }
    }
}
