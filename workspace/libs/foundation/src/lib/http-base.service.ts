import { Injectable } from '@angular/core';

import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { HttpRequestOptions } from './models/http-request-options';
import { HttpRequestMethod } from './models/http-request-methods.enum';
import { Severity } from '@angularlicious/logging';
import { LoggingService } from '@angularlicious/logging';
import { ErrorResponse } from './models/error-response.model';
import { ServiceResponse } from './models/service-response.model';
import { ApiResponse } from './models/api/api-response';

/**
 * Use to create and execute HTTP service requests.
 * 1. Create HttpHeaders
 * 2. Create RequestOptions
 * 3. Execute Request
 *
 * More information at: https://angular.io/guide/http
 */
@Injectable()
export class HttpBaseService {
  public serviceName = 'HttpBaseService';
  accessToken: string;

  constructor(public http: HttpClient, public loggingService: LoggingService) {}

  /**
   * Use to create a [Header] for [multipart/form-data].
   */
  createMultipartFormDataHeader(requiresAuthToken: boolean) {
    this.loggingService.log(
      this.serviceName,
      Severity.Information,
      `Preparing to create header for the [multipart/form-data] HTTP request. RequiresAuthToken: ${requiresAuthToken}.`
    );
    const headers = new HttpHeaders();
    if (requiresAuthToken) {
      // create header request with security token;
      headers.append('Authorization', `Bearer ${this.accessToken}`);
    }
    return headers;
  }

  /**
   * Use to create a [Header] for Content-Type [application/x-www-form-urlencoded].
   */
  createFormUrlencodedHeader() {
    this.loggingService.log(this.serviceName, Severity.Information, `Preparing to create header for the [application/x-www-form-urlencoded] HTTP request.`);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return headers;
  }

  /**
   * Use to create a [Header] for the HTTP request. If the [requiresAuthToken] indicator
   * is true, the request will use the current Authorization security token.
   * @param isSecure
   */
  createHeader(requiresAuthToken: boolean) {
    this.loggingService.log(this.serviceName, Severity.Information, `Preparing to create header for the HTTP request. RequiresAuthToken: ${requiresAuthToken}.`);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (requiresAuthToken) {
      headers.append('Authorization', `Bearer ${this.accessToken}`);
    }
    return headers;
  }

  /**
   * Use this method to create a new HttpRequestOptions item for a request.
   * @param headers Use to supply header information in the request.
   * @param url Use to indicate the URL of the web api.
   * @param body Use to provide a data payload for the request.
   */
  createRequestOptions(method: HttpRequestMethod, headers: HttpHeaders, url: string, body: any) {
    this.loggingService.log(this.serviceName, Severity.Information, `Preparing to create request options for the HTTP request.`);
    const options = new HttpRequestOptions();
    options.headers = headers;
    options.requestUrl = url;
    options.body = body;

    return options;
  }

  /**
   * Use to execute an HTTP request using the specified header and URL.
   */
  executeRequest<T>(requestOptions: HttpRequestOptions): Observable<ApiResponse<T>> {
    this.loggingService.log(this.serviceName, Severity.Information, `Preparing to execute HTTP request. Url: ${requestOptions.requestUrl}`);

    return this.http.request<ApiResponse<T>>(requestOptions.requestMethod.toString(), requestOptions.requestUrl, requestOptions);
  }

  /**
   * Use to execute an HTTP [get] request using the specified url and options.
   */
  // tslint:disable-next-line: no-shadowed-variable
  get<ServiceResponse>(requestOptions: HttpRequestOptions): Observable<ServiceResponse> {
    requestOptions.requestMethod = HttpRequestMethod.get;
    return this.http
      .get<ServiceResponse>(requestOptions.requestUrl, requestOptions)
      .pipe
      // catchError(error => this.handleHttpError(error, requestOptions))
      ();
  }

  /**
   * Use to execute an HTTP [post] request using the specified url and options.
   * @param requestOptions use to define the options for the specified request.
   */
  post<T>(requestOptions: HttpRequestOptions): Observable<ServiceResponse> {
    // this.http.options;
    return this.http
      .post<ServiceResponse>(requestOptions.requestUrl, requestOptions.body, {
        headers: requestOptions.headers,
      })
      .pipe();
    // catchError(error => this.handleHttpError(error, requestOptions))
  }

  /**
   * Use to handle HTTP errors when calling web api(s).
   */
  handleHttpError(error: any, requestOptions: HttpRequestOptions): Observable<ServiceResponse> {
    const message = `${error.toString()} ${requestOptions.requestUrl}, ${JSON.stringify(requestOptions.body)}`;
    this.loggingService.log(this.serviceName, Severity.Error, message);
    if (error && error._body) {
      /**
       * This is an error that contains a body - a [Response] from the application web api. Includes:
       * 1. IsSuccess
       * 2. Message
       * 3. Array of ServiceError items
       * 4. Exception (optional)
       */
      try {
        const response: ErrorResponse = error.json();
        if (response) {
          const subject: BehaviorSubject<any> = new BehaviorSubject(response);
          return subject.asObservable();
        } else {
          // TODO: RETRIEVE ERROR DETAILS; STATUS, MESSAGE; ETC. AND PROVIDE TO HANDLER;
          return this.handleUnexpectedError(error);
        }
      } catch (ex) {
        const err = <Error>ex;
        const errorMessage = `${err.name}; ${err.message}`;
        this.loggingService.log(this.serviceName, Severity.Error, errorMessage);
        return this.handleUnexpectedError(err);
      }
    } else {
      return this.handleUnexpectedError(error);
    }
  }

  handleUnexpectedError(error?: Error): Observable<ServiceResponse> {
    const response = this.createErrorResponse(error);
    const subject: BehaviorSubject<any> = new BehaviorSubject(response);
    return subject.asObservable();
  }

  createErrorResponse(error?: Error): ServiceResponse {
    let message = 'Unexpected error while processing response.';
    const response: ErrorResponse = new ErrorResponse();
    if (error instanceof Error) {
      message = `${error.name} - ${error.message}`;
      response.Exception = error;
    }
    response.Message = message;
    return response;
  }
}
