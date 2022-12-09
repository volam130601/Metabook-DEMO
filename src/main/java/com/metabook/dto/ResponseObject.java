package com.metabook.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class ResponseObject {
    private Object data;
    private String message;
    private String status;

    private long totalData;


    public ResponseObject(Object data) {
        this.data = data;
    }

    public ResponseObject(Object data, String message) {
        this.data = data;
        this.message = message;
    }

    public ResponseObject(Object data, String message, String status) {
        this.data = data;
        this.message = message;
        this.status = status;
    }
}
