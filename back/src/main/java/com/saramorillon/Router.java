package com.saramorillon;

import org.cef.browser.CefBrowser;
import org.cef.browser.CefFrame;
import org.cef.browser.CefMessageRouter;
import org.cef.browser.CefMessageRouter.CefMessageRouterConfig;
import org.cef.callback.CefQueryCallback;
import org.cef.handler.CefMessageRouterHandlerAdapter;
import com.google.gson.Gson;
import com.saramorillon.models.Response;



public abstract class Router<P, R> extends CefMessageRouterHandlerAdapter {
    private String name = null;
    private Class<P> paramClass = null;

    public Router(Class<P> paramClass) {
        this.name = getClass().getName();
        this.paramClass = paramClass;
    }

    public String getName() {
        return this.name;
    }

    public abstract Response<R> onQuery(P params, CefQueryCallback callback);

    @Override
    public boolean onQuery(CefBrowser browser, CefFrame frame, long queryId, String request,
            boolean persistent, CefQueryCallback callback) {
        P params;
        if (this.paramClass.equals(Void.class)) {
            params = null;
        } else {
            params = new Gson().fromJson(request, this.paramClass);
        }
        Response<R> response = this.onQuery(params, callback);
        if (response.code < 400) {
            callback.success(new Gson().toJson(response.body));
        } else {
            callback.failure(response.code, response.error);
        }

        return true;
    }

    public static CefMessageRouter route(CefMessageRouterHandlerAdapter adapter) {
        String name = adapter.getClass().getSimpleName();
        return CefMessageRouter.create(new CefMessageRouterConfig(name, name + "Abort"), adapter);
    }
}


