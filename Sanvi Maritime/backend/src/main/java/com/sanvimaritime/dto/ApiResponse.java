package com.sanvimaritime.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.Instant;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {

    private boolean success;
    private String message;
    private String error;
    private T data;
    private List<String> errors;
    private String timestamp;

    public ApiResponse() {}

    public ApiResponse(boolean success, String message, String error, T data, List<String> errors, String timestamp) {
        this.success = success;
        this.message = message;
        this.error = error;
        this.data = data;
        this.errors = errors;
        this.timestamp = timestamp;
    }

    public static <T> ApiResponseBuilder<T> builder() {
        return new ApiResponseBuilder<>();
    }

    public static class ApiResponseBuilder<T> {
        private boolean success;
        private String message;
        private String error;
        private T data;
        private List<String> errors;
        private String timestamp;

        public ApiResponseBuilder<T> success(boolean success) { this.success = success; return this; }
        public ApiResponseBuilder<T> message(String message) { this.message = message; return this; }
        public ApiResponseBuilder<T> error(String error) { this.error = error; return this; }
        public ApiResponseBuilder<T> data(T data) { this.data = data; return this; }
        public ApiResponseBuilder<T> errors(List<String> errors) { this.errors = errors; return this; }
        public ApiResponseBuilder<T> timestamp(String timestamp) { this.timestamp = timestamp; return this; }

        public ApiResponse<T> build() {
            return new ApiResponse<>(success, message, error, data, errors, timestamp);
        }
    }

    public static <T> ApiResponse<T> success(T data) {
        return ApiResponse.<T>builder()
                .success(true)
                .message("Operation successful")
                .data(data)
                .timestamp(Instant.now().toString())
                .build();
    }

    public static <T> ApiResponse<T> success(String message, T data) {
        return ApiResponse.<T>builder()
                .success(true)
                .message(message)
                .data(data)
                .timestamp(Instant.now().toString())
                .build();
    }

    public static <T> ApiResponse<T> error(String message) {
        return ApiResponse.<T>builder()
                .success(false)
                .message(message)
                .error(message)
                .timestamp(Instant.now().toString())
                .build();
    }

    public static <T> ApiResponse<T> error(String message, List<String> errors) {
        return ApiResponse.<T>builder()
                .success(false)
                .message(message)
                .error(message)
                .errors(errors)
                .timestamp(Instant.now().toString())
                .build();
    }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getError() { return error; }
    public void setError(String error) { this.error = error; }

    public T getData() { return data; }
    public void setData(T data) { this.data = data; }

    public List<String> getErrors() { return errors; }
    public void setErrors(List<String> errors) { this.errors = errors; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
}
