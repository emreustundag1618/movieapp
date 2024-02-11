// this file is prepared for creating error provider(s)
import { Provider } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorInterceptor } from "../services/error.interceptor";

// could be multi interceptors
export const errorInterceptorProvider: Provider = {
    provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true
}