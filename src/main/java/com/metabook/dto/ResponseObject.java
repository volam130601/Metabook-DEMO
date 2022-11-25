package com.metabook.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResponseObject {
    private Object data;
    private String message;
    private String status;

    public ResponseObject(Object data) {
        this.data = data;
    }

    public ResponseObject(Object data, String message) {
        this.data = data;
        this.message = message;
    }

}
